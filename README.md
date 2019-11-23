## Simple tailwindcss + purgecss configuration
It includes:
- [@fullhuman/postcss-purgecss](https://github.com/FullHuman/postcss-purgecss)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)
- [cssnano](https://github.com/cssnano/cssnano)
- [postcss-cli](https://github.com/postcss/postcss-cli)
- [tailwindcss](https://github.com/tailwindcss/tailwindcss)


## Tailwindcss + bootstrap (or other css framework)

This example shows how to use the `purgecss-webpack-plugin` plugin to dramatically select only the necessary css code from bootstrap.

This example has two pages `index.html` and `form.html` from the [getbootstrap.com/examples](https://getbootstrap.com/docs/4.3/examples/) View in the src folder.

I import `bootstrap.min.css` and additional scss files into `index.js` and `form.js`. Using splitChunks when building the resulting files, the code is split into `styles.css` which contains the common css code and `index.css` as well as `form.css` and is injected into head in html.

> All optimized code is only 15KB and not all 154KB bootstrap!

All Code is in this branch [bootstrap-tailwind](https://github.com/tomik23/tailwind-purgecss/tree/bootstrap-tailwind).

This code can also be used for other css frameworks.