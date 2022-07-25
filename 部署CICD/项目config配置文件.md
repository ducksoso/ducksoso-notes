这边项目的配置文件分为：`.env` 和 `k8s deploy helm values.yaml`

其中`.env`配置文件，直接在代码里进行解析

`values.yaml`文件是在`k8s`环境下进行解析的

```markdown
1. 该包是将项目中的 `.env` 文件解析到 环境变量中
	`github.com/joho/godotenv`

2. 该包是从环境变量中读取前缀为：`envPrefix` 的环境变量到 `config` 中
	`github.com/kelseyhightower/envconfig`
```

```go
func LoadConfigFromEnv(fileNames ...string) *Config {
	err := godotenv.Load(fileNames...)
	if err != nil {
		fmt.Println(".env config file not found, skip it")
	}

	envPrefix := defaultEnvPrefixValue
	prefix, exist := os.LookupEnv(envPrefixKey)
	if exist {
		envPrefix = prefix
	}

	var config Config
	err = envconfig.Process(envPrefix, &config)
	if err != nil {
		panic(err)
	}

	return &config
}
```











