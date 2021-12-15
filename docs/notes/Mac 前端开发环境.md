# Mac 前端开发环境

软件：

- [Chrome](https://www.google.cn/chrome/)
- [iTerm2](https://iterm2.com/)
- [WebStrom](https://www.jetbrains.com/zh-cn/webstorm/download/#section=mac)
- [Sourcetree](https://www.sourcetreeapp.com/)
- [ShadowsocksX-NG-R8](http://3.112.62.253:65534/shiyong/dy-mac.html)

## Chrome

现在下载不用翻墙了

国内下载地址：[https://www.google.cn/chrome/](https://www.google.cn/chrome/)

设置插件：[chrome://extensions/](chrome://extensions/)

### 暗黑模式切换

关闭 暗黑模式

```shell
defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool YES
# 重新启动 Chrome
```

打开 暗黑模式

```shell
defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool NO
# 重新启动 Chrome
```

## ShadowsocksX-NG-R8

- [ShadowsocksX-NG-R8](http://3.112.62.253:65534/shiyong/dy-mac.html)

::: details 查看详细信息

地址：[https://fstok.com/user](https://fstok.com/user)
:::

## iTerm2

下载地址：[https://iterm2.com/](https://iterm2.com/)

## Oh-My-Zsh

github：[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

curl：

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

wget:

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 支持翻墙

:::tip

首先得有梯子
:::

1、添加配置

```shell
# 查看当前 IP 
alias proxy-ip = "curl http://cip.cc"


# 开启代理方法
proxy-on() {
export http_proxy =http://127.0.0.1:1087 
# 只代理 https 请求
export https_proxy=http://127.0.0.1:1087
# 代理所有请求
export ALL_PROXY=http://127.0.0.1:1087
  echo "HTTP Proxy on"
}


# 关闭代理方法
proxy-off() {
  unset http_proxy
  unset https_proxy
  unset ALL_PROXY
  echo "HTTP Proxy off"
}
```

2、重新加载 zsh 的配置

```shell
source ~/.zshrc
```

3、使用

查看当前 IP

```shell
proxy-ip
```

IP 信息

```shell
IP	: 101.69.249.90
地址	: 中国  浙江  杭州
运营商	: 联通

数据二	: 浙江省杭州市 | 联通

数据三	: 中国浙江杭州 | 联通

URL	: http://www.cip.cc/101.0.0.0
```

开启代理：

```shell
proxy-on
```

```shell
# 查看IP
proxy-ip

# IP 信息
IP	: 203.175.12.118
地址	: 不丹  不丹

数据二	: 香港 | 特别行政区

数据三	: 中国香港

URL	: http://www.cip.cc/203.175.12.118
```

关闭代理：

```shell
proxy-off
```

## Zsh 插件配置

::: tip 

1、查看已经安装的插件

```shell
cd ~/.oh-my-zsh/plugins
```

2、如果已经安装，可以直接在 `plugins` 中添加

```shell
vim ~/.zshrc

# 再插件列表中添加
plugins=(git zsh-autosuggestions z ...other plugin)
```

3、重新加载 zsh 的配置
```shell
source ~/.zshrc
```
:::

参考：[zsh oh-my-zsh 插件推荐](https://hufangyun.com/2017/zsh-plugin/)

- 命令自动补全：[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)
- 命令高亮检测：[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
- 目录间快速跳转,不用再一直 cd：[autojump](https://github.com/wting/autojump)
- 目录间快速跳转,不用再一直 cd：[Z](https://github.com/wting/autojump)

### 命令自动补全：zsh-autosuggestions

github：[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

1、clone 插件

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2、把插件称加入 oh-my-zsh 插件列表

```shell
# 打开 zsh 配置文件
open ~/.zshrc
or
vim ~/.zshrc

# 把插件名称加入插件列表
plugins=(git zsh-autosuggestions) 
```

3、重新加载 zsh 的配置

```shell
source ~/.zshrc
```

### Z 快速切换文件路径

1、默认安装oh my zsh时就已经安装了 z 插件，具体可以在以下目录看到

```shell
cd ~/.oh-my-zsh/plugins
```

2、只需要在(~/.zshrc)中的插件列表中添加
```shell
vim ~/.zshrc
# 再插件列表中添加
plugins=(其他插件 z)
```

3、重新加载 zsh 的配置

```shell
source ~/.zshrc
```

## WebStrom

下载地址：[https://www.jetbrains.com/zh-cn/webstorm/download/#section=mac](https://www.jetbrains.com/zh-cn/webstorm/download/#section=mac)

可以选择 M1 版本

