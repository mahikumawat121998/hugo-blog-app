+++
title = 'Next.js 14 Auth with Iron Session and Server Actions'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "Next.js app router cookie based authentication with iron session and new server actions"
image = "https://blog.lama.dev/images/next-auth-iron-session-server-action.png"
imageBig = "https://blog.lama.dev/images/next-auth-iron-session-server-action.png"
categories = ["general", "css", "js"]
authors = ["Jane Doe"]
avatar = "/images/avatar.webp"
+++


Authentication and authorization are crucial for any app to stay secure and work properly. Even the slightest oversight can lead to significant problems.

When it comes to Next.js, Auth.js is a popular choice for handling authentication. However, its documentation is overly complex, often leaving developers puzzled. It’s maintained by a small team, struggles with the challenges of upkeep and maintenance. They haven’t yet migrated the old next-auth library to auth.js and the compatible version with the new Next.js features is still in beta.

If you’re hesitant to use complex third-party libraries like Auth.js or paid authentication services like Clerk, let’s explore a simpler approach to user authentication using the ‘iron-session’ library.

This library simplifies the process by creating signed and encrypted cookies, facilitating the easy management of user sessions. With server-side encryption and decryption, it prioritizes security and data integrity.

Let’s see how to use it to manage sessions, leveraging the latest features like the App router, React server components, and server actions. If you want to watch the full tutorial (more detailed version of this post), please check out my youtube video.

Firstly, we need to install the library.

> npm install iron-session

Before diving into component creation, let’s handle the session options and server actions. We’ll require three key actions to effectively manage sessions: a login action to create a signed session, a logout action to terminate the session, and a getSession action to retrieve the user session for validation purposes.

Let’s create a file called lib.ts and define the session data type and cookie options.
```css
import {SessionOptions} from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  img?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
// You need to create a secret key at least 32 characters long.
  password: process.env.SESSION_SECRET!,
  cookieName: "lama-session",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  },
};
```
I preferred to use user id, username and user image for the user data, but feel free to store any additional information you deem necessary. Upon user login, we’ll retrieve the user details from the database and store them within the session.

Then I created the session options. This will encrypt the session with the given secret key.

You can generate a secret key using this code on your terminal.

> openssl rand -base64 32

After that we are ready to create out first action. Create a file called actions.ts and add the following code.
```css
 "use server"

import { SessionData } from "@/lib";
import { defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
```
We created SessionData, defaultSession and sessionOptions in the previous step. We also need Next.js cookies to get the session from the user, getIronSession function to decrypt it with the provided cookie and session options, and redirect function to redirect user to the homepage after the login/logout process.

Let’s add the login action.

```css
"use server"

import { SessionData } from "@/lib";
import { defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADD THE LOGIN ACTION
export async function login(
  formData: FormData
) {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // CHECK USER IN DB USING THE USERNAME AND PASSWORD
  // it depends on your database (mongoose,prisma,drizzle etc.)
  // for the testing purpose, I assigned a dummy user
  const user = {
    id:1,
    username:formUsername,
    img:"avatar.png"
  }

  // IF CREDENTIALS ARE WRONG RETURN AN ERROR
  if(!user){
    return { error: "Wrong Credentials!" }
  }

  // You can pass any information you want
  session.isLoggedIn = true;
  session.id = user.id;
  session.username = user.username;

  await session.save();
  redirect("/")
}
```
In the example provided, we retrieve the username and password from the client form and search for the user based on the given credentials. If the user does not exist in the database or the credentials are incorrect, we return an error (which will be displayed to the user using the useFormState hook). If no error occurs, we pass the relevant information to the session and save it using the save() method. This encrypts the session and sends it to the user’s cookie. Finally, you can redirect the user to the homepage.

Now, we can create a getSession action to decrypt the user cookie and access the user information.

```css
"use server"

import { SessionData } from "@/lib";
import { defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADD THE GETSESSION ACTION
export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // If user visits for the first time session returns an empty object.
  // Let's add the isLoggedIn property to this object and its value will be the default value which is false
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}
```
```css
export async function login(
  formData: FormData
) {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = {
    id:1,
    username:formUsername,
    img:"avatar.png"
  }

  if(!user){
    return { error: "Wrong Credentials!" }
  }

  session.isLoggedIn = true;
  session.id = user.id;
  session.username = user.username;

  await session.save();
  redirect("/")
}
```
Let’s test it by creating a form. Create a login page and a form component

```css
import { getSession } from "@/actions";
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
```
```css
"use client";
import { login } from "@/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  return (
    <form action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error}
    </form>
  );
}
```

On the login page, we’ll first fetch the session using the getSession function. If we’re already logged in, we’ll be redirected to the homepage using the redirect function. However, since we don’t have a session yet, we’ll remain on this page.

In the form action, you can dispatch the login action directly. However, as I mentioned, if there is an error, we’ll display it to the user using the useFormState hook. Initially, the error state is undefined. If an error occurs, we update the state within the login function. To achieve this, let’s return to the login function and add one more parameter.

```css
export async function login(
  // THIS IS THE PARAMETER THAT WE NEED TO ADD
  prevState: { error: undefined | string },
  formData: FormData
) {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = {
    id:1,
    username:formUsername,
    img:"avatar.png"
  }

  if(!user){
    // IF THERE IS AN ERROR THE STATE WILL BE UPDATED
    return { error: "Wrong Credentials!" }
  }

  session.isLoggedIn = true;
  session.id = user.id;
  session.username = user.username;

  await session.save();
  redirect("/")
}
```
Currently, clicking the submit button logs you in and redirects you to the homepage. Right now, you cannot see the login page, because we are now logged in, and it’ll redirect us to the homepage automatically.

To test the error message, you can define a null user in the login action.

Now, let’s proceed to the actions.ts file and create a logout function. Within this function, we’ll execute the process to destroy the session.

```css
"use server"

import { SessionData } from "@/lib";
import { defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADD THE LOGOUT FUNCTION
export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/")
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}
```

```css
export async function login(
  formData: FormData
) {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = {
    id:1,
    username:formUsername,
    img:"avatar.png"
  }

  if(!user){
    return { error: "Wrong Credentials!" }
  }

  session.isLoggedIn = true;
  session.id = user.id;
  session.username = user.username;

  await session.save();
  redirect("/")
}
To test this action, let’s create a logout form.

import { logout } from "@/actions";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button>Logout</button>
    </form>
  );
}
```
And that wraps it up! This method provides a straightforward approach to creating and managing secure authentication cookies. If you’re interested in delving deeper into managing authorization, creating protected pages, and updating user sessions, be sure to check out my YouTube video for a comprehensive guide.