module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin' , 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ],
    

        // checks for console log, err, etc.
        // https://eslint.org/docs/rules/no-console
        'no-console': 'error',

        // require let or const instead of var
        'no-var': 'error',

        // require the use of === and !==
        // https://eslint.org/docs/rules/eqeqeq
        eqeqeq: ['warn', 'always'],

        // Disallow returning value in constructor
        // https://eslint.org/docs/rules/no-constructor-return
        // TODO: enable, semver-major
        'no-constructor-return': 'error',

        // disallow use of multiple spaces
        'no-multi-spaces': [
            'warn',
            {
                ignoreEOLComments: false,
            },
        ],

        // disallow to use this/super before super() calling in constructors.
        // https://eslint.org/docs/rules/no-this-before-super
        'no-this-before-super': 'error',
        // suggest using arrow functions as callbacks
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            },
        ],

        // suggest using of const declaration for variables that are never modified after declared
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: true,
            },
        ],
         // treat var statements as if they were block scoped
        'block-scoped-var': 'error',
      
  },
};
