# Contributing to GDG Resume Maker

Thank you for your interest in the **GDG Resume Maker**! We appreciate your willingness to contribute to this project.

This document outlines how to propose changes, report issues, and add new templates to the GDG Resume Maker.

Your contributions, whether code, documentation, or feedback, are highly appreciated.

---

## 1. Code of Conduct

To maintain a positive and inclusive environment, all contributors and participants must adhere to the following rules:

* **Be Kind and Respectful:** Treat all community members with courtesy and respect, regardless of differing opinions or experience.
* **Be Constructive:** Offer helpful, actionable feedback. Gracefully accept constructive criticism.
* **Be Professional:** Avoid trolling, harassment, or derogatory language.
* **Reporting:** If you encounter unacceptable behavior, please report it by **[opening a new issue](https://github.com/Yashb404/gdg-resume-maker/issues/new/choose)** immediately.

---

## 2. Setting Up Your Development Environment

The project is built with **Next.js (App Router), React, and Tailwind CSS v4**.

### Prerequisites

You need **Node.js** (which includes **npm**) installed on your system.

* If you don't have them, download the latest **LTS version** from the **[Node.js official site](https://nodejs.org/)**.
* *Tip:* Using **nvm** (Node Version Manager) is recommended for managing different Node.js versions.

### Quickstart

1.  **Fork** the repository on GitHub.
2.  **Clone** your forked repository locally:
    ```bash
    git clone [Your Forked Repo URL]
    ```
3.  **Install** dependencies:
    ```bash
    npm install
    ```
4.  **Start** the development server:
    ```bash
    npm run dev
    # The application will be running at http://localhost:3000
    ```

---

## 3. Reporting Bugs and Proposing Changes

### 3.1. Reporting Bugs

If you find an issue:

1.  **Check for existing reports** on the **[Issues page](https://github.com/Yashb404/gdg-resume-maker/issues)**.
2.  If the bug is new, please **[open a new issue](https://github.com/Yashb404/gdg-resume-maker/issues/new/choose)** and fill out the bug template.
3.  Your report **must** include:
    * Reproduction steps, browser/OS, and screenshots.
    * Paste relevant console errors.
    * A description of the **expected vs. actual behavior**.

### 3.2. Proposing Features or Enhancements

* All feature ideas (like new editor functions or core library improvements) must be proposed by **[opening a new issue](https://github.com/Yashb404/gdg-resume-maker/issues/new/choose)**. This is required before starting any development work.

---

## 4. Development Workflow

### 4.1. Project Conventions

* **Language:** Use **TypeScript everywhere**. Use the shared `ResumeData` type from `lib/initialData.ts`.
* **Structure:** Keep components small and focused. Avoid deep nesting.
* **Styling:** Follow **Tailwind utility-first style**. Keep custom CSS minimal and confined to `app/globals.css`.
* **Naming:** Prefer descriptive names (no 1–2 letter variables).
* **Maintenance:** Add `TODO` or `FIXME` comments when code needs follow-up.

### 4.2. Branching and Pull Requests (PRs)

1.  **Create a feature branch** off of `main`:
    ```bash
    git checkout -b feat/<short-name> 
    # OR 
    git checkout -b fix/<short-name>
    ```
2.  **Commit Messages:** Use conventional, present-tense messages (e.g., `feat: add template registry and selector` or `fix: correct print area padding`).
3.  **Run Linting:** **Always** run `npm run lint` and fix warnings/errors before opening a PR.
4.  **PR Content:** Keep PRs small and focused. Include before/after screenshots for UI changes and reference related issues (if applicable) in the description.

---

## 5. Adding a New Template

Templates are a high-value contribution!

1.  **Create your component** under `components/templates/<YourTemplateName>.tsx`.
2.  **Export a component:** It must accept the data prop: `({ data }: { data: ResumeData }) => JSX.Element`.
3.  **Register it** in `components/ResumePreview.tsx` in the templates map with a unique string key.
4.  **Add it to the selector** in `app/page.tsx` (the `<select>` options).
5.  **Ensure it prints well:**
    * Page layout should fit inside `.resume-page` (A4) and gracefully handle page breaks.
    * Test thoroughly with the **“Print PDF”** button and the browser print dialog.

### Testing the PDF Output

When testing your template, verify the PDF output by following these steps precisely:

1.  Click **“Print PDF”** in the application.
2.  In the browser's print dialog, ensure these settings are selected:
    * Paper size: **A4**
    * Margins: **None**
    * Scale: **100% (or Actual size)**
    * Headers and footers: **Off**

---

### Release Checklist (Maintainers Only)

* Changelog entry prepared.
* App builds successfully with `npm run build`.
* Smoke test: editor, preview, and print dialog behavior verified.

Thanks for contributing!