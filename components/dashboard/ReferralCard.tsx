"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Referral } from '@/lib/types';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useToast } from '@/hooks/useToast';
import { Copy, Check, Share2, Gift } from 'lucide-react';

interface ReferralCardProps {
  referral: Referral;
}

export default function ReferralCard({ referral }: ReferralCardProps) {
  const { copy, copied } = useCopyToClipboard();
  const { toast } = useToast();

  const handleCopy = async () => {
    const success = await copy(referral.shareableLink);
    if (success) {
      toast({
        title: 'Referral link copied!',
        variant: 'success',
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-purple-600" />
          <span>Referral Program</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Code */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white border-2 border-purple-300 rounded-lg px-4 py-3 font-mono font-bold text-lg text-center">
              {referral.code}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="h-11 w-11"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Shareable Link */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Shareable Link</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white border rounded-lg px-3 py-2 text-sm truncate">
              {referral.shareableLink}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{referral.totalReferrals}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{referral.activeReferrals}</p>
            <p className="text-xs text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{referral.pointsEarned}</p>
            <p className="text-xs text-gray-600">Points</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/50 rounded-lg p-3 mt-4">
          <p className="text-xs font-medium text-gray-700 mb-2">How it works:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Share your link with friends</li>
            <li>• They get 10% off their first booking</li>
            <li>• You earn 500 points per referral</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}



