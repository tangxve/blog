# om my zsh 更新问题

## 更新命令：

```shell
omz update
```

或者

```shell
upgrade_oh_my_zsh
```

## 更新失败遇到的问题

### The unauthenticated git protocol on port 9418 is no longer supported.

不再支持端口9418上未经身份验证的 git 协议

问题：

```shell
[oh-my-zsh] Would you like to update? [Y/n]

Updating Oh My Zsh
fatal: remote error:
  The unauthenticated git protocol on port 9418 is no longer supported.
Please see https://github.blog/2021-09-01-improving-git-protocol-security-github/ for more information.
There was an error updating. Try again later?

```

看起了 git 协议安全性的问题

解决方法：

```shell
git config --global url."https://github.com/".insteadOf git://github.com/
```

参考：

[The unauthenticated git protocol on port 9418 is no longer supported](https://stackoverflow.com/questions/70663523/the-unauthenticated-git-protocol-on-port-9418-is-no-longer-supported)




