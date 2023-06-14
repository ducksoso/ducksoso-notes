## goimports-reviser 排序

----

### 老版本的命令：

```sh
Usage of goimports-reviser:
  -file-path string
        File path to fix imports(ex.: ./reviser/reviser.go). Optional parameter.
  -format
        Option will perform additional formatting. Optional parameter.
  -list-diff
        Option will list files whose formatting differs from goimports-reviser. Optional parameter.
  -local string
        Local package prefixes which will be placed after 3rd-party group(if defined). Values should be comma-separated. Optional parameters.
  -output string
        Can be "file", "write" or "stdout". Whether to write the formatted content back to the file or to stdout. When "write" together with "-list" will list the file name and write back to the file. Optional parameter. (default "file")
  -project-name string
        Your project name(ex.: github.com/incu6us/goimports-reviser). Optional parameter.
  -rm-unused
        Remove unused imports. Optional parameter.
  -set-alias
        Set alias for versioned package names, like 'github.com/go-pg/pg/v9'. In this case import will be set as 'pg "github.com/go-pg/pg/v9"'. Optional parameter.
  -set-exit-status
        set the exit status to 1 if a change is needed/made. Optional parameter.
  -version
        Show version.


// 所以使用的时候如下：
goimports-reviser -file-path $FilePath$ --rm-unused --local "git.basebit.me/xdp-hkha","git.basebit.me"

```



### 新版本命令如下

```sh
Usage of goimports-reviser:
  -apply-to-generated-files
        Apply imports sorting and formatting(if the option is set) to generated files. Generated file is a file with comment which starts with comment '^// Code generated .* DO NOT EDIT\.$'. Generated comment must before package fragment. Optional parameter.
  -company-prefixes string
        Company package prefixes which will be placed after 3rd-party group by default(if defined). Values should be comma-separated. Optional parameters.
  -format
        Option will perform additional formatting. Optional parameter.
  -imports-order string
        Your imports groups can be sorted in your way. 
        std - std import group; 
        general - libs for general purpose; 
        company - inter-org or your company libs(if you set '-company-prefixes'-option, then 4th group will be split separately. In other case, it will be the part of general purpose libs); 
        project - your local project dependencies. 
        Optional parameter. (default "std,general,company,project")
  -list-diff
        Option will list files whose formatting differs from goimports-reviser. Optional parameter.
  -output string
        Can be "file", "write" or "stdout". Whether to write the formatted content back to the file or to stdout. When "write" together with "-list-diff" will list the file name and write back to the file. Optional parameter. (default "file")
  -project-name string
        Your project name(ex.: github.com/incu6us/goimports-reviser). Optional parameter.
  -recursive
        Apply rules recursively if target is a directory. In case of ./... execution will be recursively applied by default. Optional parameter.
  -rm-unused
        Remove unused imports. Optional parameter.
  -set-alias
        Set alias for versioned package names, like 'github.com/go-pg/pg/v9'. In this case import will be set as 'pg "github.com/go-pg/pg/v9"'. Optional parameter.
  -set-exit-status
        set the exit status to 1 if a change is needed/made. Optional parameter.
  -use-cache
        Use cache to improve performance. Optional parameter.

// 所以使用的时候如下：
goimports-reviser -format $FilePath$ --rm-unused -company-prefixes "git.basebit.me/xdp-hkha","git.basebit.me"

```



#### 格式化某个文件

`goimports-reviser -rm-unused -set-alias -format ./reviser/reviser.go`

#### You can also apply rules to a dir or recursively apply using ./... as a target:

`goimports-reviser -rm-unused -set-alias -format -recursive reviser`

`goimports-reviser -rm-unused -set-alias -format ./...`


In case of ./... execution will be recursively applied by default 亦` ./... === recursive`







https://github.com/incu6us/goimports-reviser



