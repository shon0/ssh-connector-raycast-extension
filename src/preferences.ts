import { getPreferenceValues } from "@raycast/api";

// Preferences の型定義
type TerminalApp = "Terminal" | "iTerm";
type Preferences = {
  sshConfigPath: string;
  terminalApp: TerminalApp;
};

// Raycast Preferences から設定値を取得
export const preferences = getPreferenceValues<Preferences>();
