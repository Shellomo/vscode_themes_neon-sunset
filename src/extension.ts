import * as vscode from 'vscode';
import { initializeTelemetryReporter, TelemetryLog } from './telemetry';

export function activate(context: vscode.ExtensionContext) {
    initializeTelemetryReporter(context);
    TelemetryLog('info', 'Theme activated');

    // Register theme change event listener
    context.subscriptions.push(
        vscode.window.onDidChangeActiveColorTheme((theme) => {
            // Get the current theme from workspace configuration
            const currentTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme');

            if (currentTheme === 'Shellomo.neon-sunset') {
                const previousTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme', '');
                TelemetryLog('metric', 'Theme selected', {
                    previousTheme,
                    themeKind: theme.kind.toString(),
                    timestamp: new Date().toISOString()
                });
            }
        })
    );
}

export function deactivate() {
    TelemetryLog('info', 'Theme deactivated');
}