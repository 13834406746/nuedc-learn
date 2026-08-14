// 灰度化与固定阈值二值化（视觉入门最核心的两步）
export function rgbaToGray(data) {
  const n = data.length / 4;
  const gray = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    gray[i] = Math.round(0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]);
  }
  return gray;
}

export function binarize(gray, threshold) {
  const out = new Uint8Array(gray.length);
  for (let i = 0; i < gray.length; i++) out[i] = gray[i] >= threshold ? 255 : 0;
  return out;
}
