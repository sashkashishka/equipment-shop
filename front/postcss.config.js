const path = require('path');

module.exports = {
  plugins: [
    [
      'postcss-mixins',
      {
        mixinsFiles: path.join(__dirname, 'src/styles/mixins', '!(*.spec.js)'),
      },
    ],
    'postcss-nested',
    'autoprefixer',
  ],
};
