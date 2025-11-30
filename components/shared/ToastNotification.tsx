"use client"

// This is a wrapper component that uses the toast hook
// The actual toast implementation is in hooks/useToast.ts
// and components/ui/toaster.tsx

export { useToast, showToast } from '@/hooks/useToast';
export { Toaster } from '@/components/ui/toaster';



