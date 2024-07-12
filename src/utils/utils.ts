// src/utils/utils.ts
import { open } from '@tauri-apps/plugin-shell';

export const openExternalLink = async (url: string) => {
  try {
    await open(url);
  } catch (e) {
    console.error('Failed to open URL with Tauri, opening in a new tab', e);
    window.open(url, '_blank');
  }
};

export const shortenAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)} **** ${address.substring(address.length - 4)}`;
};
