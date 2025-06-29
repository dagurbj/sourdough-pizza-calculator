# Sourdough Pizza Calculator

A simple web app for scaling sourdough pizza and bread recipes. Adjust sliders for hydration, levain, salt and more to see ingredient amounts and step-by-step instructions.

## Features

- **Pizza and Bread Calculators** – switch between pizza dough and Tartine-style bread.
- **Customizable Parameters** – change dough weight, number of items, salt percentage, hydration and levain.
- **Automatic Recipe** – ingredient weights and instructions update instantly.
- **State Persistence** – settings are saved in your browser with `localStorage`.
- **Progressive Web App** – works offline once cached.

A live version is available at [sourdoughpizza.cloud](https://sourdoughpizza.cloud/).

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run serve
```
The app typically runs at `http://localhost:8080`.

Lint code with:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

To deploy to GitHub Pages:
```bash
npm run deploy
```

Configuration details can be found in [`vue.config.js`](vue.config.js) and the service worker setup in [`src/registerServiceWorker.js`](src/registerServiceWorker.js).

## Contributing

Feel free to open issues or pull requests if you have suggestions or improvements.

