import { Disposable, ExtensionContext, commands, extensions, window, workspace } from 'vscode'
import * as child from 'child_process'

export async function activate(ext: ExtensionContext) {
  let commandDisposable = commands.registerCommand('go-lines.helloWorld', async () => {
    await runGolines()
  })


  let saveDisposable = workspace.onDidSaveTextDocument(async (e) => {
    await runGolines()
  })

  ext.subscriptions.push(commandDisposable, saveDisposable)

}

async function runGolines() {
  let activeEditor = window.activeTextEditor;
  if (activeEditor) {
    let document = activeEditor.document;
    // document.uri.path 就是打开的文件的完整路径
    let uri = document.uri.path

    if (uri.includes(".go")) {
      let s = `golines -w ${uri} -m 150`
      child.exec(s, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
      })
    }
  }
}

export function deactivate() {

}
