// app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    preferredContact: 'whatsapp' as 'sms' | 'whatsapp' | 'both',
  });

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
      toast.success('Registration successful!');
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