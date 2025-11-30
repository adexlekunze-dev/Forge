"use client"

import { useState } from 'react';

interface UseCopyToClipboardResult {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  error: Error | null;
}

export function useCopyToClipboard(): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to copy');
      setError(error);
      setCopied(false);
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setError(null);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
          return true;
        }
      } catch (fallbackErr) {
        // Both methods failed
      }
      
      return false;
    }
  };

  return { copy, copied, error };
}



