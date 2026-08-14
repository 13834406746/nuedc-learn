# nuedc-learn · 电赛学习站

个人电赛备战知识库：控制类进阶 + 视觉类从零到实战。内容优先，网站只是工具。

## 本地写作

```bash
npm install
npm run dev        # http://localhost:4321/nuedc-learn/（注意带 base 路径）
```

## 新增文章

在 `src/content/<板块>/` 下新建 `.mdx` 文件，frontmatter 模板：

```yaml
---
title: 文章标题
description: 一句话摘要（列表页与搜索用）
track: control     # control | vision | both
tags: [标签1]
date: 2026-08-14
resources:         # 可选：精选外链，自动汇总到资源页
  - title: 资源名
    url: https://example.com
    note: 一句话说明
---
```

正文是普通 Markdown；需要交互演示时一行嵌入：`<PidDemo />`（还有 `FilterDemo`、`ThresholdDemo`，组件在 `src/components/`）。嵌入前在 frontmatter 之后加一行导入，路径按文章所在目录数 `../`（算法板块的文章是 `../../../components/PidDemo.astro`）。

## 上线

push 到 main 即自动构建部署（GitHub Actions）。构建失败不会影响线上旧版本，去仓库 Actions 页看日志。

## 命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发（搜索不可用） |
| `npm run build` | 构建 + pagefind 建索引（含 schema 校验与死链检查） |
| `npm run preview` | 预览构建产物（搜索可用） |
| `npm test` | 跑 `src/lib/` 单元测试 |

## 内容结构

- `src/content/basics/` — 基础知识
- `src/content/algorithms/control/` — 控制类算法（PID、电机闭环……）
- `src/content/algorithms/vision/` — 视觉类算法（环境搭建、识别、通信……）
- `src/content/hardware/` — 机械与硬件
- `src/content/contests/` — 赛题解析
