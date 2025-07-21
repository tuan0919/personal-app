---
trigger: always_on
---

# Windows Command Line Rules - STRICT ENFORCEMENT

## CRITICAL: Operating System Context

- **CURRENT OS**: Microsoft Windows (NOT Linux, NOT macOS)
- **DEFAULT TERMINAL**: Windows Command Prompt (cmd.exe) or PowerShell
- **FILE PATHS**: Use backslashes (\) NOT forward slashes (/)
- **DRIVE LETTERS**: Always use C:\, D:\ format

## Command Equivalents - ALWAYS Use Windows Version

| Task             | ❌ NEVER Use (Linux) | ✅ ALWAYS Use (Windows)                             |
| ---------------- | -------------------- | --------------------------------------------------- |
| List files       | `ls -la`             | `dir` hoặc `Get-ChildItem`                          |
| Copy files       | `cp source dest`     | `copy source dest` hoặc `Copy-Item`                 |
| Move files       | `mv source dest`     | `move source dest` hoặc `Move-Item`                 |
| Delete files     | `rm filename`        | `del filename` hoặc `Remove-Item`                   |
| Create directory | `mkdir dirname`      | `mkdir dirname` hoặc `New-Item -ItemType Directory` |
| Clear screen     | `clear`              | `cls` hoặc `Clear-Host`                             |
| Show path        | `pwd`                | `cd` hoặc `Get-Location`                            |
| Environment vars | `export VAR=value`   | `set VAR=value` hoặc `$env:VAR="value"`             |

## File Path Rules

- **Absolute paths**: `C:\Users\username\project`
- **Relative paths**: `.\folder\file.txt`
- **Environment variables**: `%USERPROFILE%` hoặc `$env:USERPROFILE`

## Shell Detection Protocol

1. **Before ANY command**: Check if running on Windows
2. **Always assume**: Windows Command Prompt or PowerShell
3. **Never use**: bash, zsh, sh commands
4. **Path separators**: Always use backslash (\)

## Terminal Command Examples

- Install packages: `npm install` (NOT `sudo npm install`)
- Run scripts: `npm run dev` (NOT `./script.sh`)
- File operations: `type file.txt` (NOT `cat file.txt`)
- Process management: `tasklist` (NOT `ps aux`)
