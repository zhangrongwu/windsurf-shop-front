# Zhitrend Windsurf Shop

A modern e-commerce platform built with React and Cloudflare, featuring a clean design and seamless shopping experience.

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
