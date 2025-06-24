module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'react-hooks/exhaustive-deps'
  ],
  rules: {
    // Prevent console statements in production
    'no-console': 'error',
    // Allow console in development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Prefer const assertions
    'prefer-const': 'error',
    // Prevent unused variables
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error'
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  }
};