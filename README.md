# MCP Mailtrap Server

An MCP server that provides a tool for sending transactional emails via Mailtrap

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/railsware/mailtrap-mcp.git
   cd mailtrap-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration with Claude for Desktop

Edit the Claude for Desktop configuration file:

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
        "DEFAULT_FROM_EMAIL": "your_sender@domain.com",
      }
    }
  }
}
```

## Usage

Once configured, you can ask Claude to send emails, for example:

- "Send an email to john.doe@example.com with the subject 'Meeting Tomorrow' and a friendly reminder about our upcoming meeting."
- "Email sarah@company.com about the project update, and CC the team at team@company.com"

## Available Tool

### send-email

Sends a transactional email through Mailtrap.

**Parameters:**
- `to` (required): Email address of the recipient
- `subject` (required): Email subject line
- `text` (required): Email body text
- `cc` (optional): Array of CC recipient email addresses
- `bcc` (optional): Array of BCC recipient email addresses
- `category` (optional): Email category for tracking
- `html` (optional): HTML version of the email body

## Testing

You can test the server using the MCP Inspector:

```bash
npm run dev
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
