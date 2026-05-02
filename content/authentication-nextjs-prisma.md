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
avatar = "/images/mk1.png"
+++
 

# Authentication with Next.js and Prisma — Complete Guide

## Introduction

Authentication is the backbone of any modern web application. Whether you're building a SaaS platform, a multi-tenant system, or a simple dashboard, securing user access is non-negotiable.

In this guide, we’ll build a **robust authentication system using Next.js and Prisma**, covering:

* User signup & login
* Password hashing
* JWT-based authentication
* Protected routes
* Database integration



## 🏗️ Tech Stack

* **Frontend & Backend:** Next.js (App Router)
* **Database ORM:** Prisma
* **Database:** PostgreSQL
* **Auth Strategy:** JWT (JSON Web Tokens)
* **Hashing:** bcrypt



## 📦 Step 1: Setup Next.js Project

```bash
npx create-next-app@latest auth-app
cd auth-app
npm install prisma @prisma/client bcrypt jsonwebtoken
npx prisma init
```

---

## 🗄️ Step 2: Define Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

Run migration:

```bash
npx prisma migrate dev --name init
```

---

## 🔐 Step 3: Signup API

Create: `app/api/auth/signup/route.js`

```javascript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return Response.json({ user });
}
```

---

## 🔑 Step 4: Login API

```javascript
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return Response.json({ error: "User not found" },
     { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return Response.json({ error: "Invalid password" }, 
    { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return Response.json({ token });
}
```

---

## 🧩 Step 5: Middleware for Protected Routes

Create `middleware.js`:

```javascript
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" },
    { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, 
    { status: 401 });
  }
}
```

---

## 🔒 Step 6: Protect Routes

```javascript
// Example protected API
export async function GET(req) {
  return Response.json({ message: "Protected data" });
}
```

---

## 🍪 Alternative: Use Cookies Instead of Headers

Instead of sending JWT in headers, you can:

* Store token in **HTTP-only cookies**
* Improve security against XSS attacks



## ⚠️ Common Mistakes

❌ Storing plain passwords
❌ Not using environment variables
❌ Missing token expiration
❌ No input validation



## 🔥 Advanced Improvements

* Use **Refresh Tokens**
* Add **Role-Based Access Control (RBAC)**
* Implement **Multi-Tenant Authentication**
* Add OAuth (Google, GitHub)
* Use **NextAuth.js** for production-ready auth



## 🧠 Architecture Tip (Important for You)

Since you're working on **microservices + multi-tenant systems**, consider:

* Central Auth Service
* Token-based communication between services
* Prisma per-tenant DB (as you're already planning)



## 📌 Conclusion

Using Next.js with Prisma gives you:

* Full control over authentication
* Strong type safety
* Scalable architecture

This setup is perfect for **real-world SaaS applications** and can scale with your system.

