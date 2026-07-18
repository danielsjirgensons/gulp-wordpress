const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

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
				cache: {
					type: 'filesystem',
					cacheDirectory: path.resolve(__dirname, '../../../node_modules/.cache/webpack'),
					allowCollectingMemory: true,
					buildDependencies: {
						config: [__filename]
					}
				},
				watch: true,
				devtool: 'cheap-module-source-map'
			},

			// DEVELOPMENT BUILD
			dev: {
				mode: 'development',
				cache: {
					type: 'filesystem',
					cacheDirectory: path.resolve(__dirname, '../../../node_modules/.cache/webpack'),
					allowCollectingMemory: true,
					buildDependencies: {
						config: [__filename]
					}
				},
				devtool: 'cheap-module-source-map'
			},

			// PRODUCTION BUILD
			prod: {
				mode: 'production',
				cache: {
					type: 'filesystem',
					cacheDirectory: path.resolve(__dirname, '../../../node_modules/.cache/webpack'),
					allowCollectingMemory: true,
					buildDependencies: {
						config: [__filename]
					}
				},
				devtool: false, // No source maps for prod to reduce bundle size
				optimization: {
					minimize: true,
					sideEffects: true, // Enable tree shaking for packages with sideEffects flag
					usedExports: true, // Enable tree shaking
					concatenateModules: true, // Module concatenation for faster runtime execution
					runtimeChunk: false,
					splitChunks: false, // Disable code splitting for WordPress themes
					minimizer: [
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true, // Remove all console.* calls
									pure_funcs: ['console.info', 'console.debug', 'console.warn', 'console.error'],
									passes: 2, // Run multiple compress passes for better compression
									drop_debugger: true, // Remove debugger statements
									toplevel: true, // Drop unused top-level vars and functions
									ecma: 2020 // Target modern JavaScript
								},
								mangle: {
									safari10: true, // Workaround Safari 10 bugs
								},
								format: {
									comments: false,
									ecma: 2020
								},
								keep_fnames: false,
								keep_classnames: false
							},
							extractComments: false,
							parallel: true // Faster builds on multi-core systems (Node 24 optimized)
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
					extensions: ['.js', '.mjs', '.cjs'],
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
							test: /\.js$/,
							exclude: /node_modules[\\/](?!(bootstrap)[\\/]).*/,
							use: {
								loader: 'babel-loader',
								options: {
									cacheDirectory: true,
									cacheCompression: false,
									assumptions: {
										// Babel 8 replacement for loose: true
										setPublicClassFields: true,
										privateFieldsAsProperties: true,
										constantSuper: true,
										noDocumentAll: true,
										objectRestNoSymbols: true,
										pureGetters: false,
										skipForOfIteratorClosing: true,
										superIsCallableConstructor: false
									},
									presets: [
										['@babel/preset-env', {
											modules: false,
											useBuiltIns: false
										}]
									],
									plugins: [
										'@babel/plugin-transform-runtime'
									]
								}
							}
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
						extensions: ['js', 'mjs'],
						emitWarning: true,
						overrideConfigFile: './eslint.config.mjs',
						cache: true,
						cacheLocation: 'node_modules/.cache/.eslintcache'
					})
				],
				externals: {
					jquery: 'jQuery',
					'window.jQuery': 'jQuery'
				}
			}

		}
	}
});
