[[toc]]

> [ReactNative 干货分享——自定义 iconfont 图标的使用](https://juejin.im/post/5ae1685bf265da0b8a675199#comment)

## react-native-vector-icons

- 首先安装 react-native-vector-icons 依赖

```js
//添加依赖
yarn add react-native-vector-icons
//将资源文件链接到原生目录下,link之后可以看到  android/app/src/main/assets/fonts目录下的ttf文件
react-native link react-native-vector-icons
//link完后建议重新编译安装app
react-native run-android

```

- 官方图标的使用([官方文档](https://oblador.github.io/react-native-vector-icons/))

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/CustomizeIconfont/officailDoc.png"/>
</div>

```js
import Icon from 'react-native-vector-icons/AntDesign'

const Test = () => {
  return <Icon name="right" size={20} color="lime" />
}
//更过图标的使用具体看官方文档
```

## 阿里矢量图标库的使用

1. 在阿里云矢量图标库官网选取一组图标后,到购物车下载源代码得到一个压缩包,解压后看到如下一些文件

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/CustomizeIconfont/iconfontCode.png"/>
</div>

2. 将 iconfont.ttf 与 iconfont.svg 拷贝到我们项目根目录下,新建一个目录 assets/fonts,将 iconfont.ttf 放在这下面,我们需要通过其他配置文件将这个资源文件链接到原生项目里面

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/CustomizeIconfont/iconfontPath.png"/>
</div>

根目录下新建 react-native.config.js 文件,写入以下内容

```js
module.exports = {
  assets: ['./assets/fonts'],
}
```

3. iconfont.svg 文件中包含每个图标的名字和对应的十六进制 unicode 编码，将十六进制编码转换成十进制,这里我们通过脚本来批量完成,将脚本文件与 iconfont.svg 都放在根目录下
   新建 iconfont_mapper.sh

```sh
#!/bin/sh

if [ $# != 1 ] ; then

	echo "usage: $0 iconfont.svg(your svg file name)  "
	exit
fi

#OutputFile path,you can customize your path
OutputFileName=`echo iconfont.json`

mapper=` awk '{ if($0 ~ /glyph-name/) print $0;  if($0 ~ /unicode/)  print $0"|split|" }'  $1| tr '[:upper:]' '[:lower:]'| awk '{print $0}'  RS='\='| tr "\n\"&#;" " "| awk  '{ if ($1!="split"&&$1!=""){ printf ("\""$3"\":"); printf ($5","); print "\r " }}' RS="|split|" | sed "s/-/_/g"`

rm $OutputFileName
echo "{" >> $OutputFileName
echo $mapper >> $OutputFileName
echo "}" >> $OutputFileName

#usage:
# ./iconfont_mapper.sh svg_file_path
```

然后运行脚本文件生成我们需要的 json 文件

```js
sudo bash ./iconfont_mapper.sh iconfont.svg
```

4. 使用
   在项目中新建 iconfont.js,将上个步骤中生成的 iconfont.json 放在同级目录下

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/CustomizeIconfont/iconfontJson.png"/>
</div>

```js
import createIconSet from 'react-native-vector-icons/lib/create-icon-set'
import glyphMap from './iconfont.json'

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export default iconSet

export const Button = iconSet.Button
export const TabBarItem = iconSet.TabBarItem
export const TabBarItemIOS = iconSet.TabBarItemIOS
export const ToolbarAndroid = iconSet.ToolbarAndroid
export const getImageSource = iconSet.getImageSource
```

5. 最后就是使用我们的字体了(重新编译一下,同时检查 android 目录下是否添加了 iconfont.ttf,可以手动复制过来...)

```js
import Icon from '../static/iconfont/iconfont'//这是我跟个人路径
const Test = ()=>{
  return (
    <Icon name="public_question" size={20}></Icon>//name对应iconfont.json中的key
    <Icon name="integral" size={20}></Icon>
    <Icon name="fail" size={20}></Icon>
    <Icon name="public_question" size={20}></Icon>
  )
}
```
