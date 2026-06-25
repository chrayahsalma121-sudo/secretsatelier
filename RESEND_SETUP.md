# Resend Email Notifications – Setup Guide

Every time someone submits **feedback** or a **reservation** on the Studio Creart website, you will receive an email in your inbox automatically.

---

## 1 – Install the dependency

```bash
bun install
```

`resend` is already added to `package.json`. This step is only needed once after cloning.

---

## 2 – Create a Resend account & get your API key

1. Go to **https://resend.com** and sign up (free tier = 3 000 emails/month).
2. Click **API Keys → Create API Key** → name it `studio-creart`.
3. Copy the key (it starts with `re_`).

---

## 3 – Configure your environment variables

Open `.env` and fill in the three Resend values:

```env
RESEND_API_KEY="re_your_actual_key_here"
ADMIN_EMAIL="chrayahsalma121@gmail.com"
EMAIL_FROM="Studio Creart <notifications@studiocreart.com>"
```

### ⚠️ Important – Sender address rules

Resend requires the **From** domain to be verified.

| Situation | What to use |
|-----------|-------------|
| **Testing locally or before domain setup** | `EMAIL_FROM="Studio Creart <onboarding@resend.dev>"` |
| **Production with your own domain** | Verify `studiocreart.com` in Resend → Domains, then use `notifications@studiocreart.com` |

---

## 4 – Add to Vercel environment variables

In your Vercel project dashboard:

**Settings → Environment Variables → Add:**

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_your_actual_key_here` |
| `ADMIN_EMAIL` | `chrayahsalma121@gmail.com` |
| `EMAIL_FROM` | `Studio Creart <notifications@studiocreart.com>` |

Then **redeploy** (Vercel → Deployments → Redeploy).

---

## 5 – What you'll receive

### Feedback email
- Subject: `⭐ New Feedback from Salma – Studio Creart`
- Content: name, star rating, message

### Reservation email  
- Subject: `🎨 New Reservation – Pottery from Salma Chrayah`
- Content: full name, phone, email, age, workshop chosen, notes

---

## Files changed

| File | What changed |
|------|-------------|
| `package.json` | Added `resend` dependency |
| `src/lib/email.server.ts` | **New** – Resend client + HTML email templates |
| `src/lib/feedbacks.functions.ts` | Calls `sendFeedbackEmail()` after saving to Supabase |
| `src/lib/reservations.functions.ts` | Replaced old Supabase RPC stub with `sendReservationEmail()` |
| `.env` | Added `RESEND_API_KEY`, `ADMIN_EMAIL`, `EMAIL_FROM` placeholders |
