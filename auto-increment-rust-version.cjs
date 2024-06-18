// auto-increment-rust-version.cjs
// upgrade package version for rust
const fs = require('fs');
const path = require('path');

const tauriConfPath = path.join(__dirname, 'src-tauri/tauri.conf.json');
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));

const versionParts = tauriConf.version.split('.').map(x => parseInt(x, 10));
// 假设默认递增修订号
versionParts[2] += 1;
const newVersion = versionParts.join('.');

tauriConf.version = newVersion;
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2));

console.log(`Rust version updated to ${newVersion}`);
