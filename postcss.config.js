const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './src/**/*.html',
      './src/**/*.svelte'
    ],
  
    whitelistPatterns: [/svelte-/, /html/, /body/],
  
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const production = !process.env.ROLLUP_WATCH
  
module.exports = {
    plugins: [
        require('tailwindcss'),
        ...(production ? [purgecss, autoprefixer] : [])
    ]
};
