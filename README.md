# React App

Web application built with Next.js and React in purposes of testing Telegram Web App SDK.

## 🚀 Technologies Used

- **Framework**: Next.js 15.1.7
- **UI Library**: React 19
- **Styling**:
  - Mantine UI (@mantine/core, @mantine/hooks)
  - Emotion (@emotion/react)
  - SASS
  - clsx for conditional class names
- **Animations**: Framer Motion
- **Development**:
  - TypeScript
  - ESLint
  - Telegram Web App SDK (@twa-dev/sdk)

## 🏗️ Project Structure

```
src/
├── app/          # Next.js app directory (pages and routing)
├── components/   # Reusable React components
└── styles/       # Global styles and SASS files

public/          # Static assets
certificates/    # SSL certificates for local HTTPS
```

## 🎯 Architecture Overview

The project follows a modern React application architecture with Next.js:

- **App Router**: Utilizes Next.js 15's app router for efficient page routing and server components
- **Component-Based**: Modular architecture with reusable components
- **Styling Solution**: Combines Mantine UI framework with custom SASS styles
- **Type Safety**: Full TypeScript support throughout the application
- **Development Tools**: Configured with ESLint for code quality

## 🚦 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```


## 🛠️ Development Features

- Local HTTPS support with experimental Next.js features
- TypeScript configuration for type safety
- ESLint setup for code quality
- Integration with Telegram Web App SDK
