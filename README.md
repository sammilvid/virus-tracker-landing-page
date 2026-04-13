# Vitrack Landing Page

This is a static landing page for a school assignment. It is designed to work well on GitHub Pages, which is why the project uses plain `HTML`, `CSS`, and `JavaScript` instead of a heavier setup.

## What is included

- A strong headline and value proposition
- Clear sections for the problem, the solution, and why the idea is different
- A mobile-friendly layout
- A polished email waitlist form
- A dashboard-style hero inspired by your reference images

## How to Run This

### Option 1: Open it directly

Open `index.html` in your browser.

### Option 2: Run a simple local server

If you have Python installed, run this inside the project folder:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to host it on GitHub Pages

1. Upload these files to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Set the source to your main branch and the root folder.
4. Save the settings and wait for GitHub Pages to publish the site.

## Important beginner note

GitHub Pages can host static files, but it cannot store submitted emails by itself. Right now the form validates the email, shows a success message, and saves it in that browser only.

If you want real email collection later, use a free form service like Formspree:

1. Create a Formspree form.
2. Copy your Formspree endpoint URL.
3. Open `script.js`.
4. Paste the URL into the `FORMSPREE_ENDPOINT` constant.

After that, the form can send real submissions while still being hosted on GitHub Pages.
