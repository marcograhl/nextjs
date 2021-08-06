module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "next",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jsx-a11y"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "jsx-a11y/no-onchange": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        aspects: ["invalidHref"],
      },
    ],
  },
};
