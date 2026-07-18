const generateBtn = document.getElementById("generateBtn");
const accountsInput = document.getElementById("accounts");
const codesInput = document.getElementById("codes");
const results = document.getElementById("results");
const message = document.getElementById("message");

generateBtn.addEventListener("click", () => {

    results.innerHTML = "";
    message.textContent = "";

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

    message.textContent =
        `Generated ${accounts.length} lines successfully.`;

    message.style.color = "green";

    for (let i = 0; i < accounts.length; i++) {

        const combined = `${accounts[i]}:${codes[i]}`;

        const row = document.createElement("div");
        row.className = "result-row";

        const text = document.createElement("div");
        text.className = "result-text";
        text.textContent = combined;

        const button = document.createElement("button");
        button.className = "copy-btn";
        button.textContent = "Copy";

        button.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(combined);

                button.textContent = "Copied!";

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1500);

            } catch {

                alert("Failed to copy.");
            }

        });

        row.appendChild(text);
        row.appendChild(button);

        results.appendChild(row);
    }
});
