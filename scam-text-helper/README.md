# Scam Text Helper

A small, static web app that helps people quickly assess whether a text
message they received from an unknown number shows common signs of being a
**scam or extortion attempt**, and gives plain-language guidance on what to
do next.

**This app does NOT identify who owns a phone number.** It deliberately does
not include "reverse phone lookup" / caller-identity features, since those
can expose private individuals' personal information without consent. It
focuses instead on analyzing the *message content* for red flags.

## Features

- Paste a suspicious text message and get a risk rating (low / medium / high)
- See exactly which red-flag patterns were detected (urgency, payment
  requests, threats, phishing links, etc.)
- Get step-by-step guidance: what not to do, how to report, and when to
  involve law enforcement
- Optional: hook up a real spam-number lookup API (Twilio Lookup, Numverify,
  etc.) via `config.js` — not included by default

## Running locally

This is a static site — no build step required.

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set the source to your main branch (root folder).
4. Your app will be live at `https://<username>.github.io/<repo-name>/`.

## File structure

```
.
├── index.html          # Main page / form
├── style.css           # Styling
├── app.js              # Core logic — analyzes message, renders results
├── flags.js            # List of red-flag patterns and guidance text
├── config.js.example   # Template for optional spam-lookup API integration
└── README.md
```

## Adding a real spam-number lookup (optional)

Copy `config.js.example` to `config.js` and fill in an API key from a
service like Twilio Lookup or Numverify. Add `config.js` to `.gitignore` so
you don't commit your key. Note: for production use, API calls with secret
keys should go through a backend, not directly from the browser.

## Disclaimer

This tool provides general informational guidance only and is not a
substitute for advice from your phone carrier, bank, or law enforcement. If
you believe you are being threatened, blackmailed, or extorted, contact your
local police or the FBI's Internet Crime Complaint Center (ic3.gov).
