import * as fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { preferences } from "./preferences";

// ホームディレクトリのパスを展開（`~` を実際のパスに変換）
const expandHomeDir = (filePath: string): string => {
  if (filePath.startsWith("~")) {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
};

// SSH Config ファイルのパス
const configFilePath = expandHomeDir(preferences.sshConfigPath);

// SSH Config のパース：コメント行と空行を除外し、"Host" 行からホスト名を抽出
export const parseSSHConfig = async (): Promise<string[]> => {
  const content = await fs.readFile(configFilePath, "utf8");
  const lines = content.split("\n");

  const hostsSet = new Set<string>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    // コメント行と空行はスキップ
    if (trimmedLine.startsWith("#") || trimmedLine === "") continue;

    // "Host" キーワードで始まる行を対象とする（大文字小文字は無視）
    if (trimmedLine.toLowerCase().startsWith("host ")) {
      // "Host" の後の部分を取り出し、複数ホスト名が記載されている可能性に対応
      const hostEntries = trimmedLine.substring(5).trim().split(/\s+/);
      for (const host of hostEntries) {
        // ワイルドカード "*" は除外
        if (host === "*") continue;
        hostsSet.add(host);
      }
    }
  }

  return Array.from(hostsSet);
};
