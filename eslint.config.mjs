import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import typescriptEslint from 'typescript-eslint';

export default [
	js.configs.recommended,
	...typescriptEslint.configs.recommended,
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				requireConfigFile: false,
				babelOptions: {
					presets: ['@babel/preset-env', '@babel/preset-react']
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
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		// TypeScript specific overrides
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptEslint.parser
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'warn'
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
