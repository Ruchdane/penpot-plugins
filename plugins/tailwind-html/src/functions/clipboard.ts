export async function copyText(text: string) {
  // Check if the Clipboard API is supported
  if (!navigator.clipboard) {
    console.error("Clipboard API not supported");
    return;
  }

  // Write the HTML content to clipboard
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    // Fallback method using document.execCommand (older browsers or permissions missing)
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      alert(`Fallback: Unable to copy${err}`);
    }
    document.body.removeChild(textArea);
  }
}
