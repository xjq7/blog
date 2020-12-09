---
title: 登录表单
---

## 前言

-   周末是写代码最安静的时候,是时候展示真正的技术了

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/formRegister/banzhuan.jpg"/>
</div>

-   这次搬的砖是学习使用基础 hook 实现注册表单在前端的校验(useState、useReducer(状态有点多)、useRef(定值)))

-   对自己的代码负责,对使用技术理解更深刻,实现逻辑更清晰

-   先试试效果图

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/formRegister/rendering.gif"/>
</div>

<div style="text-align:center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/formRegister/demand.jpg"/>
</div>

-   需求的定义[需求虽然少,但是我 bug(高产似母猪)、代码多啊]

    1.注册有三个输入框,每个输入框暂时只考虑长度限制

    2.每个输入框都需要实时监听是否符合格式(右边的 icon 提示)

    3.提交按钮在都为空值的时候禁用，以及每个输入框只要有一个 fail 都是禁用状态

    4.确认密码只要输入密码框 fail 也为 fail,当输入密码框 success 以及确认密码框值与输入密码框值相等时 success

    5.判断情况多,都需要实时检测(在任意输入框发生变化时)

-   不熟悉这几个 hook 可以先看看官网 demo: [react 官网](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## 封装输入框

-   我们的输入框需要自己一个 value 状态控制自己值得显示,以及父级传过来得 status 控制 icon 显示,
-   只要轮子写得好,bug 改到老,本人擅长无事化小、小事化大、大事化更大、简单变复杂、正常变 bug

```js
import React, { useState } from 'react'
import { TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Iconfont from 'react-native-vector-icons/AntDesign'
import { Device } from '@common/index'

interface Prop {
  status: boolean//控制icon状态
  placeholder: string
  icon: JSX.Element
  number?: number
  password?: boolean
  get(value: string): void//将输入框值传给父组件
}

const Input = (props: Prop) => {
  const [value, setValue] = useState('')
  const { placeholder, icon, number = 30, password = false, get, status } = props
  return (
    <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/*左边icon*/}
        <View style={styles.icon}>{icon}</View>
        <TextInput
          clearButtonMode='while-editing'
          secureTextEntry={password}
          placeholder={placeholder}
          value={value}
          maxLength={number}
          onChangeText={(v) => {
            setValue(v)
            get(v)
          }}
          style={styles.ipt}
        />
      </View>
      {/*每个输入框右边的小icon*/}
      {value !== '' && (
        <Iconfont
          name={status ? 'checkcircleo' : 'closecircleo'}
          size={20}
          color={status ? 'lime' : 'red'}
          style={{ marginRight: -25 }} />
      )}
    </KeyboardAvoidingView>
  )
}

```

## 全部状态值(state)

-   Status:

    1.前三个分别控制输入框右边 icon 显示

    2.disabled 控制 button 禁用状态,仔细研究了下,相关联的 state 都交给 reducer 控制,在 reducer 里面有时候取不到 useRef 中的值,之前单独拎出来 disabled 可能更麻烦

    3.errorMessage:ErrorType:当然就是最根据前三个状态值要显示的错误信息了具体报错信息显示

<div style="text-align:center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/formRegister/bugaibugimg.gif"/>
</div>

```js
//现学现用typescript,瞎几把写,能跑就行
interface ErrorType {
	account: string;
	password: string;
	confirm: string;
	[key: string]: string;
}
//错误信息
let errorMessage: ErrorType = {
	account: '用户名不合法!',
	password: '密码长度不能少于8位!',
	confirm: '两次密码输入不一致!',
};

interface Status {
	account: boolean;
	password: boolean;
	confirm: boolean;
	disabled: boolean;
	[key: string]: boolean | ErrorType;
	error: ErrorType;
}
const initialStatus: Status = {
	account: false, //控制右边小icon的状态值,false为fail
	password: false,
	confirm: false,
	disabled: true, //控制button的状态
	error: {
		//控制错误信息，为什么有三个，如果只有一个error的话，
		//当你第一个输入框error后，在第二个输入框未出现error会清空上一个error信息
		account: '',
		password: '',
		confirm: '',
	},
};
//useReducer  action动作参数
interface ActionType {
	type: string; //我更新哪个输入框的状态
	value: string; //子组件中取到的输入框中的值
	// 存储在组件中的定值,account,password,confirm,
	// 他们不需要在视图中，而是在next方法中作为参数请求接口
	current: string;
}

//useReducer方法(state逻辑处理函数)，接收我们dispatch以及携带的参数，
//因为存了5个state，根据参数判断作出何种反应以及对哪个state作出反应
function reducer(status: Status, action: ActionType) {
	const { value, current } = action;
	const type: string = action.type;
	let flag: boolean = true;
	switch (type) {
		case 'account':
			flag = value.length > 2 && value.length < 8;
			break;
		case 'password':
			flag = value.length >= 8 && value.length <= 16;
			if (!flag) {
				//我出问题了  显示fail  把确认密码也显示成fail
				status.confirm = false;
				status.error['confirm'] = errorMessage['confirm']; //显示confirm  error信息
			} else {
				if (current === value) {
					//如果我没问题success再让我跟确认密码框值比较相等,说明确认密码框也没问题了
					status.confirm = true;
					status.error['confirm'] = errorMessage['']; //清空confirm  error信息
				}
			}
			break;
		case 'confirm':
			//判断和输入的密码是不是一样,并且输入密码框没fail我右边icon才能显示success
			flag = value === current && status.password;
	}
	if (flag) {
		//统一处理大家都会做的操作
		status.error[type] = '';
		status[type] = true;
	} else {
		status.error[type] = errorMessage[type];
		status[type] = false;
	}
	return {
		//这里return出去的值便是reducer更新后的一坨状态值,
		//看齐Status接口,disabled比较单独判断,三个state都满足success才行
		...status,
		disabled: !(status.account && status.password && status.confirm),
	};
}
```

## 父组件

-   为什么那么复杂、花里胡哨呢? react 太灵活了,它给了我们小轮子,让每个人都有了自己风格习惯的代码

<div style="text-align:center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/formRegister/jsimg.jpg"/>
</div>

-   写的很杂,但是又不能少,不然没效果,前端的一些校验有些鸡肋,但是对使用技术更熟练了,多搞搞总能变秃的

<div style="text-align:center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/formRegister/tuziimg.jpg"/>
</div>

```js
//把三个轮子的参数抽出来
const Account = {
	placeholder: '请输入帐号',
	icon: <Iconfont name="user" size={15} />,
};
const Password = {
	placeholder: '请输入密码',
	icon: <Iconfont name="lock1" size={15} />,
	password: true,
};

const Confirm = {
	placeholder: '请确认密码',
	icon: <Iconfont name="lock1" size={15} />,
	password: true,
};

const FormInput = () => {
	//这个是改变这个页面是登录框还是注册框的状态值
	const [state, setState] = useState(true);

	//第一个参数reducer,我们的state逻辑处理函数,第二个参数初始化这一坨state,
	//拿到的status便是一砣子状态,dispatch是一个操控reducer方法的函数,
	//它的参数告诉reducer该改变哪个state,改成什么样,看我的参数吧
	const [status, dispatch] = useReducer(reducer, initialStatus);

	//使用useRef的好处,我们不需要根据这个值更新视图,我们只需要拿到值作为参数，
	//请求注册接口,相对于state减少不必要的re-render,
	//他要更新视图的需求在子组件中已经做了
	const account = useRef('');
	const pwd = useRef('');
	const confirm = useRef('');
	//最终提交方法
	const next = () => {};
	return (
		<>
			<Input
				{...Account}
				status={status.account}
				get={value => {
					account.current = value; //把子组件中的输入值取出来存在父组件定值中
					dispatch({
						//帮我改下account相关的状态
						type: 'account',
						value: value,
						current: account.current,
					});
				}}
			/>
			<Input
				{...Password}
				status={status.password}
				get={value => {
					pwd.current = value;
					dispatch({
						//帮我改下password相关的状态值,我把确认密码的值和我自己的值都丢给你了，
						//对比一下可能会把确认密码框右边的icon状态改了
						type: 'password',
						value: value,
						current: confirm.current,
					});
				}}
			/>
			{state && (
				<Input
					{...Confirm}
					status={status.confirm}
					get={value => {
						confirm.current = value;
						dispatch({
							//帮我改下confirm相关的状态值,我把密码框的值和我自己的值都丢给你了，你自己对比完改改
							type: 'confirm',
							value: value,
							current: pwd.current,
						});
					}}
				/>
			)}
			{status.disabled ? ( //上面三兄弟状态都没问题我就隐藏错误信息了
				Object.values(status.error).map((item, index) => {
					if (item)
						return (
							<Text
								key={index}
								style={{
									color: 'red',
									width: Device.width * 0.6,
									marginLeft: Device.width * 0.2,
								}}>
								{item}
							</Text>
						);
				})
			) : (
				<Text
					style={{
						color: 'lime',
						width: Device.width * 0.6,
						marginLeft: Device.width * 0.2,
					}}>
					信息准确无误!
				</Text>
			)}
			<View
				style={{
					width: Device.width * 0.6,
					marginLeft: Device.width * 0.2,
					marginTop: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
				<TouchableOpacity onPress={() => setState(!state)}>
					<Text style={{ color: Color.FontColor }}>{state ? '登录' : '注册'}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setState(!state)}>
					<Text style={{ color: Color.FontColor }}>忘记密码?</Text>
				</TouchableOpacity>
			</View>
			<Button
				disabled={status.disabled}
				type="info"
				style={styles.btn}
				onPress={() => {
					next();
				}}>
				提交
			</Button>
		</>
	);
};
const styles = StyleSheet.create({
	btn: {
		width: Device.width * 0.8,
		marginLeft: Device.width * 0.1,
		marginTop: 20,
	},
});
```
