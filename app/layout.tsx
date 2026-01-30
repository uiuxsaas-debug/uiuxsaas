import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const appFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AppyScreen | Design Mobile Apps with AI in Seconds",
  description: "Turn your idea into professional, developer-ready mobile app designs instantly. The #1 AI-powered interface generator for founders and teams.",
  icons: {
    icon: '/logo-half.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#FF5200',
          colorBackground: '#FCFCFC',
          colorInputBackground: '#ffffff',
          colorInputText: '#000000',
          colorText: '#000000',
          colorTextSecondary: '#4b5563',
          colorDanger: '#ef4444',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#FF5200',
            color: '#ffffff',
            fontWeight: '600',
            '&:hover': {
              backgroundColor: '#e04800',
            }
          },
          card: {
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          headerTitle: { color: '#000000' },
          headerSubtitle: { color: '#6b7280' },
          socialButtonsBlockButton: {
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            color: '#374151',
            '&:hover': {
              backgroundColor: '#f9fafb',
            }
          },
          socialButtonsBlockButtonText: { color: '#374151', fontWeight: '500' },
          dividerLine: { backgroundColor: '#e5e7eb' },
          dividerText: { color: '#6b7280' },
          formFieldLabel: { color: '#374151' },
          formFieldInput: {
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            color: '#000000',
          },
          footerActionLink: { color: '#FF5200', '&:hover': { color: '#e04800' } },
          identityPreviewEditButton: { color: '#FF5200' },
          rootBox: { backgroundColor: 'transparent' },
          modalBackdrop: { backgroundColor: 'rgba(0,0,0,0.5)' },
        }
      }}
      localization={{
        signIn: {
          start: {
            title: 'Sign in to AppyScreen',
            subtitle: 'Welcome back! Please sign in to continue'
          },
        },
        signUp: {
          start: {
            title: 'Sign up for AppyScreen',
            subtitle: 'Create your account to start designing'
          }
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${appFont.className} overflow-x-hidden`}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: '#000000',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              },
              classNames: {
                success: 'border-green-500/50 text-green-700',
                error: 'border-red-500/50 text-red-700',
                loading: 'border-[#FF5200]/50 text-[#FF5200]',
              }
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
