# CCMeta.ai

CCMeta.ai is a React and TypeScript application for generating SEO metadata. You can import a list of URLs, automatically extract their main content, and receive SEO friendly titles and meta descriptions based on common marketing frameworks.

## Installation

1. Ensure you have **Node.js 18** or later installed.
2. Install dependencies:

```bash
npm install
```

## Development

- Start the development server:

```bash
npm run dev
```

- Create an optimized production build:

```bash
npm run build
```

- Preview the production build locally:

```bash
npm run preview
```

## Usage

1. **Add URLs** – Enter a URL manually or drag and drop a CSV/TXT file containing multiple URLs.
2. **Process URLs** – Click **Démarrer** to begin processing. The app scrapes each site, detects a marketing framework (AIDA, PAS, etc.) and generates several title and meta description suggestions.
3. **Control Processing** – You can pause or reset the current queue. Completed results can be exported as a CSV file.
4. **View Results** – For each processed URL, open the results modal to copy generated titles and descriptions and view validation information. Dark mode can be toggled in the header.

This project is intended as a front‑end prototype; scraping and analysis are simulated in `src/utils`.

## License

This project is licensed under the [MIT License](LICENSE).

