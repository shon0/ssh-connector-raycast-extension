import { exec } from "node:child_process";
import { closeMainWindow, showToast, Toast } from "@raycast/api";
import { preferences } from "./preferences";

const { terminalApp } = preferences;

// AppleScript のスクリプトを -e オプション形式に変換する共通関数
const formatAppleScript = (script: string): string => {
  const formattedScript = script
    .trim()
    .split("\n")
    .map((line) => `-e '${line.trim()}'`)
    .join(" ");

  return `osascript ${formattedScript}`;
};

// iTerm 用の AppleScript コマンド
// iTerm をアクティブにして、新しいウィンドウを作成し、ssh コマンドを実行する
const getItermAppleScript = (host: string): string => {
  const script = `
tell application "iTerm"
  activate
  create window with default profile
  tell current session of current window
    write text "ssh ${host}"
  end tell
end tell
`;
  return formatAppleScript(script);
};

// Terminal.app 用の AppleScript コマンド
// Terminal.app で新規ウィンドウに ssh コマンドを実行する
const getTerminalAppleScript = (host: string): string => {
  const script = `
tell application "Terminal"
  activate
  do script "ssh ${host}"
end tell

`;
  return formatAppleScript(script);
};

const execShellCommand = (command: string, host: string) => {
  exec(command, (error) => {
    if (error) {
      showToast(Toast.Style.Failure, `Failed to connect using ${terminalApp}`, error.message);
      return;
    }
    showToast(Toast.Style.Success, "SSH Connection Started", `Connecting to ${host} using ${terminalApp}...`);
    // Raycast のメインウィンドウを閉じる
    closeMainWindow();
  });
};

// SSH 接続を実行する関数
// 選択されたターミナルアプリに応じた AppleScript コマンドを実行します
export const connectToHost = (host: string) => {
  if (terminalApp === "iTerm") {
    const command = getItermAppleScript(host);
    execShellCommand(command, host);
  } else {
    const command = getTerminalAppleScript(host);
    execShellCommand(command, host);
  }
};
