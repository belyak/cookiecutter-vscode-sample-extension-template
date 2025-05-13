# VSCode Extension Template with React and Redux

A cookiecutter template for creating VS Code extensions with React, Redux, and TypeScript.

## Features

- 🚀 TypeScript support for type safety
- ⚛️ React-based UI components
- 🔄 Redux state management
- 🎨 VS Code theme-aware styling
- 🧪 Jest testing setup
- 🛠️ Preconfigured build tools

## Using This Template

### Prerequisites

- [Python](https://www.python.org/) (3.7 or higher)
- [pipx](https://pypa.github.io/pipx/) (0.15 or higher)
- [Node.js](https://nodejs.org/) (14.x or higher)
- [npm](https://www.npmjs.com/) (6.x or higher)
- [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1. Install pipx if you haven't already:
   ```bash
   # macOS
   brew install pipx
   pipx ensurepath
   
   # Linux
   python3 -m pip install --user pipx
   python3 -m pipx ensurepath
   
   # Windows
   python -m pip install --user pipx
   python -m pipx ensurepath
   ```

2. Install Cookiecutter using pipx:
   ```bash
   pipx install cookiecutter
   ```

3. Generate a new VS Code extension project:
   ```bash
   cookiecutter https://github.com/belyak/cookiecutter-vscode-sample-extension-template.git
   ```

4. Follow the prompts to customize your project:
   - `project_name`: Display name of your extension
   - `project_slug`: Technical name for the extension (used for directories and package names)
   - `extension_id`: Unique identifier for your extension
   - `extension_display_name`: Name shown in VS Code marketplace
   - `description`: Short description of your extension
   - `author_name`: Your name
   - `author_email`: Your email
   - `github_username`: Your GitHub username
   - `version`: Initial version (typically 0.0.1)
   - `publisher_id`: Your VS Code marketplace publisher ID

5. Once generated, navigate to your new project directory:
   ```bash
   cd your-project-slug
   ```

6. Install dependencies:
   ```bash
   npm install
   ```

7. Build the extension:
   ```bash
   npm run compile && npm run build:webview
   ```

8. Open the project in VS Code to start development:
   ```bash
   code .
   ```

## Development

See the generated project's README.md for detailed instructions on developing, testing, and publishing your VS Code extension.

## License

This template is open-sourced under the [MIT License](LICENSE).
