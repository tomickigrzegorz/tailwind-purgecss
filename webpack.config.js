const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const type = process.env.TYPE;

const PATHS = {
  src: path.join(__dirname, 'src')
}

const ENTRY = {
  index: "./src/index.js",
  form: "./src/form.js"
}

const prodPlugin = (plugin, argv) => {
  return argv.mode === 'production' ? plugin : () => { };
}

const configureStyleLoader = mode => {
  return {
    test: /\.(css|sass|scss)$/,
    use: [
      mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      }
    ],
  };
};

// Configure Clean Webpack
const configureCleanWebpack = () => {
  return {
    dry: false,
    verbose: false
  };
};

// Config Html
const entryHtmlPlugins = Object.keys(ENTRY).map(entryName => {
  return new HtmlWebpackPlugin({
    filename: `${entryName}.html`,
    template: `./src/template-${type}/${entryName}.${type}`,
    chunks: [entryName]
  });
});

// Configure Terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true,
  };
};

// Configure Pug Loader
const configurePugLoader = () => {
  return {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: {
      pretty: true,
      self: true,
    },
  };
};

// Configure Optimization
const configureOptimization = () => {
  return {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true,
        },
      },
    },
    minimizer: [new TerserPlugin(configureTerser())],
  };
};


module.exports = (env, argv) => {
  return {
    mode: argv.mode === "production" ? "production" : "development",
    entry: ENTRY,
    output: {
      filename: "vendor/js/[name].js",
      path: path.resolve(__dirname, `dist-${type}`),
      chunkFilename: 'vendor/js/[name].js'
    },
    optimization: configureOptimization(),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        configureStyleLoader(argv.mode),
        configurePugLoader()
      ]
    },
    plugins: [
      prodPlugin(new CleanWebpackPlugin(configureCleanWebpack()), argv),
      new MiniCssExtractPlugin({
        filename: "vendor/css/[name].css"
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
      }),
    ].concat(entryHtmlPlugins)
  }
};