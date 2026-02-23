'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, GiftIcon } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [referralCode, setReferralCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    preferredContact: 'whatsapp' as 'sms' | 'whatsapp' | 'both',
  });

  // Check for referral code in URL or cookies
  useEffect(() => {
    // Check URL first
    const refFromUrl = searchParams.get('ref');
    
    // Then check cookies
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    const refFromCookie = cookies['referral_code_client'];
    
    // Use URL param first, then cookie
    const ref = refFromUrl || refFromCookie;
    
    if (ref) {
      setReferralCode(ref);
      toast.success(`🎉 You were referred by code: ${ref}`, {
        duration: 5000,
        icon: '🎁',
      });
      
      // Clear the cookie after reading
      document.cookie = 'referral_code_client=; max-age=0; path=/';
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual registration
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        referralCode 
          ? 'Registration successful! Referrer will get bonus points after your first pickup!' 
          : 'Registration successful!'
      );
      router.push('/user/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1976D2] to-[#0D47A1] flex items-center justify-center p-4">
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-white hover:text-gray-200 flex items-center gap-2"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#1976D2]">Create Account</CardTitle>
          <CardDescription>
            Step {step} of 2: {step === 1 ? 'Personal Information' : 'Address & Preferences'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Referral Banner - Shows if there's a referral code */}
          {referralCode && step === 1 && (
            <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <GiftIcon className="w-6 h-6" />
                <div>
                  <p className="font-medium">You were referred by someone!</p>
                  <p className="text-sm opacity-90">Code: <span className="font-bold">{referralCode}</span></p>
                  <p className="text-xs mt-1">You'll both get bonus points after your first pickup</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="0803 123 4567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                {/* Hidden field to pass referral code to backend */}
                {referralCode && (
                  <input type="hidden" name="referralCode" value={referralCode} />
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home Address
                  </label>
                  <Input
                    placeholder="12, Adebayo Street, Lekki Phase 1"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['sms', 'whatsapp', 'both'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        className={`p-2 rounded-lg border text-sm capitalize ${
                          formData.preferredContact === method
                            ? 'border-[#1976D2] bg-[#1976D2]/10 text-[#1976D2]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📍 You'll get a unique QR code after registration. Print and display it on your bin for easy scanning.
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => setStep(1)}
                  fullWidth
                >
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                isLoading={isLoading}
                fullWidth
              >
                {step === 1 ? 'Continue' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#1976D2] font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}