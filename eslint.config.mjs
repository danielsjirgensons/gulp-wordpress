import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				requireConfigFile: false,
				babelOptions: {
					presets: ['@babel/preset-env']
				}
			},
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node,
				...globals.jquery,
				jQuery: 'readonly',
				$: 'readonly',
				Promise: 'readonly'
			}
		},
		rules: {
			'indent': ['error', 'tab'],
			'no-tabs': 'off',
			'comma-dangle': 'off',
			'no-underscore-dangle': ['error', { allow: ['_this'] }],
			'no-param-reassign': ['error', { props: false }],
			'no-multiple-empty-lines': 'off',
			'no-console': 'warn',
			'no-unused-vars': 'warn'
		}
	},
	{
		ignores: [
			'node_modules/**',
			'assets/**',
			'gulp/**',
			'*.min.js',
			'**/*.min.js'
		]
	}
];
