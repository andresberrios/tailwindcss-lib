declare module 'tailwindcss-lib' {
  export interface TailwindConfig {
    mode: 'jit' | 'aot',
    purge: string[],
    safelist: string[],
    theme: unknown,
    plugins: unknown[]
  }
  
  export default class Tailwind {
    constructor(
      config?: TailwindConfig,
      postcssPlugins?: { before?: unknown[], after?: unknown[] }
    );
  
    process(input: { html?: string, css?: string, classes?: string[] }): Promise<string>;
  }
}
