// Conventional Commits: type(scope): subject (CLAUDE.md: Git)
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Scope is optional, but when given it must be one of these
    "scope-enum": [
      2,
      "always",
      [
        "coffee",
        "finance",
        "calendar",
        "wardrobe",
        "auth",
        "db",
        "ui",
        "layout",
        "ci",
        "deps",
      ],
    ],
    // Bulleted bodies often carry long file paths
    "body-max-line-length": [0],
  },
};

export default config;
