// Maybe we need this for having colors, but not sure:
// eslint-disable-next-line no-unused-vars
import colors from 'tailwindcss/colors';

import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const VIRTUAL_HTML_FILENAME = '/tailwindVirtualHtmlInput';

const defaultConfig = {
  mode: 'jit',
  purge: [],
  theme: {},
  plugins: []
};

export default class Tailwind {
  constructor(config = {}, postcssPlugins = { before: [], after: [] }) {
    this.config = { ...defaultConfig, ...config, mode: 'jit' };
    postcssPlugins.before = postcssPlugins.before ?? [];
    postcssPlugins.after = postcssPlugins.after ?? [];
    this.postcssPlugins = postcssPlugins;
  }

  async process({ html = '', css = '', classes = [] }) {
    // self[VIRTUAL_HTML_FILENAME] = `${html} - ${classes.join(' ')}`;
    self[VIRTUAL_HTML_FILENAME] = html;

    const result = await postcss([
      ...this.postcssPlugins.before,
      tailwindcss({
        ...this.config,
        // purge: [VIRTUAL_HTML_FILENAME]
        purge: { content: [VIRTUAL_HTML_FILENAME], safelist: classes }
      }),
      ...this.postcssPlugins.after
    ]).process(
      `
      @tailwind base;
      @tailwind components;
      ${css}
      @tailwind utilities;
      `,
      { from: '/virtualSourcePath', map: false }
    );

    return result.css;
  }
}
