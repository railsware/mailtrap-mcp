#!/usr/bin/env node

import "dotenv/config";
import { createServer, startServer } from "./server";

// Enhanced logging utility for MCPB
class Logger {
  private static instance: Logger;

  private debugMode: boolean;

  private constructor() {
    this.debugMode =
      process.env.DEBUG === "true" || process.env.NODE_ENV === "development";
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(
    level: "info" | "warn" | "error" | "debug",
    message: string,
    data?: any
  ): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
    };

    if (level === "error" || level === "warn") {
      console.error(JSON.stringify(logEntry));
      return;
    }

    if (level === "info") {
      console.error(JSON.stringify(logEntry));
      return;
    }

    if (level === "debug" && this.debugMode) {
      console.error(JSON.stringify(logEntry));
    }
  }

  info(message: string, data?: any): void {
    this.log("info", message, data);
  }

  warn(message: string, data?: any): void {
    this.log("warn", message, data);
  }

  error(message: string, data?: any): void {
    this.log("error", message, data);
  }

  debug(message: string, data?: any): void {
    this.log("debug", message, data);
  }
}

const logger = Logger.getInstance();

// Start the MCPB server
async function startMcpbServer(): Promise<void> {
  try {
    logger.info("Starting Mailtrap MCPB Server", { version: "0.0.3" });

    const server = createServer();
    await startServer(server);

    logger.info("Mailtrap MCPB Server started successfully");
  } catch (error) {
    logger.error("Failed to start MCPB server", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  logger.info("Received SIGINT, shutting down gracefully");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

// Start the server
if (require.main === module) {
  startMcpbServer().catch((error) => {
    logger.error("Fatal error in MCPB server", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  });
}
