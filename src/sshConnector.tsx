import { List, ActionPanel, Action, showToast, Toast, Icon } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { parseSSHConfig } from "./sshConfigParser";
import { connectToHost } from "./connectToHost";

export default function Command() {
  // useCachedPromise を使用して SSH Config のパース結果をキャッシュする
  const { data: hosts, isLoading, error } = useCachedPromise(parseSSHConfig, []);

  // エラーが発生した場合、トーストで通知する
  if (error) {
    showToast(Toast.Style.Failure, "Failed to load SSH Config", String(error));
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search SSH hosts...">
      <List.Section title="SSH Hosts">
        {hosts?.map((host) => (
          <List.Item
            key={host}
            title={host}
            actions={
              <ActionPanel>
                <Action title="Connect" onAction={() => connectToHost(host)} />
              </ActionPanel>
            }
            icon={Icon.Terminal}
          />
        ))}
      </List.Section>
    </List>
  );
}
