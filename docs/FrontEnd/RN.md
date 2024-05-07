[[toc]]

## 图标 icon

- 推荐工具,同时配置好安卓、ios 平台

  1.安装:npm install -g yo generator-rn-toolbox

  2.将 icon.png 放置于根目录

  ```Javascript
  yo rn-toolbox:assets --icon icon.png
  ```

- 手动替换安卓 icon 图标

  1. 先制作不同比例大小 icon，[推荐图标工厂](https://icon.wuruihong.com/)

  2.将制作好的 icon 放到项目/android/app/src/main/res 文件夹下，在这个目录下新建 values 文件夹，新建 strings.xml 文件，配置 app 名字

  ```xml
      <resources>
          <string name="app_name">***</string>
      </resources>
  ```

  新建 styles.xml 文件，配置 app 启动页面

  ```xml
      <resources>
          <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
              <item name="android:textColor">#000000</item>
              <item name="android:windowBackground">@drawable/launch_screen</item>
              <item name="windowNoTitle">true</item>
              <item name="android:windowFullscreen">true</item>
          </style>
      </resources>
  ```

## apk build 三方库出错的问题

- 检查下三方库中安卓编译输出版本跟项目编译输出版本是否一样

```Javascript
//android目录下build.gradle部分配置

buildscript {
    ext {
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 28
        supportLibVersion = "28.0.0"
    }
    ...
}

//node_modules下随机抽个例子
android {
    compileSdkVersion 23//-->28
    buildToolsVersion "23.0.2"//-->28.0.3

    defaultConfig {
        buildToolsVersion 16
        targetSdkVersion 23//-->28
        versionCode 1
        versionName "1.0"
    }
    ...
}
```

将依赖中的 compileSdkVersion,buildToolsVersion,targetSdkVersion 与 android 目录下 build.gradle 中保持一致,cd android && ./gradlew clean,然后重新编译

## apk 体积减小

1. 打开 android/app/build.gradle

```Javascript
//enableProguardInReleaseBuilds改为true
def enableProguardInReleaseBuilds = true
//enableSeparateBuildPerCPUArchitecture改为true
def enableSeparateBuildPerCPUArchitecture = true

android {
  ...
  //include只留下"armeabi-v7a", "x86"选项
  splits {
    abi {
      reset()
      enable enableSeparateBuildPerCPUArchitecture
      universalApk false
      include "armeabi-v7a", "x86"
    }
  }
  //加入shrinkResources true
  buildTypes {
      debug {
          signingConfig signingConfigs.debug
      }
      release {
          signingConfig signingConfigs.debug
          minifyEnabled enableProguardInReleaseBuilds
          shrinkResources true
          proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
      }
  }
}
2. cd android && ./gradlew clean && 重新打包,会生成两个体积减小的apk
```

## apk 打包报错

- java.lang.OutOfMemoryError,堆内存使用量达到最大内存限制

```java
//错误信息
* What went wrong:
Execution failed for task ':app:packageRelease'.
> 3 exceptions were raised by workers:
  java.lang.OutOfMemoryError
  java.lang.OutOfMemoryError
  java.lang.OutOfMemoryError

```

解决方法

```java
//在android/app/build.gradle加入
android {
  dexOptions{
    javaMaxHeapSize "4g"
  }
  ...
}

//在android/gradle.properties加入
org.gradle.jvmargs=-Xmx4608M
```

## android P http 问题

- Android Pie 不支持 http 请求，导致真机 release 包始终网络错误，刚开始有点懵，比较难排查到

  1.  在 res 目录下新增 xml 文件夹,xml 文件夹下新增 network_security_config.xml 文件，加入以下内容

  ```java
    <?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
      <base-config cleartextTrafficPermitted="true" />
    </network-security-config>
  ```

  2. AndroidManifest.xml 文件 application 标签中加入 android:networkSecurityConfig="@xml/network_security_config"

## android TextInput 文字显示只有半截

- android 输入框默认带有上下内边距,将上下边距设置为 0,paddingVertical: 0
