# v0-40th-birthday-landing-page

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_uGzmVoaFaFI1CGfYWl8cHP64m7zm)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Signup Form (Google Apps Script Webhook)

The landing form in [`app/actions.ts`](app/actions.ts) can send subscriptions to a Google Apps Script Web App.

Set these environment variables in your `.env.local`:

```bash
GOOGLE_APPS_SCRIPT_WEBHOOK_URL="https://script.google.com/macros/s/XXX/exec"
GOOGLE_APPS_SCRIPT_SECRET="choose-a-long-random-secret"
```

### Apps Script example

Create a Google Apps Script project in your Google Workspace, then add:

```javascript
const SECRET = "choose-a-long-random-secret";
const OWNER_EMAIL = "you@your-domain.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    if (data.secret !== SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" }, 401);
    }

    const email = (data.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "invalid_email" }, 400);
    }

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: "Nuova iscrizione landing",
      htmlBody:
        "<p>Nuova iscrizione: <b>" +
        escapeHtml(email) +
        "</b></p>" +
        "<p>IP: " +
        escapeHtml(String(data.ipAddress || "unknown")) +
        "</p>" +
        "<p>User-Agent: " +
        escapeHtml(String(data.userAgent || "unknown")) +
        "</p>" +
        "<p>Data: " +
        escapeHtml(String(data.submittedAt || "")) +
        "</p>",
    });

    MailApp.sendEmail({
      to: email,
      subject: "Iscrizione ricevuta",
      htmlBody:
        "<p>Grazie, abbiamo ricevuto la tua iscrizione agli aggiornamenti.</p>",
    });

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function jsonResponse(payload, status) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

Deploy as Web App and allow access to "Anyone" (public endpoint). Security is handled with the shared `secret`.

## Local Analytics (SQLite)

The project includes built-in local analytics:

- `pageview`
- `scroll_100` (tracked once per browser session)
- `easter_egg_unlocked` (tracked once per visitor)
- dashboard at `/admin/analytics`

### Install dependency

```bash
npm install
```

This installs `better-sqlite3`, used by the local DB.

### Database path

By default the database file is:

```bash
./data/analytics.sqlite
```

You can override it with:

```bash
ANALYTICS_DB_PATH="/absolute/path/to/analytics.sqlite"
```

### How unique visitors are counted

Unique visitors are based on an anonymous `visitorId` saved in browser `localStorage`.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/monossido/v0-40th-birthday-landing-page" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
