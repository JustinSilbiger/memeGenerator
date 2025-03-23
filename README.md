# Meme Generator

A simple React app that allows users to create custom memes with custom text. This project uses the ImgFlip API to fetch popular meme templates and allows users to add custom top and bottom text.

## Features

- Fetches popular meme templates from the ImgFlip API
- Add custom top and bottom text to memes
- Download memes as JPEG images
- Responsive design

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS3
- ImgFlip API

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/memeGenerator.git
   cd memeGenerator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
   (or the port shown in your terminal)

## How to Use

1. The application loads with a random meme template and default text
2. Enter your custom text in the "Top Text" and "Bottom Text" input fields
3. Click "Get a new meme image" to change the meme template
4. Click "Download Meme" to save your creation as a JPEG file

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, which you can deploy to any static site hosting service.

## Preview the Production Build

To preview the production build locally:

```bash
npm run preview
```

## License

This project is open source and available under the [MIT License](LICENSE).
