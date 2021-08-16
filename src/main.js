// Maybe we need this for having colors, but not sure:
// eslint-disable-next-line no-unused-vars
import colors from 'tailwindcss/colors';

import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const VIRTUAL_HTML_FILENAME = '/tailwindVirtualHtmlInput';

const defaultConfig = {
  mode: 'jit',
  purge: [],
  safelist: [],
  theme: {},
  plugins: []
};

export default class Tailwind {
  constructor(config = {}, customCss = '') {
    this.config = { ...defaultConfig, ...config };
    this.customCss = customCss;
  }

  async process(htmlContent = '', classes = []) {
    self[VIRTUAL_HTML_FILENAME] = htmlContent;

    const result = await postcss([
      tailwindcss({
        ...this.config,
        ...{ purge: [VIRTUAL_HTML_FILENAME], safelist: classes }
      }),
      autoprefixer
    ]).process(
      `
      @tailwind base;
      @tailwind components;
      ${this.customCss}
      @tailwind utilities;
      `,
      { from: '/virtualSourcePath', map: false }
    );

    return result.css;
  }

  async processClasses(classes) {
    return this.process('', classes);
  }

  async processHtml(htmlContent) {
    return this.process(htmlContent, []);
  }
}
