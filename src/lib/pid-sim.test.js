import { test } from 'node:test';
import assert from 'node:assert/strict';
import { simulatePid } from './pid-sim.js';

test('输出长度为 steps+1，初始值为 0', () => {
  const r = simulatePid({ steps: 100 });
  assert.equal(r.y.length, 101);
  assert.equal(r.y[0], 0);
});

test('纯 P 控制存在稳态误差（一阶对象）', () => {
  const r = simulatePid({ kp: 2, ki: 0, kd: 0, steps: 500 });
  const err = Math.abs(r.setpoint - r.y[r.y.length - 1]);
  assert.ok(err > 1, `稳态误差应大于 1，实际 ${err}`);
});

test('加入积分后稳态误差被消除', () => {
  const r = simulatePid({ kp: 2, ki: 8, kd: 0, steps: 800 });
  const err = Math.abs(r.setpoint - r.y[r.y.length - 1]);
  assert.ok(err < 0.5, `稳态误差应小于 0.5，实际 ${err}`);
});

test('适度 Kd 降低超调', () => {
  const noD = simulatePid({ kp: 4, ki: 12, kd: 0, steps: 800 });
  const withD = simulatePid({ kp: 4, ki: 12, kd: 0.3, steps: 800 });
  assert.ok(withD.overshoot < noD.overshoot,
    `有 D 超调 ${withD.overshoot}% 应小于无 D ${noD.overshoot}%`);
});

test('执行器饱和被强制执行', () => {
  const r = simulatePid({ kp: 1000, ki: 0, kd: 0, steps: 50 });
  assert.ok(Math.max(...r.u) <= 200 + 1e-9);
});
