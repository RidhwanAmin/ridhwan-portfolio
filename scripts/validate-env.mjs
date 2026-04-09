/**
 * validate-env.mjs — Agent E owns this file. Task E3.
 *
 * Validates that all required environment variables are set before building.
 * Reads .env.example as the canonical required-vars list (Agent B maintains
 * that file). Exits with code 1 and clear diagnostics if any are missing.
 *
 * Runs as the `prebuild` hook in package.json:
 *   "prebuild": "node scripts/validate-env.mjs"
 *
 * Cross-agent contract (CLAUDE.md):
 *   - Agent B keeps .env.example current; this script reads it.
 *   - In local dev (NODE_ENV != "production" and CI not set), validation is
 *     skipped so builds succeed without a populated .env file.
 *     CI (Vercel, GitHub Actions) always has NODE_ENV=production or CI=true.
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ENV_EXAMPLE_PATH = resolve(ROOT, ".env.example");

/**
 * Parse a .env.example file and return the list of variable names defined in it.
 * Ignores blank lines and comment lines (lines starting with #).
 * Also ignores lines with no '=' (not a valid assignment).
 */
function parseEnvExample(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const varNames = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    // Skip empty lines and comment lines
    if (!trimmed || trimmed.startsWith("#")) continue;
    // Extract the variable name (everything before the first '=')
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const name = trimmed.slice(0, eqIndex).trim();
    if (name) varNames.push(name);
  }

  return varNames;
}

/* eslint-disable no-console */
function main() {
  const isProduction = process.env.NODE_ENV === "production";
  const isCi = Boolean(process.env.CI);
  const shouldValidate = isProduction || isCi;

  if (!shouldValidate) {
    console.log(
      "[validate-env] Skipping validation (local dev — NODE_ENV is not 'production' and CI is not set)."
    );
    console.log(
      "[validate-env] Set NODE_ENV=production or CI=true to enforce all required vars."
    );
    return;
  }

  if (!existsSync(ENV_EXAMPLE_PATH)) {
    console.error(
      `[validate-env] ERROR: .env.example not found at ${ENV_EXAMPLE_PATH}`
    );
    console.error(
      "[validate-env] Agent B must keep .env.example current (CLAUDE.md cross-agent contract)."
    );
    process.exit(1);
  }

  const required = parseEnvExample(ENV_EXAMPLE_PATH);

  if (required.length === 0) {
    console.warn(
      "[validate-env] WARNING: .env.example defines no variables. Nothing to validate."
    );
    return;
  }

  const missing = required.filter(name => {
    const val = process.env[name];
    return val === undefined || val === "";
  });

  if (missing.length === 0) {
    console.log(
      `[validate-env] All ${required.length} required environment variable(s) are present.`
    );
    return;
  }

  console.error(
    `\n[validate-env] BUILD FAILED — ${missing.length} required environment variable(s) are missing:\n`
  );
  for (const name of missing) {
    console.error(`  ✗  ${name}`);
  }
  console.error(
    "\nSet these in your .env file (local dev) or Vercel dashboard (production)."
  );
  console.error(
    `See ${ENV_EXAMPLE_PATH} for the full required-vars list with descriptions.\n`
  );
  process.exit(1);
}
/* eslint-enable no-console */

main();
