---
title: docker-compose使用volume部署mysql时permission deny问题解决
date: 2020-09-23
categories: 
  - 前端技术
tags:
  - docker
cover: https://pan.zealsay.com/zealsay/cover/5.jpg
---

::: tip
整体情况为使用 docker 做 mysql 的容器，然后结合其他服务一起通过 docker-compose 启动，并且为了一次性建表和设置用户权限我又在 mysql 中封装了 setup.sh、schema.sql、privileges.sql 这些自定义的脚本，在 Dockerfile 构造时执行，到目前为止都是正常的。
:::

<!-- more -->

## 问题

整体情况为使用 docker 做 mysql 的容器，然后结合其他服务一起通过 docker-compose 启动，并且为了一次性建表和设置用户权限我又在 mysql 中封装了 setup.sh、schema.sql、privileges.sql 这些自定义的脚本，在 Dockerfile 构造时执行，到目前为止都是正常的。

但是由于每次 down 掉容器后，mysql 的数据会丢失无法持久化，所以在 docker-compose.yml 中配置了 volume 参数，然后就产生了如下的报错，包括调试过程中的报错。

首先列几个可能的报错，这些都和这个有关系。

问题一：mysqld: Can’t create/write to file ‘/var/lib/mysql/is_writable’ (Errcode: 13 - Permission denied)

问题二：’su’ command in Docker returns ‘must be run from terminal’

问题三：/usr/bin/mysqld_safe: 637: /usr/bin/mysqld_safe: cannot create /var/lib/mysql/c0ce8fdc06d0.err: Permission denied

以上几个问题都是我在调试过程中出现的报错，采用过以下办法解决：

1、在 docker-compos.yml 中添加

```yaml
user:"1000:50"
```

2、保证 volume 配置对应的是/var/lib/mysql 目录，不能是/var/lib/mysql/data 更深一层目录
3、在 Dockerfile 中添加权限指令 chmod 一类的，来修改文件权限
上述的方法均无效，在列出真正的解决方案之前，我把我重要的几个配置文件列出来
docker-compose.yml

```yaml
plate-nginx:
build: ./nginx
container_name: plate-nginx
links:
- plate-client:plate-client
- plate-server:plate-server
ports:
- "80:80"
- "443:443"
- "7000:7000"
plate-client:
build: ./client
container_name: plate-client
volumes:
- "/home/picture:/app/client/app/upload"
ports:
- "3000:3000"
- "3001:3001"
plate-server:
build: ./server
container_name: plate-server
ports:
- "7001:7001"
plate-mysql:
build: ./mysql
container_name: plate-mysql
volumes:
- "/home/data:/var/lib/mysql"
ports:
- "3306:3306"
environment:
MYSQL_USER: root
MYSQL_ROOT_PASSWORD: 123456
phpmyadmin:
image: phpmyadmin/phpmyadmin
container_name: phpmyadmin
links:
- plate-mysql:plate-mysql
ports:
- "8888:80"
environment:
MYSQL_USER: root
MYSQL_ROOT_PASSWORD: 123456
PMA_HOST: plate-mysql
PMA_PORT: 3306
```

mysql 下的 Dockerfile

```Dockerfile
FROM mysql:5.6

#设置免密登录
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

#将所需文件放到容器中
COPY setup.sh /mysql/setup.sh
COPY schema.sql /mysql/schema.sql
COPY privileges.sql /mysql/privileges.sql

#设置容器启动时执行的命令
CMD ["sh", "/mysql/setup.sh"]
```

setup.sh

```shell
#!/bin/bash
set -e

#查看mysql服务的状态，方便调试，这条语句可以删除
echo `service mysql status`

echo '1.启动mysql....'
#启动mysql
service mysql start
sleep 3
echo `service mysql status`

echo '2.开始导入数据....'
#导入数据
mysql < /mysql/schema.sql
echo '3.导入数据完毕....'

sleep 3
echo `service mysql status`

#重新设置mysql密码
echo '4.开始修改密码....'
mysql < /mysql/privileges.sql
echo '5.修改密码完毕....'

#sleep 3
echo `service mysql status`
echo `mysql容器启动完毕,且数据导入成功`

tail -f /dev/null
```

## 解决方案

真正的问题所在其实就是在服务器上的 volume 目录/home/data 和容器里目录/var/lib/mysql 拥有者不一样导致的，那么如何查看拥有者，需要使用如下几条指令
查看容器中/var/lib/mysql 的所有者

docker run -ti --rm --entrypoint="/bin/bash" plate_plate-mysql -c "ls -la /var/lib/mysql"

可以从图中看出来这个目录的所有者是 mysql 用户组
查看服务器中/home/data 的所有者

ls -la /home/data

在 systemd-bus-proxy 这个位置原来是 root，这里由于被我修改了所以是这样，也就是说，这两个目录的所有者不同导致的权限问题，现在把他们的 id 统一就可以了，统一前要先查出来容器里的 mysql 用户组 id，然后修改服务器的/home/data 下的用户组 id
查出来容器里的 mysql 用户组 id

docker run -ti --rm --entrypoint="/bin/bash" plate_plate-mysql -c "cat /etc/group"

可以看到 mysql 用户组的 id 为 999
修改服务器文件用户组 id

chown -R 999:999 /home/data

修改后再去查看就如上图一样，权限变成了 systemd-bus-proxy，至于为什么没变成 mysql 呢，因为 999 是 docker 容器里面的权限 id，不是服务器的，所以服务器不识别也是自然的，之后再重启，执行
docker-compose build && docker-compose up -d

就不会再有报错了

> 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 本文链接：http://blog.csdn.net/grape875499765/article/details/80089853
