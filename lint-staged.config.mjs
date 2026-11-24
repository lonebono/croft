// Runs on staged files only, then re-stages the fixes.
// --no-warn-ignored: eslint stays quiet when handed a globally ignored file.
// Prettier skips anything in .prettierignore even when passed explicitly.
const config = {
  "*.{ts,tsx,js,mjs,cjs}": [
    "eslint --fix --no-warn-ignored",
    "prettier --write",
  ],
  "*.{json,md,css,yml,yaml}": "prettier --write",
};

export default config;
