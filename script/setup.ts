#!/usr/bin/env tsx
/**
 * Quick setup script — run after cloning from GitHub.
 * Usage: npm run setup
 */
import { randomBytes } from "crypto";
import { existsSync, copyFileSync, writeFileSync, readFileSync } from "fs";

const ENV_EXAMPLE = ".env.example";
const ENV_FILE = ".env";

function main() {
  console.log("\n  Connect Admin — Setup\n");

  if (!existsSync(ENV_FILE)) {
    if (existsSync(ENV_EXAMPLE)) {
      copyFileSync(ENV_EXAMPLE, ENV_FILE);
      console.log("  ✓ Created .env from .env.example");
    } else {
      writeFileSync(ENV_FILE, defaultEnv());
      console.log("  ✓ Created .env with defaults");
    }
  } else {
    console.log("  · .env already exists, skipping");
  }

  let env = readFileSync(ENV_FILE, "utf-8");

  if (env.includes("changeme") || env.includes("your-")) {
    const password = randomBytes(12).toString("base64url");
    const sessionSecret = randomBytes(32).toString("hex");
    const tokenSecret = randomBytes(32).toString("hex");

    env = env
      .replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD=${password}`)
      .replace(/SESSION_SECRET=.*/, `SESSION_SECRET=${sessionSecret}`)
      .replace(/TOKEN_SECRET=.*/, `TOKEN_SECRET=${tokenSecret}`);

    writeFileSync(ENV_FILE, env);
    console.log("  ✓ Generated secure ADMIN_PASSWORD, SESSION_SECRET, TOKEN_SECRET");
    console.log(`\n  Admin credentials:`);
    console.log(`    Username: admin`);
    console.log(`    Password: ${password}\n`);
  }

  console.log("  Next steps:");
  console.log("    1. Set DATABASE_URL in .env");
  console.log("    2. npm run db:push");
  console.log("    3. npm run dev");
  console.log("    4. Open http://localhost:5000/admin\n");
}

function defaultEnv(): string {
  return `DATABASE_URL=postgresql://user:password@localhost:5432/connect_admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
SESSION_SECRET=change-me
TOKEN_SECRET=change-me
ADMIN_APP_NAME=Connect Admin
ADMIN_CORS_ORIGINS=*
PORT=5000
`;
}

main();
