import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Croft conventions (CLAUDE.md: Code conventions)
  {
    rules: {
      "no-var": "error",
      "import/no-default-export": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.property.name='then']",
          message: "Use async/await instead of .then().",
        },
        {
          selector: "CallExpression[callee.property.name='catch']",
          message: "Use try/catch with async/await instead of .catch().",
        },
      ],
    },
  },

  // Default exports only where Next or a tool requires them
  {
    files: [
      "app/**/{page,layout,template,loading,error,global-error,not-found,default}.tsx",
      "*.config.{js,mjs,cjs,ts,mts}",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // Last: turns off any rule that would fight Prettier
  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
