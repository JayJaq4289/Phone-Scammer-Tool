// app.js
// Main logic: analyze message text for red flags, compute a risk level,
// and display guidance. Optionally checks the sender's number against a
// spam-lookup API if you configure one (see config.js.example).

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const message = document.getElementById("messageText").value.trim();
  const number = document.getElementById("senderNumber").value.trim();

  if (!message) {
    alert("Please paste the message you received.");
    return;
  }

  const matchedFlags = SCAM_FLAGS.filter(
    (flag) => flag.weight > 0 && flag.pattern.test(message)
  );

  const score = matchedFlags.reduce((sum, f) => sum + f.weight, 0);

  let level;
  if (score >= 6) level = "high";
  else if (score >= 3) level = "medium";
  else level = "low";

  renderResults(level, matchedFlags, number);
});

function renderResults(level, matchedFlags, number) {
  const results = document.getElementById("results");
  const riskLevel = document.getElementById("riskLevel");
  const flagsFound = document.getElementById("flagsFound");
  const guidance = document.getElementById("guidance");
  const lookupNote = document.getElementById("lookupNote");

  results.hidden = false;

  // Risk badge
  const levelLabels = {
    high: "⚠️ High risk of scam / extortion",
    medium: "🔶 Possible scam — be cautious",
    low: "🟢 Low risk indicators found",
  };
  riskLevel.textContent = levelLabels[level];
  riskLevel.className = "risk-badge risk-" + level;

  // Flags found
  if (matchedFlags.length > 0) {
    flagsFound.innerHTML =
      "<h3>What we noticed:</h3><ul>" +
      matchedFlags
        .map((f) => `<li><strong>${f.category}:</strong> ${f.label}</li>`)
        .join("") +
      "</ul>";
  } else {
    flagsFound.innerHTML =
      "<h3>What we noticed:</h3><p>No common scam patterns matched, but stay cautious with unknown senders.</p>";
  }

  // Guidance
  guidance.innerHTML =
    "<h3>What to do next:</h3><ul>" +
    GUIDANCE[level].map((tip) => `<li>${tip}</li>`).join("") +
    "</ul>";

  // Optional number lookup note
  if (number) {
    lookupNote.innerHTML = `
      <h3>About the sender's number</h3>
      <p>
        This app does not look up who owns a phone number — that kind of
        personal-identity lookup isn't something we provide, since it can
        expose private individuals' information without their consent.
      </p>
      <p>
        If you want to check whether <strong>${escapeHTML(
          number
        )}</strong> has been reported by others as spam, you can search it on
        community sites like
        <a href="https://www.shouldianswer.com/" target="_blank" rel="noopener">Should I Answer</a>
        or report it directly via
        <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener">reportfraud.ftc.gov</a>.
      </p>
      <p class="dev-note">
        Developers: you can wire up a real spam-lookup API (e.g. Twilio
        Lookup, Numverify) in <code>config.js</code> — see
        <code>config.js.example</code> for a template. This app intentionally
        ships without one configured.
      </p>
    `;
  } else {
    lookupNote.innerHTML = "";
  }
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
