#!/usr/bin/env node

import "dotenv/config";
import { createServer, startServer } from "./server";

// DXT entry point
async function main() {
  try {
    const server = createServer();
    await startServer(server);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main();
}
