![TypeScript](https://img.shields.io/npm/types/mailtrap?logo=typescript&logoColor=white&label=%20)
[![test](https://github.com/railsware/mailtrap-mcp/actions/workflows/main.yml/badge.svg)](https://github.com/railsware/mailtrap-mcp/actions/workflows/main.yml)
[![NPM](https://shields.io/npm/v/mcp-mailtrap?logo=npm&logoColor=white)](https://www.npmjs.com/package/mcp-mailtrap)

# MCP Mailtrap Server

An MCP server that provides a tool for sending transactional emails via Mailtrap

## Setup

### Claude Desktop or Cursor

Edit the Claude Desktop configuration file:

**Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "mailtrap": {
      "command": "npx",
      "args": ["-y", "mcp-mailtrap"],
      "env": {
        "MAILTRAP_API_TOKEN": "your_mailtrap_api_token",
        "DEFAULT_FROM_EMAIL": "your_sender@example.com"
      }
    }
  }
}
```

If you are using `asdf` for managing Node.js you must use absolute path to executable (example for Mac)

```json
{
  "mcpServers": {
    "mailtrap": {
      "command": "/Users/<username>/.asdf/shims/npx",
      "args": ["-y", "mcp-mailtrap"],
      "env": {
        "PATH": "/Users/<username>/.asdf/shims:/usr/bin:/bin",
        "ASDF_DIR": "/opt/homebrew/opt/asdf/libexec",
        "ASDF_DATA_DIR": "/Users/<username>/.asdf",
        "ASDF_NODEJS_VERSION": "20.6.1",
        "MAILTRAP_API_TOKEN": "your_mailtrap_api_token",
        "DEFAULT_FROM_EMAIL": "your_sender@example.com"
      }
    }
  }
}
```

### VS Code

```json
{
  "mcp": {
    "servers": {
      "mailtrap": {
        "command": "npx",
        "args": ["-y", "mcp-mailtrap"],
        "env": {
          "MAILTRAP_API_TOKEN": "your_mailtrap_api_token",
          "DEFAULT_FROM_EMAIL": "your_sender@example.com"
        }
      }
    }
  }
}
```

> [!TIP]
> Don't forget to restart your MCP server after changing the "env" section.

## Usage

Once configured, you can ask agent to send emails, for example:

- "Send an email to john.doe@example.com with the subject 'Meeting Tomorrow' and a friendly reminder about our upcoming meeting."
- "Email sarah@example.com about the project update, and CC the team at team@example.com"

## Available Tools

### send-email

Sends a transactional email through Mailtrap.

**Parameters:**

- `to` (required): Email address of the recipient
- `subject` (required): Email subject line
- `from` (optional): Email address of the sender, if not provided "DEFAULT_FROM_EMAIL" will be used
- `text` (optional): Email body text, require if "html" is empty
- `html` (optional): HTML version of the email body, required if "text" is empty
- `cc` (optional): Array of CC recipient email addresses
- `bcc` (optional): Array of BCC recipient email addresses
- `category` (optional): Email category for tracking

## Development

1. Clone the repository:

```bash
git clone https://github.com/railsware/mailtrap-mcp.git
cd mailtrap-mcp
```

2. Install dependencies:

```bash
npm install
```

### Configuration with Claude Desktop or Cursor

Edit the Claude Desktop configuration file:

**Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "mailtrap": {
      "command": "node",
      "args": ["/path/to/mailtrap-mcp/dist/index.js"],
      "env": {
        "MAILTRAP_API_TOKEN": "your_mailtrap_api_token",
        "DEFAULT_FROM_EMAIL": "your_sender@example.com"
      }
    }
  }
}
```

If you are using `asdf` for managing Node.js you should use absolute path to executable:

(example for Mac)

```json
{
  "mcpServers": {
    "mailtrap": {
      "command": "/Users/<username>/.asdf/shims/node",
      "args": ["/path/to/mailtrap-mcp/dist/index.js"],
      "env": {
        "PATH": "/Users/<username>/.asdf/shims:/usr/bin:/bin",
        "ASDF_DIR": "/opt/homebrew/opt/asdf/libexec",
        "ASDF_DATA_DIR": "/Users/<username>/.asdf",
        "ASDF_NODEJS_VERSION": "20.6.1",
        "MAILTRAP_API_TOKEN": "your_mailtrap_api_token",
        "DEFAULT_FROM_EMAIL": "your_sender@example.com"
      }
    }
  }
}
```

### VS Code

```json
{
  "mcp": {
    "servers": {
      "mailtrap": {
        "command": "node",
        "args": ["/path/to/mailtrap-mcp/dist/index.js"],
        "env": {
          "MAILTRAP_API_TOKEN": "your_mailtrap_api_token",
          "DEFAULT_FROM_EMAIL": "your_sender@example.com"
        }
      }
    }
  }
}
```

## Testing

You can test the server using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npm run dev
```

## Contributing

Bug reports and pull requests are welcome on [GitHub](https://github.com/railsware/mailtrap-mcp). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Mailtrap project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).
