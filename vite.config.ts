import { defineConfig } from 'vite'

const external = [
  // "lightningcss",
  // "browserslist",
  // "@tailwindcss/oxide",
  // "fast-glob"
];

const empty = new URL('./stubs/empty.js', import.meta.url).pathname;

/**
 * OK, maybe better try using browserify...
 */

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'TailwindCssLib',
      fileName: 'tailwindcss-lib'
    },
    rollupOptions: {
      external
    }
  },
  define: {
    'process.env.OXIDE': 'false',
    'env.OXIDE': 'false'
  },
  resolve: {
    alias: {
      '@tailwindcss/oxide': empty,
      // 'lightningcss': empty,
      // 'browserslist': empty,
      // 'fast-glob': empty,
      // './oxide/postcss-plugin': './plugin',

      // process: 'process/browser',
      'fast-glob': './lib/stubs/fast-glob.ts',
      os: 'node_modules/@jspm/core/nodelibs/browser/os.js',
      path: 'node_modules/@jspm/core/nodelibs/browser/path.js',
      url: 'node_modules/@jspm/core/nodelibs/browser/url.js',
      fs: 'node_modules/@jspm/core/nodelibs/browser/fs.js',
      'source-map-js': 'node_modules/source-map-js/source-map.js',
    },
  },
  optimizeDeps: {
    exclude: external
  },
  // ssr: {
  //   external
  // }
})
