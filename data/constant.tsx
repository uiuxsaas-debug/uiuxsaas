import { themeToCssVars } from "./Themes";

export const suggestions = [
  {
    icon: '✈️',
    name: 'Travel Planner App',
    description:
      'Design a travel planner with 2 screens. Home screen shows upcoming trips as destination cards with images, dates, and progress indicators. Trip details screen includes an interactive map, daily itinerary timeline, and booking summary cards using soft gradients, rounded layouts, and calm travel-inspired colors.'
  },
  {
    icon: '📚',
    name: 'AI Learning Platform',
    description:
      'Create an AI learning platform with 2 screens. Dashboard displays course progress, streak counter, and achievement badges in a colorful, gamified layout. Course screen shows lesson cards, completion states, and an AI tips panel with friendly icons and vibrant visuals.'
  },
  {
    icon: '💳',
    name: 'Finance Tracker',
    description:
      'Generate a finance tracker with 2 screens. Dashboard shows total balance, expense breakdown charts, and budget goals with clean data visuals. Transactions screen lists categorized expenses with icons, amounts, and status indicators using a minimal UI and optional dark mode.'
  },
  {
    icon: '🛒',
    name: 'E-Commerce Store',
    description:
      'Design an e-commerce app with 2 screens. Home screen features a product grid, category filters, and promotional banners. Product detail screen includes a large product image, price, reviews, and a strong add-to-cart CTA using a premium, conversion-focused layout.'
  },
  {
    icon: '📅',
    name: 'Smart To-Do Planner',
    description:
      'Create a smart to-do planner with 2 screens. Main screen shows today’s tasks with priority labels, checkboxes, and progress summary. Calendar screen highlights deadlines and task density per day using a clean, productivity-focused design.'
  },
  {
    icon: '🍔',
    name: 'Food Delivery App',
    description:
      'Generate a food delivery app with 2 screens. Home screen displays restaurant cards with ratings, delivery time, and cuisine tags. Restaurant screen shows large food images, categorized menu items, and add-to-cart buttons with bright, appetizing visuals.'
  },
  {
    icon: '👶',
    name: 'Kids Learning App',
    description:
      'Design a kids learning app with 2 screens. Home screen shows learning categories as colorful cards with playful icons. Activity screen includes interactive lessons, reward animations, and progress stars using fun illustrations and a cheerful color palette.'
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