// flags.js
// A library of common red-flag patterns found in scam / extortion texts.
// Each entry has: a regex to match, a human-readable label, a category,
// and a severity weight (higher = more concerning).

const SCAM_FLAGS = [
  {
    label: "Asks you to send money or pay a debt",
    category: "Money request",
    pattern: /\b(send|pay|wire|venmo|cashapp|cash app|zelle|paypal|gift card|bitcoin|crypto)\b.{0,40}\b(\$|\bdollars?\b|\bmoney\b)/i,
    weight: 3,
  },
  {
    label: "Mentions a specific dollar amount",
    category: "Money request",
    pattern: /\$\s?\d+(\.\d{2})?/,
    weight: 2,
  },
  {
    label: "Creates urgency or a deadline",
    category: "Pressure tactic",
    pattern: /\b(immediately|right now|asap|urgent|today only|before it'?s too late|last chance|expires? (today|soon))\b/i,
    weight: 2,
  },
  {
    label: "Threatens consequences if you don't comply",
    category: "Threat / extortion",
    pattern: /\b(or else|i will (post|share|send|tell|expose)|everyone will (see|know)|i have (your|access to)|legal action|arrest|police|warrant|sue you)\b/i,
    weight: 4,
  },
  {
    label: "Claims to know personal/embarrassing info about you",
    category: "Threat / extortion",
    pattern: /\b(your (photos?|videos?|messages?|browsing|webcam|account)|i (saw|recorded|have evidence|know what you did))\b/i,
    weight: 4,
  },
  {
    label: "Claims to be a stranger who 'knows' you",
    category: "Social engineering",
    pattern: /\b(do(n'?t)? you remember me|it'?s been a while|long time no (talk|see|hear)|guess who)\b/i,
    weight: 2,
  },
  {
    label: "Asks you to click a link",
    category: "Phishing",
    pattern: /(https?:\/\/|bit\.ly|tinyurl|click (here|this|the link))/i,
    weight: 3,
  },
  {
    label: "Asks for personal or account details",
    category: "Phishing",
    pattern: /\b(verify your|confirm your|enter your|provide your).{0,20}\b(account|ssn|social security|password|pin|card number|otp|code)\b/i,
    weight: 4,
  },
  {
    label: "Comes from an unusual or unfamiliar number format",
    category: "Sender pattern",
    pattern: /^\s*$/, // placeholder; handled separately based on number field
    weight: 0,
  },
];

// Guidance text shown based on overall risk score.
const GUIDANCE = {
  high: [
    "This message has multiple strong red flags for a scam or extortion attempt.",
    "Do not reply, click any links, or send any money or personal information.",
    "Do not engage even to say 'wrong number' or 'stop' — replying confirms your number is active.",
    "Take a screenshot of the message for your records.",
    "Block the number on your phone.",
    "Report it: forward the text to 7726 (SPAM) on most US carriers, and report to the FTC at reportfraud.ftc.gov.",
    "If the message includes threats to share private images, info, or accuses you of something and demands payment, this may be extortion/sextortion — consider reporting to local police or the FBI's IC3 (ic3.gov). You are not in trouble for being targeted.",
  ],
  medium: [
    "This message has some characteristics common in scam texts.",
    "Be cautious: don't click links, don't reply, and don't send money or personal info.",
    "If you're unsure whether this is someone you know, contact that person through a number or method you already trust (not by replying to this text).",
    "Consider blocking the number and reporting it by forwarding to 7726 (SPAM).",
  ],
  low: [
    "This message doesn't show strong scam indicators, but unsolicited texts from unknown numbers always deserve some caution.",
    "If you don't recognize the sender, avoid clicking links or sharing personal info.",
    "If it claims to be someone you know, verify through a separate, trusted channel before responding.",
  ],
};
