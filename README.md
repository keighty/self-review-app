# Self-Review Web App

This project helps engineers generate their self-review by automatically pulling contribution data from GitHub and guiding them through prompts using an LLM.

## Prerequisites

Before getting started, ensure you have the following installed:
- [Deno](https://deno.land/#installation)
- A GitHub personal access token with appropriate repository permissions

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/self-review-app.git
cd self-review-app
```

### 2. Install Deno (if not already installed)

Follow the official installation guide for your OS: [Deno Installation](https://deno.land/#installation)

### 3. Generate a GitHub Personal Access Token

This app requires a GitHub personal access token (PAT) with the following scopes:
- `repo` (for private and public repository access)
- `read:user` (to retrieve user information)

#### Steps to Generate a Token:
1. Go to [GitHub Developer Settings](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Select the following scopes:
   - `repo`
   - `read:user`
4. Generate the token and copy it. **Store it securely**, as it will not be visible again.

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```sh
touch .env
```

Add your GitHub token to the `.env` file:

```
GITHUB_TOKEN=your_personal_access_token_here
```

### 5. Run the Application

Start the web app using Deno:

```sh
deno run --allow-net --allow-read --allow-env src/main.ts
```

Now, open your browser and navigate to `http://localhost:8000` to begin your self-review!

## Next Steps
- Implement additional integrations (e.g., Jira, Linear)
- Enhance LLM-guided prompts
- Add UI improvements for a smoother experience
