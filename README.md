<p align="center">
  <img src="https://github.com/user-attachments/assets/6187d285-6ca1-4118-9e96-3d50761dd6b5" width="128">
  <h1 align="center">SSH Connector</h1>
</p>

Reads SSH configuration files and allows you to select and connect to defined hosts via SSH.

## Settings

| name | description |
| --- | --- |
| `sshConfigPath` | Path to SSH config file (defaults to `~/.ssh/config`) |
| `terminalApp` | Terminal application to execute SSH commands (currently supports `Terminal` and `iTerm` only, defaults to `Terminal`) |

## Commands

| name | description |
| --- | --- |
| `Connect SSH` | Select a hostname and execute the `ssh <host>` command |
