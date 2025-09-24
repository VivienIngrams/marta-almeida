'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of the context value
interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
}

// Create context to provide and consume language state
const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Helper function to get language from cookies
const getLanguageFromCookies = () => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/language=([^;]+)/);
    return match ? match[1] : 'pt'; // Default to 'en'
  }
  return 'fr'; // Fallback if document is undefined (e.g., server-side)
};

// Helper function to set language in cookies
const setLanguageInCookies = (language) => {
  document.cookie = `language=${language}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year expiration
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');

  // Set the language after initial render
  useEffect(() => {
    const initialLanguage = getLanguageFromCookies(); // Fetch language from cookies
    setLanguage(initialLanguage); // Set language in state
    // Update the document's lang attribute on client side after hydration
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initialLanguage;
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    setLanguage(newLanguage); // Update state
    setLanguageInCookies(newLanguage); // Update cookie
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLanguage; // Update lang attribute on HTML element
    }
    window.location.reload(); // Force reload to apply the language change
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};