
## 问题描述

使用两个 goroutine 交替打印序列，一个 goroutine 打印数字，另外一个 goroutine 打印字母

## 解题思路

使用 channel 来控制打印的进度，使用两个 channel ，来分别控制数字和字母的打印序列，数字打印完成后通过 channel 通知字母打印，字母打印完成后

通知数字打印，然后周而复始



