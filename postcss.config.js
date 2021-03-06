const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './public/**/*.html',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'),
    ...(process.env.NODE_ENV === 'production'
      ? [purgecss, require('autoprefixer')]
      : []),
  ],
}
