import { chmodSync, copyFileSync, mkdirSync } from 'node:fs';

const output = '/output/entry.png';
mkdirSync('/output', { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), output);
chmodSync(output, 0o644);
