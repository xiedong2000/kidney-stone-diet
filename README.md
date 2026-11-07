# StoneWise

A plain-language diet guide for adults with kidney stones. It explains what is usually fine to eat, what to keep uncommon, and which habits matter for each stone type.

This is education, not a personal medical plan. Stone type, urine tests, medicines, and kidney function change the advice.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Node.js 20.9 or newer is required.

## Check the food rules

```bash
npm run check
```

That runs the expectations behind the food checker, such as spinach for a calcium oxalate stone versus a uric acid stone.

## Deploy on Vercel

The app is a standard Next.js project. Vercel detects it with no extra config and no environment variables.

1. Push this folder to a Git host.
2. In Vercel, choose **Add New… → Project** and import that repository.
3. Leave the framework preset on Next.js. Build command: `npm run build`. Output is handled by Vercel.
4. Deploy. The food checker runs in the browser, so there is no database to attach.

After you have a domain, add it in the Vercel project settings.

## Where the words live

- Food list: `lib/foods.ts`
- How a label is chosen: `lib/guidance.ts`
- Habits, stone types, sample days, and sources: `lib/learn.ts`
