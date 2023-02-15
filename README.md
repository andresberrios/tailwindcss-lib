# TailwindCSS as a library

Use the new JIT compiler from Tailwind CSS programmatically from your code to
generate CSS on-demand.

## Usage

```js
import Tailwind from "tailwindcss-lib";
import autoprefixer from "autoprefixer";

const config = {
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [], // Supports importing and using Tailwind plugins
};

const postcssPlugins = {
  before: [], // PostCSS plugins to load before Tailwind
  after: [autoprefixer], // PostCSS plugins to load after Tailwind
};

const tailwind = new Tailwind(config, postcssPlugins);

let css;

// Provide HTML with Tailwind classes
css = tailwind.process({
  html: '<div class="text-xl text-blue-500">Hello</div>',
});

// Provide CSS using `@apply`. Can also be processed with additional PostCSS plugins
css = tailwind.process({ css: ".hello { @apply text-xl text-blue-500; }" });

// Provide a list of Tailwind classes for which to generate CSS
css = tailwind.process({ classes: ["text-xl", "text-blue-500"] });

// The input options can also be used in combination
css = tailwind.process({
  html: '<div class="hello text-blue-500">Hello</div>',
  css: ".hello { @apply text-xl rotate-45; }",
  classes: ["hover:text-2xl", "focus:outline-none"],
});
```

## Credits

- [Andres Berrios](https://github.com/andresberrios)
- [Marcel Pociot](https://github.com/mpociot) for the inspiration provided in
  [TailwindCSS JIT CDN](https://github.com/beyondcode/tailwindcss-jit-cdn)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
