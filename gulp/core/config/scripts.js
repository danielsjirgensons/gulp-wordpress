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
				devtool: false,
				optimization: {
					minimize: true,
					sideEffects: false,
					usedExports: true,
					minimizer: [
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true,
									pure_funcs: ['console.info', 'console.debug', 'console.warn', 'console.error']
								},
								output: { comments: false },
								keep_fnames: false,
								keep_classnames: false
							},
							extractComments: false,
							parallel: true
						})
					]
				}
			},

			// DEFAULT SETTINGS (MERGED WITH ALL BUILDS)
			defaults: {
				resolve: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
					alias: {
						'lodash-es': 'lodash'
					}
				},
				output: {
					chunkFilename: 'chunk-[name].[contenthash].js',
					clean: true
				},
				stats: { colors: true },
				module: {
					rules: [
						{
							test: /\.(js|jsx)$/,
							exclude: /node_modules/,
							loader: 'babel-loader',
							options: {
								presets: [
									['@babel/preset-env', {
										targets: {
											esmodules: true
										},
										modules: false,
										useBuiltIns: false // if you use core-js, you can set 'usage'
									}],
									'@babel/preset-react'
								],
								plugins: ['@babel/plugin-transform-runtime']
							}
						},
						{
							test: /\.(ts|tsx)$/,
							use: 'ts-loader',
							exclude: /node_modules/
						},
						{
							test: /swiper\.esm\.js/,
							sideEffects: false
						}
					]
				},
				plugins: [
					new ESLintPlugin({ failOnError: false })
				],
				externals: {
					jquery: 'jQuery',
					'window.jQuery': 'jQuery'
				}
			}

		}
	}
});
