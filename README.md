# Search Me

Search Me is a focused opportunity dashboard for Indian freshers. It brings degree-relevant private and government roles into one calm, easy-to-scan workspace instead of making students search across multiple portals.

## Run the prototype

```powershell
node server.js
```

Open `http://localhost:3000`.

The local Node server serves the frontend and includes a development-only OTP endpoint for the login flow. Government and private job cards open their official recruitment or hiring portal in a new tab; Search Me does not bypass CAPTCHA, OTP, login, or other portal security. The production implementation should replace this with Django REST endpoints, a real SMS provider, a database-backed profile, and approved/verified job feeds.

The profile registration flow currently stores the name, mobile number, and degree in local storage so the interaction can be tested without a database.

## Daily job discovery

The Preferences action enables the student's daily 9:00 AM alert preference and requires confirmation before an official portal is opened. This browser prototype stores that preference locally. For a production deployment, run a Django Celery worker with Celery Beat (or a managed scheduler) to fetch approved/public job feeds each morning, match them to student profiles, and send an email/SMS/push notification. The notification should contain the official source, closing date, and an explicit confirmation action. It must not submit applications, bypass CAPTCHA, or handle government-portal OTPs without written authorization from the portal owner.
