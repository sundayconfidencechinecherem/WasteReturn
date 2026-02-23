// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - replace with actual auth
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
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
          <CardTitle className="text-2xl text-[#1976D2]">Welcome Back!</CardTitle>
          <CardDescription>
            Login to your WasteReturn account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-[#1976D2]" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-[#1976D2] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-[#1976D2] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" fullWidth>
                📱 USSD
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                🔐 OTP
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}