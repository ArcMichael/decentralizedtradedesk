# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup
---

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### How to output a tree diagram with module of tree
1. Install tree-cli globally using pnpm:
```shell
pnpm install -g tree-cli
```
2. Output a tree diagram up to 3 levels deep, ignoring node_modules:
```shell
npx tree -l 3 -o output.txt --ignore node_modules/
    or
npx tree -l 3 -o output.txt --ignore node_modules/
```
3. This will generate a file named output.txt with the tree diagram of your project structure.
---

### Compile and Migrate Smart Contracts
#### Compile Contracts

```shell
npm run truffle-compile
```
#### Migrate Contracts

```shell
npm run truffle-migrate
```
#### If you still face issues, consider the following:
1. Delete the build directory and recompile:
```shell
rm -rf build
npm run truffle-compile
```
2. Check your Truffle configuration file (truffle-config.ts) for any misconfigurations.
