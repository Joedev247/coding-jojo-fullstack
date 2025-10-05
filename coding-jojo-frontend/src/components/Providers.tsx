'use client';

import { LanguageProvider } from '../contexts/LanguageContext';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ToastProvider } from '../contexts/ToastContext';
import { GoogleAuthProvider } from './auth/GoogleAuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <LanguageProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </LanguageProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleAuthProvider>
  );
}
