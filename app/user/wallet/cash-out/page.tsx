// app/user/wallet/cash-out/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Banknote,
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Plus,
  Trash2,
  CreditCard,
  Building,
  Smartphone,
  Copy,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatPoints, pointsToNaira } from '@/lib/utils';
import { toast } from 'react-hot-toast';

// Mock data
const mockUser = {
  points: 3450,
  pendingCashouts: [
    {
      id: 'CO001',
      amount: 1000,
      points: 2000,
      status: 'processing',
      requestedAt: new Date('2026-02-20T10:30:00'),
      estimatedCompletion: new Date('2026-02-21T10:30:00'),
      bank: 'GTBank',
      accountNumber: '****1234'
    }
  ],
  savedBanks: [
    {
      id: 'B001',
      bankName: 'GTBank',
      accountName: 'John Doe',
      accountNumber: '0123456789',
      isDefault: true
    },
    {
      id: 'B002',
      bankName: 'Access Bank',
      accountName: 'John Doe',
      accountNumber: '9876543210',
      isDefault: false
    }
  ]
};

const banks = [
  'Access Bank', 'Citibank', 'Ecobank', 'Fidelity Bank', 'First Bank',
  'FCMB', 'GTBank', 'Heritage Bank', 'Keystone Bank', 'Providus Bank',
  'Polaris Bank', 'Stanbic IBTC', 'Standard Chartered', 'Sterling Bank',
  'Suntrust Bank', 'Union Bank', 'United Bank for Africa', 'Unity Bank',
  'Wema Bank', 'Zenith Bank'
];

export default function CashOutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isNewBank, setIsNewBank] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const points = mockUser.points;
  const minCashout = 500; // ₦500 minimum
  const maxCashout = pointsToNaira(points); // Maximum based on points

  const pointsAmount = Math.floor(parseFloat(amount) || 0) * 2;
  const isValidAmount = parseFloat(amount) >= minCashout && parseFloat(amount) <= maxCashout;

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleVerifyAccount = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setAccountName('JOHN DOE');
      toast.success('Account verified successfully');
    }, 1500);
  };

  const handleSubmit = () => {
    if (step === 1) {
      if (!isValidAmount) {
        toast.error(`Minimum cashout is ₦${minCashout}`);
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
      return;
    }

    if (step === 2) {
      if (!selectedBank && !isNewBank) {
        toast.error('Please select a bank account');
        return;
      }
      if (isNewBank && (!accountNumber || !accountName)) {
        toast.error('Please enter bank details');
        return;
      }
      setStep(3);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Cashout request submitted successfully!');
      router.push('/user/wallet');
    }, 2000);
  };

  const presetAmounts = [1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/user/wallet">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Cash Out Points</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-4 max-w-md mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? 'bg-[#1976D2] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    i < step ? 'bg-[#1976D2]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
        {/* Balance Card */}
        <Card className="mb-6 bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Available Balance</p>
                <p className="text-3xl font-bold">{formatPoints(points)} pts</p>
                <p className="text-sm opacity-75 mt-1">≈ ₦{pointsToNaira(points)}</p>
              </div>
              <Wallet className="w-12 h-12 opacity-75" />
            </div>
          </CardContent>
        </Card>

        {step === 1 && (
          <>
            {/* Amount Input */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Enter Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount in Naira (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₦
                    </span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-8 text-2xl font-bold"
                      min={minCashout}
                      max={maxCashout}
                    />
                  </div>
                  {amount && (
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        You'll receive: <span className="font-medium">₦{parseFloat(amount || '0').toFixed(2)}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        Points deducted: <span className="font-medium text-purple-600">{pointsAmount} pts</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Preset Amounts */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Quick select</p>
                  <div className="grid grid-cols-2 gap-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          parseFloat(amount) === preset
                            ? 'border-[#1976D2] bg-[#1976D2]/10 text-[#1976D2]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleAmountSelect(preset)}
                      >
                        <p className="font-medium">₦{preset.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{preset * 2} pts</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Limits Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Cashout Limits:</p>
                      <ul className="space-y-1">
                        <li>• Minimum: ₦{minCashout} ({minCashout * 2} pts)</li>
                        <li>• Maximum: ₦{maxCashout} ({points} pts)</li>
                        <li>• Processing time: 24 hours</li>
                        <li>• Rate: 2 points = ₦1</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pending Cashouts */}
                {mockUser.pendingCashouts.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Pending Cashouts</p>
                    {mockUser.pendingCashouts.map((cashout) => (
                      <div key={cashout.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">₦{cashout.amount}</span>
                          <Badge variant="warning">Processing</Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          Expected by {cashout.estimatedCompletion.toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {step === 2 && (
          <>
            {/* Bank Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Bank Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Saved Banks */}
                {!isNewBank && (
                  <div className="space-y-3">
                    {mockUser.savedBanks.map((bank) => (
                      <button
                        key={bank.id}
                        className={`w-full p-4 rounded-lg border text-left transition-colors ${
                          selectedBank === bank.id
                            ? 'border-[#1976D2] bg-[#1976D2]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedBank(bank.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{bank.bankName}</span>
                          </div>
                          {bank.isDefault && (
                            <Badge variant="success">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{bank.accountName}</p>
                        <p className="text-sm font-mono text-gray-500">{bank.accountNumber}</p>
                      </button>
                    ))}

                    <button
                      className="w-full p-4 rounded-lg border border-dashed border-gray-300 hover:border-[#1976D2] transition-colors flex items-center justify-center gap-2"
                      onClick={() => setIsNewBank(true)}
                    >
                      <Plus className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Add New Bank Account</span>
                    </button>
                  </div>
                )}

                {/* New Bank Form */}
                {isNewBank && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Add New Bank Account</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsNewBank(false)}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Select Bank</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        value={selectedBank || ''}
                        onChange={(e) => setSelectedBank(e.target.value)}
                      >
                        <option value="">Choose a bank</option>
                        {banks.map((bank) => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Account Number</label>
                      <div className="flex gap-2">
                        <Input
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="10 digit account number"
                          maxLength={10}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleVerifyAccount}
                          isLoading={verifying}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>

                    {accountName && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-700">✓ Account verified: {accountName}</p>
                      </div>
                    )}

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-700">
                        Please ensure account details are correct. Wrong details may result in lost funds.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Cashout Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold">₦{parseFloat(amount || '0').toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points to deduct:</span>
                    <span className="font-bold text-purple-600">{pointsAmount} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining balance:</span>
                    <span className="font-bold">{points - pointsAmount} pts</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600">You'll receive:</span>
                    <span className="text-xl font-bold text-green-600">₦{parseFloat(amount || '0').toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {step === 3 && (
          <>
            {/* Confirmation */}
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Your cashout request has been received and is being processed.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold">₦{parseFloat(amount || '0').toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Points used:</span>
                      <span className="font-bold text-purple-600">{pointsAmount} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-bold">{selectedBank ? mockUser.savedBanks.find(b => b.id === selectedBank)?.bankName : 'New Bank'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-mono text-sm">CO-{Date.now()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Clock className="w-4 h-4" />
                  <span>Expected completion: Within 24 hours</span>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  onClick={() => router.push('/user/wallet')}
                >
                  Done
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Bottom Actions */}
        {step < 3 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="container mx-auto max-w-2xl">
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                {step === 1 ? 'Continue to Bank Selection' : 'Confirm Cashout'}
              </Button>
              {step > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  fullWidth
                  onClick={() => setStep(step - 1)}
                  className="mt-2"
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}