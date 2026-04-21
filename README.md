# Vitrack Presentation Website

This project is a static presentation website for the Vitrack class assignment. It keeps the original hero section and turns the rest of the page into full-screen presentation sections.

## What is included

- A presentation-style hero cover slide
- Section 1: introduction and brand overview
- Section 2: competitive landscape
- Section 3: customer value proposition, persona, and customer segment
- Section 4: media and communications with shortened messaging, sample concepts, and a full PNG gallery
- A conclusion slide instead of the old waitlist form

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

## Important beginner note

This project is just HTML, CSS, and JavaScript, so it works well on GitHub Pages without extra setup.

If you want to swap the current presentation images in Section 4 later, replace the image files in the HTML and adjust the gallery styles in `styles.css`.

## What success looks like

When the page is working correctly:

- the hero stays at the top as the opening slide
- each assignment section fills the screen more like a presentation than a sales page
- there is no waitlist form at the bottom
- the media section ends with a gallery that shows every PNG in the project folder
