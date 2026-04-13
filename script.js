const waitlistForm = document.querySelector(".waitlist-form");
const emailInput = document.querySelector("#email");
const formStatus = document.querySelector("#form-status");
const submitButton = waitlistForm?.querySelector("button[type='submit']");

// Paste a Formspree endpoint here later if you want real submissions on GitHub Pages.
const FORMSPREE_ENDPOINT = "";

if (waitlistForm && emailInput && formStatus && submitButton) {
  waitlistForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    waitlistForm.dataset.state = "";
    formStatus.textContent = "";

    if (!emailInput.value.trim()) {
      waitlistForm.dataset.state = "error";
      formStatus.textContent = "Please enter your email address first.";
      emailInput.focus();
      return;
    }

    if (!emailInput.checkValidity()) {
      waitlistForm.dataset.state = "error";
      formStatus.textContent = "Please enter a valid email address.";
      emailInput.focus();
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const defaultLabel = "Join the waitlist";

    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    try {
      if (FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          throw new Error("Form endpoint rejected the request.");
        }
      } else {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 700);
        });

        const storedEntries = JSON.parse(
          window.localStorage.getItem("vitrackWaitlist") ?? "[]"
        );

        if (!storedEntries.includes(email)) {
          storedEntries.push(email);
          window.localStorage.setItem(
            "vitrackWaitlist",
            JSON.stringify(storedEntries)
          );
        }
      }

      waitlistForm.dataset.state = "success";
      formStatus.textContent = "Thanks. You are on the Vitrack waitlist.";
      submitButton.textContent = "Joined";
      emailInput.value = "";
    } catch (error) {
      waitlistForm.dataset.state = "error";
      formStatus.textContent =
        "The form could not submit right now. Try again or connect a real form endpoint.";
      submitButton.textContent = defaultLabel;
      console.error(error);
    } finally {
      window.setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = defaultLabel;
      }, 1200);
    }
  });
}
