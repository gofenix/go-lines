import { Disposable, ExtensionContext, RelativePattern, commands, extensions, window, workspace } from 'vscode'
import * as child from 'child_process'

export async function activate(ext: ExtensionContext) {
  initGolines()

  let initDisposable = commands.registerCommand('go-lines.init', async () => {
    await initGolines()
    window.showInformationMessage("go-lines.init ok")
  })

  let formatDisposable = commands.registerCommand('go-lines.format', async () => {
    await runGolines()
    window.showInformationMessage("go-lines.format ok")
  })

  let saveDisposable = workspace.onDidSaveTextDocument(async (e) => {
    await runGolines()
  })

  ext.subscriptions.push(initDisposable, formatDisposable, saveDisposable)
}

async function runGolines() {
  let activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return
  }
  // document.uri.path 就是打开的文件的完整路径
  let uri = activeEditor.document.uri.path
  if (!uri.includes(".go")) {
    return
  }

  let lineLength = workspace.getConfiguration().get("go-lines.lineLength", 120)
  let s = `golines -w ${uri} -m ${lineLength}`

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

async function initGolines() {
  const isGoProject = await hasGoFilesInWorkspace()
  if (!isGoProject) {
    return
  }

  window.setStatusBarMessage('Initializing golines...', 2 * 1000)

  let cmd = 'go install -v github.com/segmentio/golines@latest'
  child.exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`${cmd} error: ${error.message}`)
      window.showErrorMessage(`${cmd} error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`${cmd} stderr: ${stderr}`)
      window.showErrorMessage(`${cmd} stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)

  })
}

async function hasGoFilesInWorkspace() {
  const workspaceFolders = workspace.workspaceFolders;
  if (workspaceFolders) {
    for (const folder of workspaceFolders) {
      const filePattern = new RelativePattern(folder, '**/*.go');
      const goFiles = await workspace.findFiles(filePattern);
      if (goFiles && goFiles.length > 0) {
        return true;
      }
    }
  }
  return false;
}

export function deactivate() {

}
