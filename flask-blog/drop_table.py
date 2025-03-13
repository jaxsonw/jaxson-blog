from app import app, db, Post

# 在应用程序上下文中执行
with app.app_context():
    # 确认要删除的表
    print("即将删除的表: post")
    
    # 询问用户确认
    confirm = input("确定要删除post表吗? 所有数据将丢失! (y/n): ")
    
    if confirm.lower() == 'y':
        # 删除表
        Post.__table__.drop(db.engine)
        print("表 'post' 已成功删除!")
    else:
        print("操作已取消，表未删除。")
