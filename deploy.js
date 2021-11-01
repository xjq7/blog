/* eslint-disable no-undef */
const Axios = require('axios')

const instance = Axios.create({
  baseURL: 'https://api.xjq.icu/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

function getUploadToken() {
  return instance.get('/oss/ststoken').then(({ data: responseData }) => {
    const { code, data } = responseData
    if (code === 1) {
      return data
    } else {
      process.exit(1)
    }
  })
}

const deploy = require('aliyun-oss-static-deploy')

function upload() {
  getUploadToken().then((ossConfig) => {
    const { AccessKeyId, AccessKeySecret, SecurityToken } = ossConfig || {}
    ossConfig = Object.assign({}, ossConfig, {
      stsToken: SecurityToken,
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
    })
    deploy({
      ossConfig,
      //  最好同时配置staticPath,ossPath,确定上传文件路径以及存储路径
      staticPath: 'docs/.vuepress/dist', // 默认为根路径
      ossPath: 'blog', // oss存储路径,默认是根路径,
      recursion: true, // 递归上传,默认为true,文件夹下所有文件递归上传
    })
  })
}

upload()
