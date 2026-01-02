# Next.js App – Local Setup Guide 🚀

This project is built using **Next.js** and integrates:
- PostgreSQL Database
- Clerk Authentication
- OpenRouter AI API

---

## 📦 Prerequisites

- Node.js v18+
- npm / pnpm / yarn
- PostgreSQL database (Neon recommended)

---

## 📥 Installation

```bash
npm install
```

Or:

```bash
pnpm install
```

---

## 🔐 Environment Variables Setup

Create a `.env` file in the project root:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

OPENROUTER_API_KEY=
```

---

## 🔑 API Keys – Step by Step

### DATABASE_URL (Neon)

1. Visit https://neon.tech
2. Create a project
3. Copy the Postgres connection string
4. Paste into `.env`

---

### Clerk Auth Keys

1. Visit https://dashboard.clerk.com
2. Create an application
3. Copy Publishable & Secret keys
4. Paste into `.env`

---

### OpenRouter API Key

1. Visit https://openrouter.ai
2. Create an API key
3. Paste into `.env`

---

## ▶️ Run Locally

```bash
npm run dev
```

Open http://localhost:3000

---

## 🏗️ Production Build

```bash
npm run build
npm run start
```

---

## 🔒 Security

- Never commit `.env`
- Restart server after env changes
