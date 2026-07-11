import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // QA / Playwright artifacts (not app source)
    "playwright-report/**",
    "test-results/**",
    "qa-artifacts/**",
    "public/qa-artifacts/**",
    // Standalone packages keep their generated bundles outside the Next app.
    "standalone/**/dist/**",
    "standalone/**/coverage/**",
  ]),
]);

export default eslintConfig;
