import { Disposable, ExtensionContext, RelativePattern, commands, extensions, window, workspace } from 'vscode'
import * as child from 'child_process'

export async function activate(ext: ExtensionContext) {
  initGolines()

  let commandDisposable = commands.registerCommand('go-lines', async () => {
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

async function initGolines() {
  const isGoProject = await hasGoFilesInWorkspace()
  if (!isGoProject) {
    return
  }

  window.showInformationMessage("Initializing golines...")
  let cmd = 'go install -v github.com/segmentio/golines@latest'

  child.exec(cmd, (error, stdout, stderr) => {
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
