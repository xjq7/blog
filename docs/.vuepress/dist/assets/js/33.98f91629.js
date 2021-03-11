(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{244:function(s,a,t){"use strict";t.r(a);var r=t(0),e=Object(r.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"mac-下安装-mongo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac-下安装-mongo"}},[s._v("#")]),s._v(" mac 下安装 mongo")]),s._v(" "),t("ol",[t("li",[s._v("第一步")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("brew tap mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("brew\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("安装社区版")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("brew install mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("community@"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4.2")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//配置文件")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mongod"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("conf\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//log")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("log"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mongodb\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//数据存储位置")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mongodb\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("开启服务")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("brew services start mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("community@"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4.2")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("连接("),t("a",{attrs:{href:"https://robomongo.org/download",target:"_blank",rel:"noopener noreferrer"}},[s._v("图形化工具下载"),t("OutboundLink")],1),s._v(")")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("mongo\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"centos-安装-mongo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos-安装-mongo"}},[s._v("#")]),s._v(" centos 安装 mongo")]),s._v(" "),t("ol",[t("li",[s._v("更新yum源")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("yum update\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("添加mongo源")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("vim "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("yum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("repos"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("d"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("org"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("repo\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("在mongo源中写入以下信息")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("org"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nname"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("MongoDB Repository\nbaseurl"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("repo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mongodb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("org"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("yum"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("redhat"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("$releasever"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("org"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("x86_64"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("\ngpgcheck"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nenabled"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\ngpgkey"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("www"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mongodb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("org"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("pgp"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("server"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("asc\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("安装")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("sudo yum install mongodb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("org\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("管理")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("sudo systemctl start mongod "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//启动")]),s._v("\nsudo systemctl restart mongod"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//重启")]),s._v("\nsudo systemctl stop mongod"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//关闭")]),s._v("\nsudo systemctl enable mongod "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//开机自启")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mongod"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("conf "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//配置文件")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);