module.exports = {
    extends: ['airbnb-typescript/base', 'prettier'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/indent': 'off',
        'class-methods-use-this': 'off',
        'import/no-cycle': 'off',
        'default-case': 'off',
        'consistent-return': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-param-reassign': 'off'
    }
};
