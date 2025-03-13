from app import app, db, Post

# 在应用程序上下文中执行
with app.app_context():
    # 查找ID为1的记录
    post = Post.query.get(1)
    
    if post:
        print(f"找到记录: ID={post.id}, 标题='{post.title}'")
        
        # 删除记录
        db.session.delete(post)
        db.session.commit()
        
        print("记录已成功删除!")
    else:
        print("未找到ID为1的记录。")
