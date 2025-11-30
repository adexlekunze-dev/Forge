"use client"

import { Progress } from '@/components/ui/progress';

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const calculateStrength = (pass: string): number => {
    let strength = 0;
    
    if (pass.length >= 10) strength += 25;
    if (pass.length >= 14) strength += 10;
    if (/[a-z]/.test(pass)) strength += 15;
    if (/[A-Z]/.test(pass)) strength += 15;
    if (/[0-9]/.test(pass)) strength += 15;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 20;
    
    return Math.min(strength, 100);
  };

  const strength = calculateStrength(password);
  
  const getStrengthLabel = (s: number): { label: string; color: string; bgColor: string } => {
    if (s === 0) return { label: '', color: '', bgColor: '' };
    if (s < 40) return { label: 'Weak', color: 'text-red-600', bgColor: 'bg-red-500' };
    if (s < 70) return { label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-500' };
    return { label: 'Strong', color: 'text-green-600', bgColor: 'bg-green-500' };
  };

  const { label, color, bgColor } = getStrengthLabel(strength);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <Progress 
        value={strength} 
        className="h-2"
      />
      {label && (
        <p className={`text-sm font-medium ${color}`}>
          Password strength: {label}
        </p>
      )}
    </div>
  );
}



