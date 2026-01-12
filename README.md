# Codemon

Codemon is a high-performance, reactive SaaS platform for developers to write, execute, and share code snippets. Built with a focus on speed, security, and a premium developer experience.

## ✨ Key Features
- **Monaco Editor Integration:** A VS Code-like editing experience in the browser.
- **Multi-Language Support:** Execute code in 5+ languages via the Piston API.
- **Real-time Persistence:** Instant data syncing using Convex (Reactive Backend).
- **Secure Authentication:** User management via Clerk.
- **Sleek UI:** Built with Tailwind CSS v4 and Framer Motion for a fluid experience.
- **State Management:** Persistent editor settings using Zustand.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database/Backend:** Convex
- **Auth:** Clerk
- **Styling:** Tailwind CSS v4 + Lucide Icons
- **Animation:** Motion (Framer Motion)
- **Editor:** @monaco-editor/react


## 🚀 Getting Started
1. **Clone the repo:**
   ```bash
   git clone https://github.com/Manish8801/codemon.git
   ```

2. **Install dependencies::**
```bash
pnpm install
```

3. **Environment Variables: Create a .env file in the root directory and add your Upstash credentials:**
```bash
CLERK_JWT_ISSUER_DOMAIN=""
CLERK_SECRET_KEY=""
CLERK_WEBHOOK_SECRET=""
CONVEX_DEPLOYMENT=""
LEMON_SQUEEZY_WEBHOOK_SECRET=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=""
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=""
NEXT_PUBLIC_CONVEX_URL=""
```

4. **Run the development server:**
```bash
pnpm run dev
```
5. **Open http://localhost:3000 in your browser:**


## Screenshots
![Homepage](./public/screenshots/Screenshot%202026-01-12%20202056.png)

![SnippetPage](./public/screenshots/Screenshot%2026-01-12%202210.png)

![Profile](./public/screenshots/Screenshot%202026-01-07%20103607.png)

![PricingPage](./public/screenshots/Screenshot%202026-01-07%20103825.png)
