module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "no-unused-vars": "off", // Disabled for Phaser event handlers
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "indent": ["error", 4],
        "comma-dangle": ["error", "always-multiline"],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "never"],
    },
    overrides: [
        {
            files: [".eslintrc.js"],
            rules: {
                "quotes": ["error", "double"],
            },
        },
        {
            files: ["src/scenes/level*.js", "src/scenes/CustomScene.js", "src/index.js"],
            rules: {
                "no-undef": "off",
            },
        },
    ],
};
