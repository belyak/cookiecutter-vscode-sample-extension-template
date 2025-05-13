// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  console.log('{{ cookiecutter.project_slug }}: Activated');

  context.subscriptions.push(
    vscode.commands.registerCommand('{{ cookiecutter.project_slug }}.showPanel', () => {
      const panel = vscode.window.createWebviewPanel(
        '{{ cookiecutter.project_slug }}Status', // Type of the webview. Used internally
        '{{ cookiecutter.extension_display_name }} Status', // Title of the panel displayed to the user
        { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, 'out'), 
            vscode.Uri.joinPath(context.extensionUri, 'assets')
          ]
        }
      );
      
      // Set icon for the webview panel tab
      panel.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'icon.svg');

      const scriptUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'out', 'webview.js')
      );

      // Load HTML from file
      const htmlPath = vscode.Uri.joinPath(context.extensionUri, 'src', 'webview.html');
      let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');
      
      // Replace the script placeholder with the actual script URI
      htmlContent = htmlContent.replace('<!-- Script URI will be injected by the extension -->', 
        `<script src="${scriptUri}" defer></script>`);
      
      panel.webview.html = htmlContent;
      
      // Log when the panel is disposed
      panel.onDidDispose(() => {
        console.log('WebView panel disposed for {{ cookiecutter.project_slug }}');
      }, null, context.subscriptions);
      
      // Listen for theme changes
      vscode.window.onDidChangeActiveColorTheme(() => {
        if (panel.visible) {
          panel.webview.postMessage({ 
            type: 'vscode-theme-changed',
            theme: vscode.window.activeColorTheme.kind
          });
        }
      }, null, context.subscriptions);
      
      // Handle messages from the webview
      panel.webview.onDidReceiveMessage(
        (message: any) => {
          console.log('Message from {{ cookiecutter.project_slug }} webview:', message);
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log('{{ cookiecutter.project_slug }}: Deactivated');
}
