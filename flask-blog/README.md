# 博客 API 后端

这是一个使用 Flask 构建的博客 API 后端，为 Next.js 前端提供数据。

## 功能

- 提供博客文章列表 API
- 提供单篇博客文章 API
- 支持跨域请求 (CORS)

## 本地开发

1. 安装依赖:
```bash
pip install -r requirements.txt
```

2. 运行应用:
```bash
python app.py
```

应用将在 http://localhost:5001 上运行。

## 部署

此应用可以部署到任何支持 Python 的云平台，如 Heroku、Railway 或 Render。

### 环境变量

部署时需要设置以下环境变量:

- `DATABASE_URL`: 数据库连接 URL
- `SECRET_KEY`: 应用密钥
- `PORT`: (可选) 应用运行的端口

## API 端点

- `GET /api/posts`: 获取所有博客文章
- `GET /api/posts/<id>`: 获取单篇博客文章
