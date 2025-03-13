import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 验证请求数据
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '请提供所有必填字段' },
        { status: 400 }
      );
    }

    // 创建一个测试账号
    // 注意：在生产环境中，您应该使用真实的SMTP凭据
    const testAccount = await nodemailer.createTestAccount();

    // 创建一个可重用的transporter对象，使用默认的SMTP传输
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true用于465端口，false用于其他端口
      auth: {
        user: testAccount.user, // 生成的Ethereal用户
        pass: testAccount.pass, // 生成的Ethereal密码
      },
    });

    // 设置邮件选项
    const mailOptions = {
      from: `"博客联系表单" <${email}>`,
      to: 'jaxsonwy123@gmail.com', // 您的邮箱地址
      subject: `来自博客的新消息: ${name}`,
      text: message,
      html: `
        <div>
          <h2>新的联系表单提交</h2>
          <p><strong>名称:</strong> ${name}</p>
          <p><strong>邮箱:</strong> ${email}</p>
          <p><strong>消息:</strong></p>
          <p>${message}</p>
        </div>
      `,
    };

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);

    console.log('邮件已发送: %s', info.messageId);
    // 预览URL仅在使用Ethereal时可用
    console.log('预览URL: %s', nodemailer.getTestMessageUrl(info));

    return NextResponse.json(
      { 
        success: true, 
        message: '消息已成功发送',
        // 在开发环境中返回预览URL，以便测试
        previewUrl: nodemailer.getTestMessageUrl(info)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('发送邮件时出错:', error);
    return NextResponse.json(
      { error: '发送消息时出错' },
      { status: 500 }
    );
  }
}
