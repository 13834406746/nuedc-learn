import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runComplementaryDemo } from './filter-sim.js';

function rmse(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s / a.length);
}
function stdOfDiff(a) {
  const d = a.slice(1).map((v, i) => v - a[i]);
  const m = d.reduce((x, y) => x + y, 0) / d.length;
  return Math.sqrt(d.reduce((x, y) => x + (y - m) ** 2, 0) / d.length);
}

test('融合结果比纯陀螺积分更接近真值（不漂移）', () => {
  const r = runComplementaryDemo({ points: 500 });
  assert.ok(rmse(r.fused, r.truth) < rmse(r.gyroIntegral, r.truth));
});

test('融合结果比纯加速度计更平滑（抑制噪声）', () => {
  const r = runComplementaryDemo({ points: 500 });
  assert.ok(stdOfDiff(r.fused) < stdOfDiff(r.acc));
});

test('alpha=1 时递推退化为纯陀螺积分（增量一致）', () => {
  const r = runComplementaryDemo({ alpha: 1, points: 200 });
  const df = r.fused.slice(1).map((v, i) => v - r.fused[i]);
  const di = r.gyroIntegral.slice(1).map((v, i) => v - r.gyroIntegral[i]);
  assert.ok(df.every((d, i) => Math.abs(d - di[i]) < 1e-9));
});

test('alpha=0 时退化为纯加速度计', () => {
  const r = runComplementaryDemo({ alpha: 0, points: 200 });
  assert.ok(rmse(r.fused, r.acc) < 1e-9);
});
