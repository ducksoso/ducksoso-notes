

## Hyper-V 开启与关闭

### 使用CMD和DISM启用Hyper-V

使用DISM启用Hyper-v

1. 以管理员身份打开PowerShell或CMD会话

2. 键入以下命令

   ```powershell
   DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
   
   ```



### 关闭Hyper-v

```powershell
bcdedit /set hypervisorlaunchtype off

```

