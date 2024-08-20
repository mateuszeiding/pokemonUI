import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['**/dist', '**/.eslintrc.cjs'],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react-hooks/recommended',
            'prettier'
        )
    ),
    {
        plugins: {
            'react-refresh': reactRefresh,
            import: fixupPluginRules(_import),
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
        },

        settings: {
            react: {
                version: 'detect',
            },

            'import/resolver': {
                node: {
                    paths: ['src'],
                    extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
                },

                typescript: {
                    project: './tsconfig.json',
                },

                alias: {
                    map: [
                        ['@', path.resolve(__dirname, './src')],
                        [
                            '@features',
                            path.resolve(__dirname, './src/headless'),
                        ],
                        [
                            '@headless',
                            path.resolve(__dirname, './src/features'),
                        ],
                        ['@assets', path.resolve(__dirname, './src/assets')],
                    ],

                    extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
                },
            },
        },

        rules: {
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],
        },
    },
];
