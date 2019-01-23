const strictMode = process.env.ESLINT_STRICT === 'true';

module.exports = {
    root: true,
    env: {
        browser: true,
        mocha: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['airbnb-base', 'prettier', 'plugin:vue/recommended'],
    plugins: ['import', 'prettier', 'chai-friendly', 'mocha', 'eslint-comments', 'vue'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 2,
                printWidth: 120,
                // Подразумеваем, что наш код либо транспайлится, либо запускается в среде, где поддерживаются висящие запятые в функциях
                trailingComma: 'all',
            },
        ],
        'valid-jsdoc': [
            1,
            {
                prefer: {
                    returns: 'return',
                },
                preferType: {
                    String: 'string',
                    Number: 'number',
                    object: 'Object',
                    array: 'Array',
                    function: 'Function',
                    Boolean: 'boolean',
                    bool: 'boolean',
                },
                requireReturn: false,
                requireParamDescription: false,
                requireReturnDescription: false,
            },
        ],

        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
        'import/no-anonymous-default-export': [
            'error',
            {
                allowArray: true,
                allowLiteral: true,
                allowObject: true,
            },
        ],

        // Иммутабельность это здорово но vue/vuex не гарантируют работу при иммутабельности
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],

        'no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2,

        'mocha/no-exclusive-tests': 'error',
        'eslint-comments/disable-enable-pair': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
        'max-statements': ['warn', 30],
        'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
        'max-lines': ['warn'],
        'multiline-comment-style': ['error', 'starred-block'],
        'no-debugger': [strictMode ? 'error' : 'off'],
        /*
         * используем деструктуризацию только при объявлений переменных и деструктуризации из объекта
         * По идее, из массивов не должно быть обязательной деструктуризации
         * А когда переменная уже определена, то как-то тоже ожидается что она напрямую будет переписана
         * При это деструктуризация из объекта убирает дублирование кода
         * const offers = result.offers vs const { offers } = result;
         */
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        'vue/html-indent': [
            'error',
            2,
            {
                'baseIndent': 0,
                'ignores': []
            }
        ],
    },
};
