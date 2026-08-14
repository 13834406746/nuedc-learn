// Astro v7 内容层缓存（node_modules/.astro/data-store.json）存在 bug：
// 删除内容文件后缓存条目不失效，构建会尝试渲染已删除文件并报错。
// 每次构建前强制全量重建，站内内容量小，代价可忽略。
import { rmSync } from 'node:fs';
rmSync('node_modules/.astro', { recursive: true, force: true });
