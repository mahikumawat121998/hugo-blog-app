+++
title = "Authentication with Next.js and Prisma"
date = 2025-03-13
categories = ["Web Development", "JavaScript", "Authentication"]
tags = ["Next.js", "Prisma", "Auth", "JWT", "Backend", "Web Dev"]
draft = false
description = "Learn how to implement secure and scalable authentication in a Next.js application using Prisma ORM."
image = "https://blog.lama.dev/images/next-auth-prisma-adapter.png"
imageBig = "https://blog.lama.dev/images/next-auth-prisma-adapter.png"
authors = ["MK Kumawat"]
avatar = "/images/favicon.png"
+++

> ## Authentication with Next.js and Prisma: A Complete Guide

Modern web applications need robust authentication systems. In this blog post, we’ll dive into how to build authentication in a **Next.js app using Prisma ORM**. We’ll cover signup, login, JWT-based sessions, and protecting API routes — all with a clean architecture.

### Why Next.js + Prisma?

- 🔥 **Next.js** provides powerful API routes and full-stack flexibility.
- 🧠 **Prisma** simplifies database access with a modern ORM and type safety.
- 🔐 Together, they form a solid stack for secure and scalable apps.



## 🛠 Prerequisites

- Node.js and npm
- Basic knowledge of Next.js and React
- PostgreSQL (or any supported DB)



## Project Setup

```bash
npx create-next-app auth-prisma-app
cd auth-prisma-app
npm install prisma @prisma/client bcryptjs jsonwebtoken
npx prisma init 
 
## 🗃 Define Your Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

Then run:

```bash
npx prisma migrate dev --name init
```

## Hash Passwords with Bcrypt

Create `lib/hash.js`:

```js
import bcrypt from 'bcryptjs';

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (input, stored) => bcrypt.compareSync(input, stored);
```
## 🔐 JWT Auth Utilities

Create `lib/jwt.js`:

```js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user) => jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });

export const verifyToken = (token) => jwt.verify(token, SECRET);
```

`pages/api/auth/signup.js`:

```js
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/hash';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashed = hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });

    res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
```
## 🔑 Login API Route

`pages/api/auth/login.js`:

```js
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '@/lib/hash';
import { generateToken } from '@/lib/jwt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
```

## 🔐 Protecting Routes

`pages/api/protected.js`:

```js
import { verifyToken } from '@/lib/jwt';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const user = verifyToken(token);
    res.status(200).json({ message: 'Protected content', user });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
```
## ✅ Frontend Example: Login Form

```jsx
// pages/login.js
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login Successful');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```
## 📦 Conclusion

Using **Next.js with Prisma ORM** gives you full control over your authentication system. You can scale it easily, integrate social auth providers, or build role-based access control later.

> 💡 Pro Tip: Explore libraries like **NextAuth.js** if you want a more plug-and-play solution for auth flows.
