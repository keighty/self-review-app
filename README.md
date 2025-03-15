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
- Provide your GitHub API key in the environment settings (e.g., `.env` or command line).

### Roadmap
- Add onboarding flow
- Expand integrations (Jira, Linear)
- Improve UI for better user experience

## License
MIT License
