import { themeToCssVars } from "./Themes";

export const suggestions = [
  {
    icon: '✈️',
    name: 'Flight Ticket Booking',
    style: 'Minimalist',
    description:
      'A clean and efficient flight booking app. Home screen with destination search, date picker, and recent searches. Flight results page with easy-to-read cards, price comparison, and filters for airlines and stops in a sleek, white-space dominant layout.'
  },
  {
    icon: '🧘',
    name: 'Health & Wellness',
    style: 'Neo-Brutalism',
    description:
      'Personal health dashboard with bold borders and high contrast. Widgets for heart rate, sleep quality, and daily steps. Activity tracking screen with large typography and punchy colors for a modern, energetic feel.'
  },
  {
    icon: '🪙',
    name: 'Crypto Wallet',
    style: 'Glassmorphism',
    description:
      'Futuristic cryptocurrency wallet. Dashboard showing portfolio balance with frosted glass cards and vibrant gradients. Asset list with real-time price sparks and a seamless "Send/Receive" flow using transparency and blur effects.'
  },
  {
    icon: '🐾',
    name: 'Pet Care Manager',
    style: 'Playful',
    description:
      'Cute and friendly pet management app. Pet profiles with avatars, vaccination schedules, and daily reminders. rounded shapes, soft pastel colors, and delightful micro-interactions to make pet care fun.'
  }
];



export const HtmlWrapper = (theme: any, htmlCode: string, isMobile: boolean = false) => {
  const mobileStyles = isMobile ? `
        html, body {
            width: 393px !important;
            min-height: 852px !important;
            height: auto !important;
            overflow: visible !important;
            overflow-x: hidden !important;
        }
        body > div:first-child {
            height: auto !important;
            min-height: 852px !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: visible !important;
        }
    ` : '';

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=393, initial-scale=1, maximum-scale=1, user-scalable=no" />

  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Tailwind 3.x CDN only (no conflicts) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          },
        },
      },
    }
  </script>

  <!-- Iconify for icons -->
  <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>

  <style>
    ${themeToCssVars(theme)}
    ${mobileStyles}
    
    * {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Smooth scrolling for any scrollable areas */
    .scroll-smooth {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    

    /* Glass Effect (for Nav) */
    .glass-nav {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid rgba(0,0,0,0.05);
    }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .shadow-soft {
      box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.04), 0 4px 8px -2px rgba(0,0,0,0.02);
    }

  </style>
</head>
<body class="bg-[var(--background)] ${isMobile ? '' : 'pt-2'} text-[var(--foreground)] ${isMobile ? 'w-[393px] min-h-[852px]' : 'w-full'}">
  ${(htmlCode || '').replace('```html', '').replace('```', '')}
</body>
</html>
`;

}