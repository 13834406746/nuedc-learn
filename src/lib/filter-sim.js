// 互补滤波仿真：真值 0→90° 平滑运动（45·(1-cos(πt/T))，T=4s），
// 加速度计角度 = 真值 + 高斯噪声；陀螺积分 = 真实角速度积分 + 恒定漂移。
// 融合：fused[k] = alpha·(fused[k-1] + gyroRate·dt) + (1-alpha)·acc[k]
export function runComplementaryDemo(opts = {}) {
  const {
    alpha = 0.95, points = 300, dt = 0.02,
    noiseStdDeg = 2, gyroBiasDegPerS = 0.3,
  } = opts;
  const T = 4;

  // 确定性伪随机高斯（Box-Muller + 固定种子，保证测试可复现）
  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const gauss = () => {
    const u = Math.max(rand(), 1e-9), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  const t = [], truth = [], acc = [], gyroIntegral = [], fused = [];
  let integ = 0, f = 0;
  for (let k = 0; k < points; k++) {
    const time = k * dt;
    const angle = 45 * (1 - Math.cos(Math.PI * time / T));       // 真值
    const rate = (45 * Math.PI / T) * Math.sin(Math.PI * time / T); // 真实角速度 deg/s
    const a = angle + gauss() * noiseStdDeg;
    integ += (rate + gyroBiasDegPerS) * dt;
    f = k === 0 ? a : alpha * (f + (rate + gyroBiasDegPerS) * dt) + (1 - alpha) * a;
    t.push(time); truth.push(angle); acc.push(a); gyroIntegral.push(integ); fused.push(f);
  }
  return { t, truth, acc, gyroIntegral, fused };
}
