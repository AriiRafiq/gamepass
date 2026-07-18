const generateBtn = document.getElementById("generateBtn");
const copyAllBtn = document.getElementById("copyAllBtn");

const accountsInput = document.getElementById("accounts");
const codesInput = document.getElementById("codes");

const results = document.getElementById("results");
const message = document.getElementById("message");

let allCombinedText = "";

generateBtn.addEventListener("click", () => {

    results.innerHTML = "";
    message.textContent = "";
    copyAllBtn.style.display = "none";

    allCombinedText = "";

    const accounts = accountsInput.value
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    const codes = codesInput.value
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    if (accounts.length === 0 || codes.length === 0) {

        message.textContent = "Please fill both fields.";
        message.style.color = "red";

        return;
    }

    if (accounts.length !== codes.length) {

        message.textContent =
            `Number of lines does not match. Accounts: ${accounts.length}, Codes: ${codes.length}`;

        message.style.color = "red";

        return;
    }

    const combinedLines = [];

    for (let i = 0; i < accounts.length; i++) {

        const combined = `${accounts[i]}:${codes[i]}`;

        combinedLines.push(combined);

        const row = document.createElement("div");
        row.className = "result-row";

        const text = document.createElement("div");
        text.className = "result-text";
        text.textContent = combined;

        const copyButton = document.createElement("button");
        copyButton.className = "copy-btn";
        copyButton.textContent = "Copy";

        copyButton.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(combined);

                copyButton.textContent = "Copied!";

                setTimeout(() => {
                    copyButton.textContent = "Copy";
                }, 1500);

            } catch {

                alert("Failed to copy.");
            }
        });

        row.appendChild(text);
        row.appendChild(copyButton);

        results.appendChild(row);
    }

    allCombinedText = combinedLines.join("\n");

    message.textContent =
        `Generated ${combinedLines.length} lines successfully.`;

    message.style.color = "green";

    copyAllBtn.style.display = "inline-block";
});

copyAllBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(allCombinedText);

        copyAllBtn.textContent = "Copied All!";

        setTimeout(() => {
            copyAllBtn.textContent = "Copy All";
        }, 1500);

    } catch {

        alert("Failed to copy.");
    }
});