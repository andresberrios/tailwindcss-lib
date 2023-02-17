import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject'
import stdLibBrowser from 'node-stdlib-browser'
import { createRequire } from 'module'
import { readFile } from 'fs/promises'

const require = createRequire(import.meta.url);
const empty = require.resolve('./src/stubs/empty.ts');
const browserShimsPath = require.resolve('node-stdlib-browser/helpers/esbuild/shim');

let preflightCss = await readFile(require.resolve('tailwindcss/lib/css/preflight.css'), 'utf8');
preflightCss = '`' + preflightCss.replaceAll('`', '\\`') + '`'

function embedPreflight(source: string) {
  return source.replace(
    '_fs.default.readFileSync(_path.join(__dirname, "./css/preflight.css"), "utf8")',
    preflightCss
  );
}

export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'TailwindCssLib',
      fileName: 'tailwindcss-lib'
    }
  },
  define: {
    'process.env.OXIDE': 'false',
    'env.OXIDE': 'false'
  },
  resolve: {
    alias: {
      ...stdLibBrowser,
      'lightningcss': empty,
      'browserslist': empty,
      '@tailwindcss/oxide': empty,
      'source-map-js': 'node_modules/source-map-js/source-map.js',
      'fast-glob': require.resolve('./src/stubs/fast-glob.ts'),
    },
  },
  plugins: [
    {
      name: 'wrapped-inject',
      enforce: 'post',
      async transform(code, id) {
        const original = inject({
          global: [browserShimsPath, 'global'],
          process: [browserShimsPath, 'process'],
          Buffer: [browserShimsPath, 'Buffer'],
          sourceMap: command === 'serve'
        });
        if (typeof original.transform !== 'function') {
          throw new TypeError("Expected inject's transform handler to be a function");
        }
        const result = await original.transform.call(this, code, id);
        if (result && typeof result !== 'string') {
          delete result.map;
        }
        return result;
      }
    },
    {
      name: 'preflight-fix',
      transform(code, id) {
        if (id.includes('tailwindcss') && id.includes('corePlugins')) {
          return embedPreflight(code);
        }
        return null;
      }
    }
  ],
  optimizeDeps: {
    include: ['buffer', 'process'],
    esbuildOptions: {
      plugins: [
        {
          name: 'preflight-fix',
          setup(build) {
            build.onLoad({ filter: /tailwindcss.*corePlugins/ }, async (args) => {
              const source = await readFile(args.path, 'utf8');
              return { contents: embedPreflight(source) };
            })
          }
        }
      ]
    }
  }
}));
