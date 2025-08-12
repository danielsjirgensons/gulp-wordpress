const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// utils
const deepMerge = require('../utils/deepMerge');

// config
const assets = require('./common').paths.assets;

/**
 * Script Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		watch: assets.src + '/js/**/*.js',
		src: [
			assets.src + '/js/**/*.js',
			'!' + assets.src + '/js/**/_*'
		],
		dest: assets.dest + '/js',
		clean: assets.dest + '/js/**/*.{js,map}'
	},

	options: {
		webpack: {
			// DEVELOPMENT
			watch: {
				mode: 'development',
				cache: { type: 'filesystem' },
				watch: true,
				devtool: 'cheap-module-source-map'
			},

			// DEVELOPMENT BUILD
			dev: {
				mode: 'development',
				cache: { type: 'filesystem' },
				devtool: 'cheap-module-source-map'
			},

			// PRODUCTION BUILD
			prod: {
				mode: 'production',
				devtool: false, // No source maps for prod to reduce bundle size
				optimization: {
					minimize: true,
					sideEffects: true, // Enable tree shaking for packages with sideEffects flag
					usedExports: true, // Enable tree shaking
					concatenateModules: true, // Module concatenation for faster runtime execution
					minimizer: [
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true, // Remove all console.* calls
									pure_funcs: ['console.info', 'console.debug', 'console.warn', 'console.error'],
									passes: 2, // Run multiple compress passes for better compression
									drop_debugger: true, // Remove debugger statements
									toplevel: true // Drop unused top-level vars and functions
								},
								mangle: {
									safari10: true, // Workaround Safari 10 bugs
								},
								output: {
									comments: false,
									beautify: false
								},
								keep_fnames: false,
								keep_classnames: false
							},
							extractComments: false,
							parallel: true,
							// cache: true // Optionally enable caching if build speed is an issue
						})
					],
				},
				performance: {
					hints: 'warning', // Show warnings on large asset sizes (optional)
					maxEntrypointSize: 512000, // 500kb, adjust based on your needs
					maxAssetSize: 512000,
				}
			},

			// DEFAULT SETTINGS (MERGED WITH ALL BUILDS)
			defaults: {
				resolve: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
					alias: {
						'lodash-es': 'lodash'
					},
					fallback: {
						// Polyfills for node core modules if needed (webpack 5 no longer includes them)
						// e.g., crypto: require.resolve('crypto-browserify'),
					}
				},
				output: {
					chunkFilename: 'chunk-[name].[contenthash].js',
					clean: true // Cleans output directory before emit
				},
				stats: {
					colors: true,
					assets: true,
					modules: false, // optionally hide module info for cleaner output
					entrypoints: true,
					warnings: true,
					errors: true
				},
				module: {
					rules: [
						{
							test: /\.(js|jsx)$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									cacheDirectory: true, // Speeds up rebuilds by caching
									presets: [
										['@babel/preset-env', {
											targets: {
												esmodules: true
											},
											modules: false,
											useBuiltIns: false // or 'usage' with core-js if needed
										}],
										'@babel/preset-react'
									],
									plugins: ['@babel/plugin-transform-runtime']
								}
							}
						},
						{
							test: /\.(ts|tsx)$/,
							use: [
								{
									loader: 'ts-loader',
									options: {
										transpileOnly: true, // Improves speed, consider fork-ts-checker-webpack-plugin for type checks
									}
								}
							],
							exclude: /node_modules/
						},
						{
							test: /swiper\.esm\.js/,
							sideEffects: false
						},
						{
							test: /\.(css|scss)$/, // Example for styles, add your loaders here if needed
							use: [
								'style-loader',
								{
									loader: 'css-loader',
									options: {
										sourceMap: true,
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										postcssOptions: {
											plugins: ['autoprefixer']
										},
										sourceMap: true
									}
								},
								'sass-loader'
							]
						}
					]
				},
				plugins: [
					new ESLintPlugin({
						failOnError: false,
						extensions: ['js', 'jsx', 'ts', 'tsx'],
						emitWarning: true,
						cache: true
					}),
					// Optionally add ForkTsCheckerWebpackPlugin for TypeScript type checking:
					// new ForkTsCheckerWebpackPlugin()
				],
				externals: {
					jquery: 'jQuery',
					'window.jQuery': 'jQuery'
				}
			}

		}
	}
});
