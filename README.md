# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, আগের দিনের তুলনায় পরিবর্তন এবং বিভিন্ন বাজারের দামের তুলনা এক জায়গায়।

🔗 **Live:** https://bazar-dor-nine.vercel.app
📦 **GitHub:** https://github.com/eng-sohid/Bazar-dor

## ✨ Features

1. **Live Price Ticker**: নেভবারের নিচে infinite scrolling marquee, যেখানে পণ্যের emoji, নাম, দাম ও ▲/▼ শতাংশ দেখায়।
2. **আজ দাম বেড়েছে / কমেছে**: সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য আলাদা সেকশনে।
3. **Category পেজ ও সাজান**: ক্যাটাগরি অনুযায়ী পণ্য, দাম অনুযায়ী sort (বাংলা সংখ্যা সঠিকভাবে সংখ্যা হিসেবে ধরা হয়), loading skeleton ও empty/404 state।
4. **পণ্যের বিস্তারিত পেজ**: সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং ১২টি বাজারের বাজারভিত্তিক দামের টেবিল (protected route)।
5. **Authentication**: BetterAuth দিয়ে email/password sign in ও sign up, toast notification, protected route redirect।
6. **প্রোফাইল ও নাম আপডেট**: logged-in ইউজার নিজের প্রোফাইল দেখতে ও নাম বদলাতে পারে।
7. **সম্পূর্ণ responsive**: মোবাইল, ট্যাবলেট ও ডেস্কটপে কাজ করে।

## 🛠️ Technologies

| প্রযুক্তি                 | ব্যবহার              |
| ------------------------- | -------------------- |
| Next.js 16 (App Router)   | UI ও routing         |
| TypeScript                | type safety          |
| Tailwind CSS v4 + DaisyUI | styling ও components |
| BetterAuth                | authentication       |
| MongoDB Atlas             | ইউজার ডেটাবেস        |
| react-hot-toast           | toast notification   |
| Vercel                    | deployment           |

## 🚀 Run locally

```bash
git clone https://github.com/eng-sohid/Bazar-dor.git
cd Bazar-dor
npm install
cp .env.example .env.local   # মানগুলো বসান
npm run dev
```

## 🔐 Environment variables

`.env.example` দেখুন:

```env
MONGODB_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📡 API

ডেটা আসে `https://api.api-store.workers.dev/api/bazardor` থেকে (fallback: `api.abcz.workers.dev`)।
