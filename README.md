# Zhitrend Windsurf Shop

一个现代化的冲浪运动装备电商平台，使用 React、TypeScript 和 Tailwind CSS 构建。

## 项目架构

### 前端架构

```
src/
├── components/          # 可重用组件
│   ├── Form/           # 表单相关组件
│   │   ├── FormField.tsx
│   │   ├── FormSelect.tsx
│   │   └── FormTextArea.tsx
│   ├── Cart.tsx        # 购物车组件
│   ├── Checkout.tsx    # 结账组件
│   ├── ErrorAlert.tsx  # 错误提示组件
│   ├── LoadingSpinner.tsx  # 加载动画组件
│   ├── Navbar.tsx      # 导航栏组件
│   └── Toast.tsx       # 通知提示组件
│
├── contexts/           # React Context
│   ├── AuthContext.tsx    # 认证上下文
│   ├── CartContext.tsx    # 购物车上下文
│   ├── ErrorContext.tsx   # 错误处理上下文
│   └── NotificationContext.tsx  # 通知上下文
│
├── hooks/              # 自定义 Hooks
│   ├── useAuth.ts      # 认证相关 hook
│   ├── useCart.ts      # 购物车相关 hook
│   ├── useError.ts     # 错误处理 hook
│   ├── useForm.ts      # 表单处理 hook
│   └── useLoading.ts   # 加载状态 hook
│
├── pages/              # 页面组件
│   ├── admin/          # 管理后台页面
│   │   ├── Dashboard.tsx
│   │   ├── Orders.tsx
│   │   └── Products.tsx
│   ├── Home.tsx       # 首页
│   ├── Products.tsx   # 商品列表页
│   ├── ProductDetail.tsx  # 商品详情页
│   ├── Cart.tsx       # 购物车页面
│   └── Orders.tsx     # 订单页面
│
├── utils/             # 工具函数
│   ├── api.ts        # API 请求工具
│   ├── errorHandling.ts  # 错误处理工具
│   └── validation.ts  # 数据验证工具
│
└── types/            # TypeScript 类型定义
    ├── api.ts       # API 相关类型
    ├── auth.ts      # 认证相关类型
    └── product.ts   # 商品相关类型
```

### 后端架构 (API)

```
src/
├── controllers/      # 控制器
│   ├── auth.ts      # 认证控制器
│   ├── order.ts     # 订单控制器
│   └── product.ts   # 商品控制器
│
├── middleware/       # 中间件
│   ├── auth.ts      # 认证中间件
│   ├── error.ts     # 错误处理中间件
│   └── validation.ts # 数据验证中间件
│
├── models/          # 数据模型
│   ├── order.ts    # 订单模型
│   ├── product.ts  # 商品模型
│   └── user.ts     # 用户模型
│
├── routes/         # 路由
│   ├── auth.ts    # 认证路由
│   ├── order.ts   # 订单路由
│   └── product.ts # 商品路由
│
└── utils/         # 工具函数
    ├── jwt.ts    # JWT 工具
    └── payment.ts # 支付工具
```

## 技术栈

### 前端
- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- @heroicons/react
- PayPal SDK
- Zod（数据验证）

### 后端
- Node.js
- TypeScript
- Prisma（ORM）
- JWT（认证）
- PayPal API
- Cloudflare Workers

## 主要功能

### 用户功能
- 用户注册和登录
- 商品浏览和搜索
- 购物车管理
- 订单管理
- PayPal 支付

### 管理员功能
- 商品管理
- 订单管理
- 用户管理
- 数据统计

## 开发指南

### 环境要求
- Node.js >= 16
- npm >= 7

### 安装依赖
```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd windsurf-shop-api
npm install
```

### 开发环境
```bash
# 启动前端开发服务器
npm start

# 启动后端开发服务器
cd windsurf-shop-api
npm run dev
```

### 生产环境
```bash
# 构建前端
npm run build

# 构建后端
cd windsurf-shop-api
npm run build
```

## 项目规范

### 代码风格
- 使用 ESLint 和 Prettier
- 遵循 TypeScript 严格模式
- 使用函数组件和 Hooks
- 使用 CSS Modules 或 Tailwind CSS

### Git 提交规范
- feat: 新功能
- fix: 修复问题
- docs: 文档变更
- style: 代码格式
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

## 错误处理

项目实现了统一的错误处理机制：
1. API 错误处理
2. 表单验证错误
3. 认证错误
4. 网络错误
5. 支付错误

