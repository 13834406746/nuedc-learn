// 学习路径配置：两条主线的文章顺序（唯一事实来源）。
// slug 格式：`<collection>/<id 去 .mdx>`，如 'basics/c-pointers-bits'、'algorithms/control/pid-position'。
// 新增文章进主线：写文章后在此加一行即可；列表页、侧栏、路径页、上一篇/下一篇都会自动生效。

export const controlPath: string[] = [
  'basics/c-pointers-bits',
  'basics/stm32-interrupt',
  'basics/stm32-timer-pwm',
  'basics/sensors-common',
  'basics/stm32-uart',
  'basics/uart-dma-ringbuf',
  'algorithms/control/pid-position',
  'algorithms/control/pid-incremental',
  'algorithms/control/pid-cascade',
  'algorithms/control/pid-tuning',
  'algorithms/control/motor-closed-loop',
  'hardware/chassis-forms',
];

export const visionPath: string[] = [
  'algorithms/vision/python-basics',
  'algorithms/vision/opencv-intro',
  'algorithms/vision/image-basics',
  'algorithms/vision/color-tracking',
  'algorithms/vision/vision-uart-protocol',
  'contests/2023-e-target-tracking',
];

export interface PathDef {
  id: string;
  title: string;
  icon: string;
  steps: string[];
}

export const paths: PathDef[] = [
  { id: 'control', title: '控制进阶', icon: '🎯', steps: controlPath },
  { id: 'vision', title: '视觉从零', icon: '👁️', steps: visionPath },
];

/** 由 slug 反查它在哪条主线的第几关（0 基）。不在任何主线中返回 null。 */
export function findStep(slug: string): { path: PathDef; index: number } | null {
  for (const p of paths) {
    const i = p.steps.indexOf(slug);
    if (i >= 0) return { path: p, index: i };
  }
  return null;
}

/** 由文章的 collection + id 拼出标准 slug */
export function slugOf(collection: string, id: string): string {
  return `${collection}/${id.replace(/\.mdx$/, '')}`;
}
