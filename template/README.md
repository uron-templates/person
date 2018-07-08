# uron template person

- 启动 dev 环境
```
npm run dev
```

- 在线上环境启动

>> 注：需要将 `.env` 文件上传到服务器（因为并没有被 `git` 跟踪），并修改相应的配置为线上环境(如数据库用户名、密码等)。

```
pm2 start app.config.js
```