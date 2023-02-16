import postcss, { AcceptedPlugin } from 'postcss';
import type { Config } from 'tailwindcss';
import tailwindcss from './lib/tailwindcss-plugin';

const defaultConfig: Config = {
  mode: 'jit',
  content: [],
  theme: { extend: {} },
  plugins: []
};

interface PostcssPlugins {
  before?: AcceptedPlugin[],
  after?: AcceptedPlugin[]
}

export default class Tailwind {
  constructor(
    public config: Config = { content: [] },
    public postcssPlugins: PostcssPlugins = { before: [], after: [] }
  ) {
    this.config = { ...defaultConfig, ...config, mode: 'jit' };
    postcssPlugins.before = postcssPlugins.before ?? [];
    postcssPlugins.after = postcssPlugins.after ?? [];
    this.postcssPlugins = postcssPlugins;
  }

  async process(input: { html?: string, css?: string, classes?: string[] }): Promise<string> {
    const { html = '', css = '', classes = [] } = input;

    const result = await postcss([
      ...this.postcssPlugins.before ?? [],
      tailwindcss({
        ...this.config,
        content: [{ raw: html, extension: 'html' }],
        safelist: classes
      }),
      ...this.postcssPlugins.after ?? []
    ]).process(
      `
      @tailwind base;
      @tailwind components;
      ${css}
      @tailwind utilities;
      `,
      { from: undefined }
    );

    return result.css;
  }
}
