## Scoop 安装

1. 允许本地脚本执行

```bash
set-executionpolicy remotesigned -scope currentuser
```

2. 安装

PowerShell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
···

3. 检查 scoop

```bash
scoop -v
```

## windows terminal

1. 在[https://github.com/microsoft/terminal/releases](https://github.com/microsoft/terminal/releases)下载安装包,执行.msixbundle 文件

[windows terminal 文档](https://docs.microsoft.com/zh-cn/windows/terminal/)

2. 主题配置

[Windows 终端中的配色方案](https://docs.microsoft.com/zh-cn/windows/terminal/customize-settings/color-schemes)

windows terminal 配置文件修改，你也可以查看上面文档选择自己喜欢的

```json
"profiles": {
    "defaults": {
      "colorScheme": "Solarized Light",
      "fontFace": "Cascadia Code PL"
    },
   ...
},
```

## oh my posh 安装

```bash
scoop install https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/oh-my-posh.json
```

[oh my posh 文档](https://ohmyposh.dev/docs/installation)

## posh-git 安装

```bash
scoop install posh-git
Add-PoshGitToProfile
```

## 在 windows terminal 中使用

1. 查看 PowerShell 配置文件路径,文件夹打开没看见就按他的名字跟路径新建一个

```bash
$profile
```

2. 将这些内容添加到 PowerShell 配置文件中

[主题列表](https://ohmyposh.dev/docs/themes),我选择的是 Paradox

```bash
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme Paradox
```

3. 下载字体文件

[https://github.com/microsoft/cascadia-code/releases](https://github.com/microsoft/cascadia-code/releases)

解压后添加到 C:\Windows\Fonts 中
