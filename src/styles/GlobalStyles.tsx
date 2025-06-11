import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');

  :root {
    /* Artist-focused color palette */
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --bg-tertiary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --text-tertiary: #999999;
    --accent-primary: #ff6b35;
    --accent-secondary: #f7931e;
    --accent-tertiary: #ffcc02;
    --border-primary: #333333;
    --border-secondary: #222222;
    --shadow-primary: 0 4px 20px rgba(255, 107, 53, 0.1);
    --shadow-secondary: 0 8px 40px rgba(255, 107, 53, 0.15);
    --gradient-primary: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%);
    --gradient-text: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.01em;
  }

  /* Beautiful scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-primary);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-secondary);
  }

  /* Selection styles */
  ::selection {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }

  ::-moz-selection {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 800;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 0.9;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--text-primary);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 600;
    color: var(--text-primary);
  }

  h4 {
    font-size: clamp(1.25rem, 2.5vw, 1.8rem);
    font-weight: 600;
    color: var(--text-secondary);
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
    font-weight: 400;
    line-height: 1.7;
  }

  .lead {
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .small {
    font-size: 0.875rem;
    color: var(--text-tertiary);
  }

  .mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }

  a {
    color: var(--accent-primary);
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid transparent;
  }

  a:hover {
    color: var(--accent-secondary);
    border-bottom-color: var(--accent-secondary);
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* Image optimization */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section {
    padding: 5rem 0;
  }

  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
  }

  .glow {
    box-shadow: var(--shadow-primary);
  }

  .glow-strong {
    box-shadow: var(--shadow-secondary);
  }

  .gradient-border {
    position: relative;
    border-radius: 1rem;
    padding: 2px;
    background: var(--gradient-primary);
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--bg-primary);
    border-radius: inherit;
  }

  /* Animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 107, 53, 0.1);
    }
    50% {
      box-shadow: 0 0 40px rgba(255, 107, 53, 0.3);
    }
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .float {
    animation: float 6s ease-in-out infinite;
  }

  .pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }

  /* Grid system */
  .grid {
    display: grid;
    gap: 2rem;
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  /* Flexbox utilities */
  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  /* Spacing utilities */
  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mt-5 { margin-top: 3rem; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  .mb-5 { margin-bottom: 3rem; }

  /* Responsive design */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    
    .section {
      padding: 3rem 0;
    }
    
    .grid {
      gap: 1rem;
    }
  }

  /* Art-specific elements */
  .artwork-frame {
    padding: 0.5rem;
    background: var(--bg-secondary);
    border-radius: 0.5rem;
    box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .signature {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--accent-primary);
  }

  /* Noise texture overlay for artistic feel */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    z-index: 1000;
    mix-blend-mode: overlay;
  }
`; 