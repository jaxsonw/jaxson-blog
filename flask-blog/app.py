from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
# 更新 CORS 配置，允许来自本地开发环境和前端部署的请求
CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:3000", 
    "http://localhost:3001",
    "https://jaxson-blog.vercel.app"
], "methods": ["GET"]}})

# 加载环境变量
load_dotenv()
# 使用环境变量中的数据库 URL，否则使用默认的 SQLite 数据库
database_url = os.getenv('DATABASE_URL', 'sqlite:///blog.db')
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')

db = SQLAlchemy(app)

# 定义 Post 模型
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# 创建表并添加测试数据
with app.app_context():
    db.create_all()
    # 检查是否需要添加初始数据
    if Post.query.count() <= 1:  # 如果数据库中只有一条或没有数据
        # 保留原有的测试数据
        if not Post.query.first():
            post = Post(title="My Custom DB Post", content="This is from myblogdb!")
            db.session.add(post)
        
        # 添加模拟数据
        mock_posts = [
            {
                "title": "如何使用 React 和 Next.js 构建现代网站",
                "content": "React 是一个用于构建用户界面的 JavaScript 库，而 Next.js 是一个基于 React 的框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等。本文将介绍如何使用 React 和 Next.js 构建现代网站...\n\n在当今快速发展的网络世界中，用户对网站的期望越来越高。他们希望网站能够快速加载、响应迅速，并提供流畅的用户体验。React 和 Next.js 的组合可以帮助开发者满足这些期望。\n\nReact 的组件化设计使得代码更易于维护和重用，而 Next.js 则通过提供服务器端渲染和静态站点生成等功能，解决了传统单页应用的一些问题，如首次加载速度慢和搜索引擎优化困难等。"
            },
            {
                "title": "TypeScript 入门指南",
                "content": "TypeScript 是 JavaScript 的超集，它添加了静态类型和其他功能，使开发大型应用程序变得更加容易。本文将介绍 TypeScript 的基本概念和用法，帮助你快速入门...\n\nTypeScript 由微软开发，它是 JavaScript 的超集，这意味着所有有效的 JavaScript 代码也是有效的 TypeScript 代码。TypeScript 添加了静态类型检查，这可以帮助开发者在编译时而不是运行时捕获错误。\n\n使用 TypeScript 的主要优势包括：更好的开发工具支持（如自动完成和重构工具）、更易于维护的代码，以及更好的团队协作。对于大型项目或团队协作，TypeScript 可以显著提高开发效率和代码质量。"
            },
            {
                "title": "使用 Tailwind CSS 快速构建美观的用户界面",
                "content": "Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的工具类，使你可以快速构建自定义用户界面，而无需编写自定义 CSS。本文将介绍 Tailwind CSS 的基本用法和优势...\n\nTailwind CSS 与传统的 CSS 框架（如 Bootstrap）不同，它不提供预设的组件，而是提供了大量的原子类，你可以直接在 HTML 中使用这些类来构建界面。这种方法使得你可以更加灵活地设计界面，而不必受到框架预设组件的限制。\n\n使用 Tailwind CSS 的主要优势包括：更快的开发速度、更小的 CSS 文件大小（因为你只包含你使用的类）、以及更一致的设计系统。对于需要快速构建原型或自定义界面的项目，Tailwind CSS 是一个非常好的选择。"
            }
        ]
        
        for post_data in mock_posts:
            post = Post(title=post_data["title"], content=post_data["content"])
            db.session.add(post)
        
        db.session.commit()

@app.route('/')
def home():
    return "Flask Blog API is running!"

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return {'posts': [{
        'id': p.id, 
        'title': p.title, 
        'content': p.content,
        'created_at': p.created_at.isoformat() if p.created_at else None
    } for p in posts]}

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return {
        'id': post.id, 
        'title': post.title, 
        'content': post.content,
        'created_at': post.created_at.isoformat() if post.created_at else None
    }

if __name__ == '__main__':
    # 使用指定端口
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)