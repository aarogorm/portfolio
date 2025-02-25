// eslint.config.js
import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  // Use ESLint's recommended rules as a base
  eslint.configs.recommended,

  // Configure React plugin
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    // Apply these rules to JavaScript and JSX files
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      // Syntax and possible errors
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',

      // React specific rules
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Stylistic preferences - adjust to your needs
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'indent': ['warn', 2]
    },
    ignores: [
      'node_modules',
      'build',
      'dist',
      'public'
    ]
  },

  // Special rules for Node.js files
  {
    files: ['server.cjs', 'server/**/*.js', 'api/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'writable',
      },
    },
    rules: {
      // No JSX in server files
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
    },
  },

];