import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rgbaToGray, binarize } from './threshold.js';

test('rgbaToGray 按亮度公式转换', () => {
  // 纯白、纯黑、纯红三像素
  const rgba = new Uint8ClampedArray([
    255, 255, 255, 255,
    0, 0, 0, 255,
    255, 0, 0, 255,
  ]);
  const gray = rgbaToGray(rgba);
  assert.equal(gray.length, 3);
  assert.equal(gray[0], 255);
  assert.equal(gray[1], 0);
  assert.equal(gray[2], Math.round(0.299 * 255));
});

test('binarize 按阈值二值化，含等号边界', () => {
  const gray = new Uint8Array([0, 60, 100, 101, 200]);
  const out = binarize(gray, 100);
  assert.deepEqual([...out], [0, 0, 255, 255, 255]);
});
