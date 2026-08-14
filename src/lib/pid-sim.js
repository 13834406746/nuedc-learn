// 位置式 PID + 一阶惯性对象（直流电机速度环简化模型）的离散仿真。
// 对象： dy/dt = (K*u - y) / T，u 经执行器饱和 [-uMax, uMax]。
export function simulatePid(opts = {}) {
  const {
    kp = 1, ki = 0, kd = 0,
    setpoint = 100, steps = 300, dt = 0.02,
    plantTau = 0.5, plantGain = 1, uMax = 200,
  } = opts;

  let y = 0, integral = 0, prevErr = 0;
  const yArr = [y], uArr = [0];
  for (let k = 0; k < steps; k++) {
    const err = setpoint - y;
    integral += err * dt;
    const deriv = (err - prevErr) / dt;
    let u = kp * err + ki * integral + kd * deriv;
    if (u > uMax) u = uMax;
    if (u < -uMax) u = -uMax;
    y += (dt * (plantGain * u - y)) / plantTau;
    prevErr = err;
    yArr.push(y);
    uArr.push(u);
  }

  const peak = Math.max(...yArr);
  const overshoot = peak > setpoint ? ((peak - setpoint) / setpoint) * 100 : 0;
  const band = Math.abs(setpoint) * 0.02;
  let settle = Infinity;
  for (let i = yArr.length - 1; i >= 0; i--) {
    if (Math.abs(yArr[i] - setpoint) > band) { settle = (i + 1) * dt; break; }
  }
  return { y: yArr, u: uArr, setpoint, overshoot, settleTime: settle };
}
