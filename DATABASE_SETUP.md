# 数据库集成说明

## 已完成的功能

1. ✅ Prisma ORM 配置
2. ✅ 数据库模型定义（用户和文章）
3. ✅ 登录和注册 API 路由
4. ✅ 前端页面修改，接入数据库验证
5. ✅ 数据库初始化脚本

## 使用步骤

### 1. 确保数据库连接正确

当前使用的数据库连接配置在 `.env` 文件中：
```
DATABASE_URL="mysql://root:tJF3Sx75NYcpa3ya@127.0.0.1:13306/blog"
```

如果使用您之前提到的数据库，请修改为：
```
DATABASE_URL="mysql://root:YH2RS46awfxtMeSb@49.235.142.138:3306/blog"
```

### 2. 确保数据库已创建

在 MySQL 中执行：
```sql
CREATE DATABASE IF NOT EXISTS blog;
```

### 3. 安装依赖（如果还没安装）

```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 4. 初始化 Prisma 和推送数据库结构

```bash
npx prisma init
npx prisma db push
```

### 5. 生成 Prisma 客户端

```bash
npx prisma generate
```

### 6. 初始化数据库（创建管理员账号）

```bash
npx ts-node scripts/init-db.ts
```

这将创建管理员账号：
- 用户名：yinwenhao
- 密码：20030822yin

### 7. 启动开发服务器

```bash
npm run dev
```

## 功能说明

### 登录
- 使用正确的用户名和密码登录
- 登录成功后，用户信息会保存在 localStorage 中
- 登录失败会显示错误提示

### 注册
- 用户名：4-20位，只能包含字母、数字或下划线
- 密码：至少8位，必须包含字母和数字
- 必须输入正确的验证码
- 注册成功后会跳转到登录页面

### 权限控制
- 普通用户（role: 'user'）：可以浏览文章、点赞
- 管理员用户（role: 'admin'）：除了普通用户权限外，还可以发布文章

## 注意事项

1. **密码安全**：当前密码是明文存储，生产环境建议使用 bcrypt 等库加密
2. **环境变量**：确保 `.env` 文件已添加到 `.gitignore`
3. **错误处理**：API 路由已添加基本的错误处理
