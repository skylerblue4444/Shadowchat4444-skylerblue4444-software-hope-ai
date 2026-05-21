# ShadowChat v70 API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```
**Response:** `{ token, message }`

### Login User
**POST** `/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
**Response:** `{ token, message }`

---

## 👥 Social Network Endpoints

### Get Feed
**GET** `/social/feed?page=1&limit=20`
**Response:** `{ posts, total, page, pages }`

### Create Post
**POST** `/social/posts`
```json
{
  "content": "Hello world!",
  "mediaUrls": [],
  "tags": ["hello"],
  "visibility": "public"
}
```

### Get Post
**GET** `/social/posts/:id`

### Update Post
**PUT** `/social/posts/:id`
```json
{
  "content": "Updated content",
  "tags": ["updated"],
  "visibility": "friends"
}
```

### Delete Post
**DELETE** `/social/posts/:id`

### Like Post
**POST** `/social/posts/:id/like`

### Get Comments
**GET** `/social/posts/:postId/comments`

### Add Comment
**POST** `/social/posts/:postId/comments`
```json
{
  "content": "Great post!",
  "parentComment": null
}
```

### Delete Comment
**DELETE** `/social/comments/:id`

### Get Profile
**GET** `/social/profile/:userId`

### Get My Profile
**GET** `/social/profile/me`

### Update Profile
**PUT** `/social/profile`
```json
{
  "displayName": "John Doe",
  "bio": "Software developer",
  "avatarUrl": "https://...",
  "location": "San Francisco",
  "website": "https://johndoe.com",
  "isPrivate": false
}
```

### Follow User
**POST** `/social/profile/:userId/follow`

### Search Users
**GET** `/social/users/search?q=john`

---

## 💰 Crypto Trading Endpoints

### Get Market Data
**GET** `/crypto/market`
**Response:** `{ marketData, timestamp }`

### Place Order
**POST** `/crypto/order`
```json
{
  "pair": "BTC/USD",
  "side": "buy",
  "orderType": "market",
  "amount": 0.5,
  "price": 65432.10
}
```

### Cancel Order
**DELETE** `/crypto/order/:tradeId`

### Get Trade History
**GET** `/crypto/history?page=1&limit=50`

### Get Wallet
**GET** `/crypto/wallet`

### Deposit Funds
**POST** `/crypto/wallet/deposit`
```json
{
  "amount": 1000,
  "currency": "USD"
}
```

---

## 🛍️ Marketplace Endpoints

### List Products
**GET** `/marketplace/listings?category=digital&q=software&page=1&limit=20&sort=newest`

### Create Listing
**POST** `/marketplace/listings`
```json
{
  "title": "Digital Product",
  "description": "High-quality digital product",
  "price": 29.99,
  "category": "software",
  "tags": ["digital", "software"],
  "imageUrls": [],
  "stock": -1
}
```

### Update Listing
**PUT** `/marketplace/listings/:listingId`

### Purchase Product
**POST** `/marketplace/purchase`
```json
{
  "listingId": "...",
  "quantity": 1,
  "deliveryAddress": "123 Main St"
}
```

### Confirm Purchase
**POST** `/marketplace/purchase/confirm`
```json
{
  "orderId": "...",
  "paymentIntentId": "..."
}
```

### Get My Orders
**GET** `/marketplace/orders?page=1&limit=20`

### Get My Sales
**GET** `/marketplace/sales?page=1&limit=20`

### Update Order Status
**PUT** `/marketplace/orders/:orderId/status`
```json
{
  "status": "shipped"
}
```

---

## 💬 Chat Endpoints

### Get Conversations
**GET** `/chat/conversations`

### Get Messages
**GET** `/chat/conversations/:conversationId?page=1&limit=50`

### Delete Message
**DELETE** `/chat/messages/:messageId`

### Search Messages
**GET** `/chat/search?q=hello&conversationId=...`

---

## 🔔 Notifications Endpoints

### Get Notifications
**GET** `/notifications?page=1&limit=20`

### Mark as Read
**PUT** `/notifications/:notificationId/read`

### Mark All as Read
**PUT** `/notifications/read-all`

### Delete Notification
**DELETE** `/notifications/:notificationId`

---

## 🤖 AI Engine Endpoints

### Moderate Content
**POST** `/ai/moderate`
```json
{
  "text": "Content to moderate"
}
```

### Analyze Sentiment
**POST** `/ai/sentiment`
```json
{
  "text": "I love this product!"
}
```

---

## 💳 Stripe Endpoints

### Create Checkout Session
**POST** `/stripe/checkout`
```json
{
  "productId": "...",
  "quantity": 1
}
```

### Handle Webhook
**POST** `/stripe/webhook`

---

## 🛡️ Admin Endpoints (Admin Only)

### Get Dashboard
**GET** `/admin/dashboard`

### Get Users
**GET** `/admin/users?page=1&limit=20`

### Suspend User
**POST** `/admin/users/:userId/suspend`

### Unsuspend User
**POST** `/admin/users/:userId/unsuspend`

### Get Reports
**GET** `/admin/reports?page=1&limit=20`

### Remove Post
**DELETE** `/admin/posts/:postId`

---

## WebSocket Events

### Connect
```javascript
const socket = io('http://localhost:3000', {
  auth: { token: 'your_token' }
});
```

### Send Message
```javascript
socket.emit('send_message', {
  receiverId: 'user_id',
  content: 'Hello!',
  mediaUrl: '',
  messageType: 'text'
});
```

### Receive Message
```javascript
socket.on('receive_message', (message) => {
  console.log('New message:', message);
});
```

---

## Error Responses

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
