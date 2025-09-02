module.exports = [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.app.json'
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'max-lines-per-function': ['error', { max: 40 }],
      'no-magic-numbers': ['error', { ignore: [0, 1] }]
    },
  },
];