## 状态管理

使用 React Context 和自定义 Hooks 管理状态：
1. 认证状态
2. 购物车状态
3. 错误状态
4. 加载状态
5. 表单状态

## 安全性

1. JWT 认证
2. CORS 配置
3. 输入验证
4. XSS 防护
5. CSRF 防护

## 性能优化

1. 代码分割
2. 懒加载
3. 图片优化
4. 缓存策略
5. API 性能优化

## 部署

项目使用 Cloudflare Workers 进行部署：
1. 前端部署到 Cloudflare Pages
2. 后端部署到 Cloudflare Workers
3. 数据库使用 Prisma + PlanetScale

## Features

- Responsive modern design
- Product catalog with categories
- Shopping cart functionality
- Secure checkout process
- User authentication
- Order tracking
- Product search and filtering
- Wishlist functionality
- Password reset functionality
  - Forgot password
  - Email reset link
  - Password modification

## Tech Stack

- React 18
- Tailwind CSS
- Headless UI
- Stripe Payment Integration
- Cloudflare for hosting and CDN

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Building for Production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_API_URL=your_api_url
DATABASE_URL="postgresql://username:password@localhost:5432/windsurf_shop"
JWT_SECRET="your-jwt-secret"
FRONTEND_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
RESEND_API_KEY="your-resend-api-key"
```

## Password Reset Functionality

1. Forgot password process:
   - User clicks "Forgot password" on the login page
   - Enter email address
   - System sends reset link to email
   - User sets new password through the link

2. Modify password:
   - Logged-in user can modify password on the profile page
   - Need to enter current password for verification
   - New password needs to be confirmed by entering twice

## Features

### User Features

1. **Authentication**
   - Email/Password registration and login
   - Social login (Google, Facebook)
   - Password reset functionality
   - Session management

2. **Product Management**
   - Browse products by categories
   - Advanced search and filtering
   - Product reviews and ratings
   - Product recommendations
   - Wishlist management

3. **Shopping Cart**
   - Real-time cart updates
   - Save for later functionality
   - Quantity management
   - Price calculations
   - Coupon application

4. **Checkout Process**
   - Multiple payment methods
   - Address management
   - Order summary
   - Shipping options
   - Order confirmation

5. **Order Management**
   - Order history
   - Order tracking
   - Order cancellation
   - Returns management
   - Invoice generation

### Admin Features

1. **Dashboard**
   - Sales analytics
   - User statistics
   - Inventory overview
   - Recent orders
   - Revenue reports

2. **Product Management**
   - Add/Edit products
   - Manage categories
   - Inventory tracking
   - Price management
   - Product images

3. **Order Management**
   - Order processing
   - Status updates
   - Refund handling
   - Shipping management
   - Order analytics

4. **User Management**
   - User roles and permissions
   - Customer support
   - User activity logs
   - Account management
   - Communication tools

## API Documentation

### Authentication Endpoints

```typescript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Product Endpoints

```typescript
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/products/categories
GET    /api/products/search
```

### Order Endpoints

```typescript
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
GET    /api/orders/user/:userId
POST   /api/orders/:id/status
```

### User Endpoints

```typescript
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/orders
GET    /api/users/:id/wishlist
```

## Development Workflow

### 1. Setting Up Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/windsurf-shop.git
cd windsurf-shop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### 2. Database Setup

```bash
# Initialize Prisma
npx prisma init

# Apply migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed
```

### 3. Running Tests

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

### 4. Code Quality Checks

```bash
# Run linter
npm run lint

# Run type checking
npm run type-check

# Run all checks
npm run check-all
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing Strategy

### Unit Testing
- Components testing with React Testing Library
- Hook testing with @testing-library/react-hooks
- API function testing with Jest
- Utility function testing

### Integration Testing
- API endpoint testing
- Database operations testing
- Authentication flow testing
- Form submission testing

### E2E Testing
- User flows testing with Cypress
- Payment process testing
- Admin dashboard testing
- Critical path testing

## Monitoring and Analytics

### Application Monitoring
- Error tracking with Sentry
- Performance monitoring with New Relic
- User behavior analytics with Mixpanel
- Server monitoring with Datadog

### Business Analytics
- Sales analytics
- User engagement metrics
- Conversion tracking
- Inventory analytics
- Marketing performance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/yourusername/windsurf-shop](https://github.com/yourusername/windsurf-shop)

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
