# Homebrew

## Homebrew

[官网地址](https://brew.sh/index_zh-cn)

#### 1. 更新 Homebrew

要获取最新的包的列表，首先得更新 Homebrew 自己。这可以用 brew update 办到。

```sh
brew update
```

#### 2. 更新包 (formula)

更新之前，我会用 ``brew outdated`` 查看哪些包可以更新。

```sh
brew outdated
```

然后就可以用 ``brew upgrade`` 去更新了。Homebrew 会安装新版本的包，但旧版本仍然会保留。

```sh
# 更新所有的包
berw upgrade

# 更新指定的包
brew upgrade $FORMULA    
```

#### 3. 清理旧版本

一般情况下，新版本安装了，旧版本就不需要了。我会用 ``brew cleanup`` 清理旧版本和缓存文件。Homebrew 只会清除比当前安装的包更老的版本，所以不用担心有些包没更新但被删了。

```shell script
# 清理所有包的旧版本
brew cleanup

# 清理指定包的旧版本
brew cleanup $FORMULA

# 查看可清理的旧版本包，不执行实际操作
brew cleanup -n
```

这样一套下来，该更新的都更新了，旧版本也被清理了。

#### 4. 锁定不想更新的包

如果经常更新的话，``brew update`` 一次更新所有的包是非常方便的。但我们有时候会担心自动升级把一些不希望更新的包更新了。

数据库就属于这一类，尤其是 PostgreSQL 跨 minor 版本升级都要迁移数据库的。我们更希望找个时间单独处理它。这时可用 ``brew pin`` 去锁定这个包，然后 ``brew update`` 就会略过它了。

```sh
# 锁定某个包
brew pin $FORMULA

# 取消锁定
brew unpin $FORMULA
```

#### 5.其他几个常用命令

查看包的相关信息

```shell script
# 可以查看包的相关信息，最有用的应该是包依赖和相应的命令
brew info
```


