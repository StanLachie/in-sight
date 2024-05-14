# In-Sight

In-Sight is a news aggregator that fetches and emails the top articles from ProductHunt, Dev.to, and HackerNews.

## Features

- Fetches the top articles from ProductHunt, Dev.to, and HackerNews.
- Extracts the title & link from the top articles.
- Sends the article details via email using SMTP.

## Prerequisites

- Bun installed (https://bun.sh/)
- An email account to send emails via SMTP

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/stanlachie/in-sight.git
   cd in-sight
   ```

2. Install the dependencies using Bun:
   ```bash
   bun install
   ```

## Configuration

1. Update the SMTP configuration in the `.env` function in the script to use your SMTP server details, email, and password.
2. Replace the recipient email address with the desired recipient's email.

Example `.env` file:

```bash
FROM=...
TO=...
HOST=...
PORT=...
USER=...
PASS=...

DISCORD_WEBHOOK_URL=...
DISCORD_USER_ID=...
```

## Usage

1. Run the script using Bun:

   ```bash
   bun index.ts
   ```

## Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a pull request.

## License

This project is licensed under the MIT License.

Feel free to adjust the content to better fit your project's specifics and ensure that the installation and usage instructions are accurate for your project setup.
