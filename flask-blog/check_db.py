from app import app, db, Post
import os

print("Database URL:", app.config['SQLALCHEMY_DATABASE_URI'])
print("Environment DATABASE_URL:", os.getenv('DATABASE_URL'))

# 使用应用程序上下文
with app.app_context():
    # 获取所有表信息
    print("\n--- 数据库表信息 ---")
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    for table_name in inspector.get_table_names():
        print(f"表名: {table_name}")
        for column in inspector.get_columns(table_name):
            print(f"  - {column['name']}: {column['type']}")

    # 获取Post表的所有数据
    print("\n--- Post表内容 ---")
    posts = Post.query.all()
    for post in posts:
        print(f"ID: {post.id}")
        print(f"标题: {post.title}")
        print(f"创建时间: {post.created_at}")
        print(f"内容预览: {post.content[:50]}...")
        print("-" * 40)
