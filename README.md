# Discord Message to Email Bot

This is a bot that listens to new messages on specified Discord channels and forwards those messages to a specific email address.

## Requirements

* Node.js (v14 or later recommended)
* NPM (v6 or later recommended)
* A Discord bot token
* Gmail credentials for sending emails

## Getting Started

### Clone the repository

```bash
git clone https://github.com/beingforthebenefit/discord-email-bot.git
cd discord-email-bot
```

### Install dependencies

```bash
npm install
```

### Configuration

The bot uses the following environment variables, which are stored in a `.env` file.

* `BOT_TOKEN`: Your Discord bot token
* `EMAIL_USER`: The SMTP username for the email account sending the emails
* `EMAIL_PASSWORD`: The SMTP password for the email account sending the emails
* `TO_EMAIL`: The email address where all messages will be sent

Create a `.env` file in the root directory of the project, and fill in these values:

```env
BOT_TOKEN=your_discord_bot_token
EMAIL_USER=gmail_username
EMAIL_PASSWORD=gmail_app_password
TO_EMAIL=destination_email
```

### Channel Mapping

The bot maps Discord channels to reply-to email addresses. This mapping is defined in the `channelEmailMap.json` file. 

For example:

```json
{
  "general": "<string>@pcmailhook.com",
  "photos": "<string>@pcmailhook.com",
  "website": "<string>@pcmailhook.com",
  "practices": "<string>@pcmailhook.com",
  "gigs": "<string>@pcmailhook.com"
}
```

Personally, I generated these email addresses from `pabbly.com`, which takes the content, strips out reply threads, and posts them in the corresponding channel.

### Building the Docker Image

You can build the Docker image for the bot using the following command:

```bash
docker build -t discord-email-bot .
```

### Running the Bot

You can start the bot using the following command:

```bash
docker run -d --env-file .env discord-email-bot
```

The bot will then log into Discord and start listening to messages in the specified channels.

## Contributing

For any issues, questions, or suggestions, please open an issue in the repo, or contact me directly at gerald@gtodd.dev.

## Author

Gerald Todd - [gtodd.dev](https://gtodd.dev)
