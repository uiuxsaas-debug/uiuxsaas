import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const appFont = DM_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "UIUX Mockup generator App",
  description: "Generate High quality Free UIUX Mobile and Web Mokcup designs",
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
          colorPrimary: '#eab308',
          colorBackground: '#0a0a0f',
          colorInputBackground: '#18181b',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#a1a1aa',
          colorDanger: '#ef4444',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#eab308',
            color: '#000000',
            fontWeight: '600',
            '&:hover': {
              backgroundColor: '#facc15',
            }
          },
          card: {
            backgroundColor: '#0a0a0f',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          headerTitle: { color: '#ffffff' },
          headerSubtitle: { color: 'rgba(255,255,255,0.6)' },
          socialButtonsBlockButton: {
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)',
            }
          },
          socialButtonsBlockButtonText: { color: '#ffffff', fontWeight: '500' },
          dividerLine: { backgroundColor: 'rgba(255,255,255,0.1)' },
          dividerText: { color: 'rgba(255,255,255,0.5)' },
          formFieldLabel: { color: 'rgba(255,255,255,0.8)' },
          formFieldInput: {
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
          },
          footerActionLink: { color: '#eab308', '&:hover': { color: '#facc15' } },
          identityPreviewEditButton: { color: '#eab308' },
          rootBox: { backgroundColor: 'transparent' },
          modalBackdrop: { backgroundColor: 'rgba(0,0,0,0.8)' },
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={appFont.className}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#0a0a0f',
                border: '1px solid rgba(234, 179, 8, 0.2)',
                color: '#ffffff',
              },
              classNames: {
                success: 'border-green-500/30',
                error: 'border-red-500/30',
                loading: 'border-yellow-500/30',
              }
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
