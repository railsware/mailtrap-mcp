# AGENT.md

## Build/Lint/Test Commands
- `npm run build` - Compile TypeScript to dist/
- `npm run lint` - Run ESLint and TypeScript checks
- `npm test` - Run all Jest tests
- `npm run test:watch` - Run tests in watch mode
- `jest src/tools/sendEmail/__tests__/sendEmail.test.ts` - Run single test file
- `npm run dev` - Run MCP server with inspector for testing

## Architecture
- MCP (Model Context Protocol) server integrating with Mailtrap email service
- Main entry point: `src/index.ts` registers tools and handles server lifecycle
- Tools located in `src/tools/` with pattern: each tool has subdirectory with index.ts, schema.ts, implementation.ts, and __tests__/
- Client configuration: `src/client.ts` handles Mailtrap API initialization
- Configuration: `src/config/index.ts` for server constants

## Code Style
- Uses Airbnb TypeScript ESLint config with Prettier
- TypeScript strict mode enabled, targeting ES2022 with CommonJS
- Zod schemas for all tool input validation
- Error handling: catch and re-throw with descriptive messages
- Import style: ES modules syntax, grouped with external first
- Naming: camelCase for functions/variables, PascalCase for types/interfaces
- No console.log allowed in production code (use proper error handling)
