const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins([
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        utils: './src/utils',
        assets: './src/assets',
        components: './src/components',
        pages: './src/pages',
        hooks: './src/hooks',
        services: './src/services',
        stores: './src/stores',
      },
    },
  ])
);
