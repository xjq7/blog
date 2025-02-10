[[toc]]

# WebGL 编程指南

## WebGL 起源

最早使用的两种三维图形渲染技术是 Direct3D 和 OpenGL

Direct3D是微软 DirectX 技术的一部分, 是一套由微软控制的编程接口(API), 主要使用在 Windows 平台

OpenGL 开放及免费, 广泛用在 Macintosh 或 Linux 系统 计算机、智能手机、平板电脑、家用游戏机等各种设备

Windows 对 OpenGL 也提供了良好支持, 可以替换 Direct3D

WebGL 根植于 OpenGL, 从 OpenGL 的一个特殊版本 OpenGL ES 派生出来

## 入门

着色器运行在 WebGL 系统中, 而非 Js 程序中

WebGL 程序包括运行在浏览器中的 Js 和运行在 WebGL 系统的着色器程序

### 齐次坐标

齐次坐标(x, y, z, w) 等价于三维坐标(x/w, y/w, z/w)

### 着色器

顶点着色器 控制点的位置和大小
片元着色器 控制点的颜色

片元即是每个像素, 它包含像素的位置、颜色和其他信息

可以通过 attribute 和 uniform 变量将 位置信息从 Js 传给 顶点着色器

attribute 变量传输的是与顶点相关的数据, 它是 GLSL ES 变量, 只有顶点着色器能使用

uniform 变量传输的是对所有顶点都相同(或与顶点无关)的数据
