---
title: Github Action实现自动发布到云服务器
date: 2020-03-17
categories: 
  - 前端技术
tags:
  - CI
  - Github
---

::: tip
使用 github action 实现个人 vuepress 博客自动部署到阿里云服务器
:::

<!-- more -->

当 github 仓库发生 push 操作时，action 会通过 ssh(配置公钥与私钥与阿里云服务器免密连接)传送到 nginx 服务器的静态资源目录下。

## 写在前面的

因为在我购买阿里云服务器时选择的系统配置是 windows server 2019 版本的，所以不能通过 ssh 来实现阿里云服务器与本地电脑实现 ssh 免密连接，进而也不能实现 github action 与阿里云服务器的免密连接。

![选项卡](../../images/vuepress/2020/031701.png)

最后的解决方案是更改阿里云服务器的系统配置。

![选项卡](../../images/vuepress/2020/031702.png)

更改服务器系统配置的具体操作如下：

![选项卡](../../images/vuepress/2020/031703.png)
![选项卡](../../images/vuepress/2020/031704.png)
![选项卡](../../images/vuepress/2020/031705.png)

## 正文开始

生成一个新的 ssh key：

将生成的 ssh 公钥 public key 添加到 github 中：

![选项卡](../../images/vuepress/2020/031706.png)
![选项卡](../../images/vuepress/2020/031707.png)
![选项卡](../../images/vuepress/2020/031708.png)

遇到的主要问题

![选项卡](../../images/vuepress/2020/031709.png)

添加阿里云服务器.ssh 目录下的 ssh 私钥 private key 到 github 当前项目的 setting》secrets 中：

![选项卡](../../images/vuepress/2020/031710.png)

将公钥写入 authorized_keys 文件中的命令是：

```
[root@iZm5e8dv3a3meqZ .ssh]# cat id_rsa.pub >> ~/.ssh/authorized_keys
```

打开 authorized_keys 文件中的命令是：

```
vim authorized_keys
```

退出 authorized_keys 文件中的命令是：

```
:wq
```

删除文件命令：rm -f authorized_keys

## 我的 github action(nodejs)配置

```yml
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm run build --if-present
        env:
          CI: true
      # Deploy
      - name: Deploy
        uses: easingthemes/ssh-deploy@v2.0.7
        env:
          SSH_PRIVATE_KEY: ${{ secrets.ALIYUN }}
          ARGS: "-rltgoDzvO --delete"
          SOURCE: "./docs/.vuepress/dist/"
          REMOTE_HOST: "你的阿里云公网ip"
          REMOTE_USER: "用户名：如root"
          TARGET: "web服务器静态文件托管文件地址如：/usr/share/nginx"
```

## 写在后面的

this all thank you!

# References

1. [阿里云服务器-自动部署一键部署（哔哩哔哩视频）](https://www.bilibili.com/video/av91796463)
2. [Centos 7 下安装配置 Nginx](https://yq.aliyun.com/articles/699966)
3. [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
4. [ssh key 与 github 配置（实现本地电脑/阿里云服务器与 github 的免密通信）](https://shanyue.tech/op/ssh-setting.html#permission-denied-publickey)
5. [Linux 学习笔记--rm 命令(删除文件或目录)](https://blog.csdn.net/daidaineteasy/article/details/50663101)
