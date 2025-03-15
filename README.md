# Self-Review App

## Overview
The **Self-Review App** is an open-source web application designed to help engineers and engineering managers generate effective self-reviews. It guides users through structured prompts, fetches contribution data from GitHub, Jira, and Linear using API keys, and produces a downloadable self-review document focused on business impact. The app also assists users in preparing STAR-format stories for interviews and updating their resumes.

## Features
- Fetches GitHub contributions (PRs, commits, issues) via API key
- Supports Jira and Linear integrations for tracking work
- Guided self-review questions to surface accomplishments
- Generates a structured self-review in **PDF** or **DOCX** format
- Provides career growth next steps: STAR stories and resume bullet generation
- **Local storage only** – no cloud sync, ensuring privacy

## Installation

### Prerequisites
- Install **Deno** (v1.40+):
  - macOS/Linux: `brew install deno`
  - Windows: `scoop install deno`
  - Or via shell: `curl -fsSL https://deno.land/install.sh | sh`

### Clone the Repository
```sh
git clone git@github.com:keighty/self-review-app.git
cd self-review-app
```

### Start the Application
```sh
deno task start
```
Then open **http://localhost:8000** in your browser.

## Usage
1. **Enter API Keys** (GitHub, Jira, Linear) to fetch contribution data.
2. **Review Contributions**: View fetched PRs, commits, and tasks.
3. **Self-Reflection**: Answer guided questions about your achievements.
4. **Generate Self-Review**: Download as a **PDF** or **DOCX**.
5. **Career Growth Tools**:
   - Convert accomplishments into **STAR stories** for interviews.
   - Generate **resume bullet points** from your work.

## Contributing
This project is open-source! Contributions are welcome. To contribute:
1. Fork the repo & create a feature branch.
2. Implement changes and commit.
3. Open a pull request for review.

## License
This project is licensed under the **MIT License**.

---

🔗 **Repository:** [GitHub](https://github.com/keighty/self-review-app)

