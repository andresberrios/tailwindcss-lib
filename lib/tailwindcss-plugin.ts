import setupTrackingContext from 'tailwindcss/lib/lib/setupTrackingContext'
import processTailwindFeatures from 'tailwindcss/lib/processTailwindFeatures'
import { env } from 'tailwindcss/lib/lib/sharedState'
import { findAtConfigPath } from 'tailwindcss/lib/lib/findAtConfigPath'

import type { Root, Document } from 'postcss';

const plugin = function tailwindcss(configOrPath: unknown) {
  return {
    postcssPlugin: 'tailwindcss',
    plugins: [
      env.DEBUG &&
      function (root: unknown) {
        console.log('\n')
        console.time('JIT TOTAL')
        return root
      },
      function (root: Root | Document, result: unknown) {
        // Use the path for the `@config` directive if it exists, otherwise use the
        // path for the file being processed
        configOrPath = findAtConfigPath(root, result) ?? configOrPath

        let context = setupTrackingContext(configOrPath)

        if (root.type === 'document') {
          let roots = root.nodes.filter((node) => node.type === 'root')

          for (const root of roots) {
            if (root.type === 'root') {
              processTailwindFeatures(context)(root, result)
            }
          }

          return
        }

        processTailwindFeatures(context)(root, result)
      },
      env.DEBUG &&
      function (root: unknown) {
        console.timeEnd('JIT TOTAL')
        console.log('\n')
        return root
      },
    ].filter(Boolean),
  }
}

plugin.postcss = true;

export default plugin;
