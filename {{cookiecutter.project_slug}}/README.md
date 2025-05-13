# {{ cookiecutter.extension_display_name }}

{{ cookiecutter.description }}

This project was generated from the `{{ cookiecutter.project_slug }}` Cookiecutter template.

## Features

- 🚀 TypeScript support for type safety
- ⚛️ React-based UI components
- 🔄 Redux state management
- 🌐 Built-in HTTP server (example)
- 🎨 VS Code theme-aware styling
- 🧪 Jest testing setup
- 🛠️ Preconfigured build tools

## Getting Started (after generating from template)

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Visual Studio Code

### Installation

1. Clone this repository (if you haven't generated it via Cookiecutter):
   ```bash
   git clone https://github.com/{{ cookiecutter.github_username }}/{{ cookiecutter.project_slug }}.git {{ cookiecutter.project_slug }}
   cd {{ cookiecutter.project_slug }}
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run compile
   ```

4. Build the webview:
   ```bash
   npm run build:webview
   ```

### Development

- Run the extension in debug mode by pressing F5 in VS Code.
- Watch for file changes during development:
  ```bash
  npm run watch
  ```
- Watch for webview changes during development:
  ```bash
  npm run dev:webview
  ```

### Testing

```bash
npm test
```

## Project Structure

- `src/`: Source code for the extension
  - `components/`: React components for the UI
  - `server/`: Server code for the HTTP server
  - `styles/`: Styling utilities and components
  - `store/`: Redux store configuration
  - `extension.ts`: Main extension file
  - `webview.tsx`: Entry point for the React application
- `test/`: Test files
- `assets/`: Static assets

## Commands

- `{{ cookiecutter.project_slug }}.showPanel`: Show the extension status panel

## Configuration

This extension contributes the following settings:

- `{{ cookiecutter.project_slug }}.serverPort`: The port on which the server will run (default: 8086) - *Note: Update this if your extension uses different settings.*

## Build and Publish

To build the extension for production:

```bash
npm run vscode:prepublish
```

Then use `vsce` to package and publish:
```bash
npm install -g @vscode/vsce
vsce package
# vsce publish --pat <YOUR_PAT> (if you have a publisher ID and Personal Access Token)
```

## License

[MIT](LICENSE) <!-- Make sure you have a LICENSE file -->

## Author

- {{ cookiecutter.author_name }} ({{ cookiecutter.author_email }})
