# Self-Review Web App

A simple web application to help engineers and engineering managers generate their self-reviews. The app fetches contribution data from GitHub and guides users through prompts to create a self-review focused on business impact. It outputs a PDF or `.doc` file and suggests next steps for career development.

## Features
- Fetches GitHub contribution data via API key (no OAuth required)
- Guides users through structured prompts
- Generates self-reviews with a business impact focus
- Exports to PDF or `.doc`
- Supports integrations beyond GitHub (Jira, Linear) in future updates
- Stores data locally (no cloud syncing for now)

## Getting Started

### Prerequisites
- Install [Deno](https://deno.land/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/self-review-app.git
   cd self-review-app
   ```
2. Run the application:
   ```sh
   deno run -A main.ts
   ```

### Configuration
#### Creating a GitHub Personal Access Token (PAT)
To fetch data from GitHub, you need a Personal Access Token (PAT) with access to specific repositories. Follow these steps to generate one:

1. Go to [GitHub Developer Settings](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Provide a **note** (e.g., "Self-Review App Access").
4. Set an expiration date if needed.
5. Under **Select scopes**, only check:
   - `repo:read` → To read private repository data (optional if you only need public repo access).
6. Under **Repository access**, select "Only select repositories" and choose the ones you want to allow access to.
7. Click **Generate token** and copy the generated token.
8. Store the token securely, as you will not be able to see it again.

#### Using the GitHub PAT
- Provide your GitHub API key in the environment settings (e.g., `.env` or command line):
  ```sh
  export SELF_REVIEW_GITHUB_PAT=your_personal_access_token
  ```

### Roadmap
- Add onboarding flow
- Expand integrations (Jira, Linear)
- Improve UI for better user experience

## License
MIT License
