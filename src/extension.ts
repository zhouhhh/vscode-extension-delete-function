import * as vscode from 'vscode';
import { getFunctionNode } from './main';

export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand(
		'vscode-extension-delete-function.helloWorld',
		() => {
			vscode.window.showInformationMessage('嘿嘿嘿!');

			const editor = vscode.window.activeTextEditor;

			if (!editor) {
				return;
			}
			const code = editor.document.getText();
			const index = editor.document.offsetAt(editor.selection.active); //鼠标所在位置索引

			const functionNode = getFunctionNode(code, index);
			if (!functionNode) {
				return;
			}

			editor.edit((editBuilder) => {
				editBuilder.delete(
					new vscode.Range(
						new vscode.Position(
							functionNode.start.line - 1,
							functionNode.start.column
						),
						new vscode.Position(
							functionNode.end.line - 1,
							functionNode.end.column
						)
					)
				);
			});
		}
	);
}
