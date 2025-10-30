'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Bitcoin,
  Shield,
  Check,
  AlertCircle,
  Loader2,
  Copy,
  QrCode,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { paymentService, PaymentMethod, PaymentIntent, CryptoPayment } from '../../services/paymentService';
import { useToast } from '../../contexts/ToastContext';

interface PaymentGatewayProps {
  courseId?: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  onError: (error: string) => void;
  onCancel?: () => void;
}

export default function PaymentGateway({
  courseId,
  subscriptionId,
  amount,
  currency,
  onSuccess,
  onError,
  onCancel
}: PaymentGatewayProps) {
  const { success: showSuccess, error: showError } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'select' | 'process' | 'confirm'>('select');
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [cryptoPayment, setCryptoPayment] = useState<CryptoPayment | null>(null);

  // Mobile Money Form
  const [mobileMoneyData, setMobileMoneyData] = useState({
    phoneNumber: '',
    provider: 'mtn' as 'mtn' | 'orange'
  });

  // Bank Transfer Form
  const [bankTransferData, setBankTransferData] = useState({
    bankCode: '',
    accountName: ''
  });

  // Card Form (for new cards)
  const [cardData, setCardData] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    name: ''
  });

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const response = await paymentService.getPaymentMethods();
      if (response.success) {
        setPaymentMethods(response.data);
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    }
  };

  const handlePaymentMethodSelect = (methodType: string) => {
    setSelectedMethod(methodType);
  };

  const processPayment = async () => {
    if (!selectedMethod) {
      showError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setCurrentStep('process');

    try {
      let response;

      switch (selectedMethod) {
        case 'card':
          response = await processCardPayment();
          break;
        case 'mobile_money':
          response = await processMobileMoneyPayment();
          break;
        case 'bank_transfer':
          response = await processBankTransferPayment();
          break;
        case 'crypto':
          response = await processCryptoPayment();
          break;
        default:
          throw new Error('Unsupported payment method');
      }

      if (response.success) {
        setPaymentIntent(response.data);
        setCurrentStep('confirm');
        
        // For instant payment methods like cards, call success immediately
        if (selectedMethod === 'card' && response.data.status === 'succeeded') {
          onSuccess(response.data);
        }
      } else {
        throw new Error(response.message || 'Payment failed');
      }
    } catch (error: any) {
      showError(error.message || 'Payment processing failed');
      onError(error.message);
      setCurrentStep('select');
    } finally {
      setIsProcessing(false);
    }
  };

  const processCardPayment = async () => {
    return await paymentService.createStripePaymentIntent({
      amount,
      currency,
      courseId,
      subscriptionId
    });
  };

  const processMobileMoneyPayment = async () => {
    if (!mobileMoneyData.phoneNumber) {
      throw new Error('Please enter your phone number');
    }

    return await paymentService.initiateMobileMoneyPayment({
      phoneNumber: mobileMoneyData.phoneNumber,
      amount,
      currency,
      provider: mobileMoneyData.provider,
      courseId,
      subscriptionId
    });
  };

  const processBankTransferPayment = async () => {
    if (!bankTransferData.bankCode) {
      throw new Error('Please select a bank');
    }

    return await paymentService.initiateBankTransfer({
      amount,
      currency,
      bankCode: bankTransferData.bankCode,
      courseId,
      subscriptionId
    });
  };

  const processCryptoPayment = async () => {
    const response = await paymentService.initiateCryptoPayment({
      amount,
      currency: 'USDT', // Default to USDT for stability
      courseId,
      subscriptionId
    });

    if (response.success) {
      setCryptoPayment(response.data);
    }

    return response;
  };

  const checkPaymentStatus = async () => {
    if (!paymentIntent) return;

    try {
      let response;
      
      if (selectedMethod === 'mobile_money') {
        response = await paymentService.checkMobileMoneyStatus(paymentIntent.id);
      } else if (selectedMethod === 'crypto') {
        response = await paymentService.checkCryptoPaymentStatus(cryptoPayment?.address || '');
      }

      if (response?.success && response.data.status === 'succeeded') {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess('Copied to clipboard');
  };

  const paymentMethodOptions = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      supported: true
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      description: 'MTN Mobile Money, Orange Money',
      icon: Smartphone,
      supported: true
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Building,
      supported: true
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, USDT, USDC',
      icon: Bitcoin,
      supported: true
    }
  ];

  const cameroonBanks = [
    { code: 'CBC', name: 'Commercial Bank Cameroon' },
    { code: 'ECOBANK', name: 'Ecobank Cameroon' },
    { code: 'UBA', name: 'United Bank for Africa' },
    { code: 'AFRILAND', name: 'Afriland First Bank' },
    { code: 'SGBC', name: 'Société Générale Cameroon' }
  ];

  if (currentStep === 'process') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Processing Payment</h3>
        <p className="text-gray-400">Please wait while we process your payment...</p>
      </div>
    );
  }

  if (currentStep === 'confirm') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Payment Instructions</h3>
        </div>

        {selectedMethod === 'mobile_money' && paymentIntent && (
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 ">
              <h4 className="font-medium text-white mb-2">Mobile Money Payment</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">1. Dial *126# on your {mobileMoneyData.provider.toUpperCase()} line</p>
                <p className="text-gray-300">2. Select "Transfer Money"</p>
                <p className="text-gray-300">3. Enter merchant code: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{paymentIntent.reference}</span></p>
                <p className="text-gray-300">4. Enter amount: <span className="font-semibold">{paymentService.formatAmount(amount, currency)}</span></p>
              </div>
            </div>
            
            {paymentIntent.qrCode && (
              <div className="text-center">
                <img src={paymentIntent.qrCode} alt="QR Code" className="mx-auto mb-2" />
                <p className="text-sm text-gray-400">Or scan this QR code with your mobile money app</p>
              </div>
            )}

            <button
              onClick={checkPaymentStatus}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white "
            >
              <RefreshCw className="h-4 w-4" />
              <span>Check Payment Status</span>
            </button>
          </div>
        )}

        {selectedMethod === 'crypto' && cryptoPayment && (
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 ">
              <h4 className="font-medium text-white mb-2">Cryptocurrency Payment</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Wallet Address:</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 bg-gray-700 p-2 rounded text-xs text-white font-mono break-all">
                      {cryptoPayment.address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cryptoPayment.address)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Amount:</label>
                  <p className="text-white font-semibold">{cryptoPayment.amount} {cryptoPayment.currency}</p>
                </div>

                <div className="text-center">
                  <img src={cryptoPayment.qrCode} alt="Crypto QR Code" className="mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Scan with your crypto wallet</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Confirmations: {cryptoPayment.confirmations}/{cryptoPayment.required_confirmations}
                  </p>
                  {cryptoPayment.explorerUrl && (
                    <a
                      href={cryptoPayment.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-pink-400 hover:text-pink-300 text-sm mt-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View on Explorer</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={checkPaymentStatus}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white "
            >
              <RefreshCw className="h-4 w-4" />
              <span>Check Payment Status</span>
            </button>
          </div>
        )}

        {selectedMethod === 'bank_transfer' && paymentIntent && (
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 ">
              <h4 className="font-medium text-white mb-2">Bank Transfer Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Name:</span>
                  <span className="text-white">Coding Jojo Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Number:</span>
                  <span className="text-white font-mono">1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bank:</span>
                  <span className="text-white">Commercial Bank Cameroon</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reference:</span>
                  <span className="text-white font-mono">{paymentIntent.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-semibold">{paymentService.formatAmount(amount, currency)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 ">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-yellow-300 font-medium">Important:</p>
                  <p className="text-yellow-200">Please include the reference number in your transfer description.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300  hover:bg-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => setCurrentStep('select')}
            className="flex-1 px-4 py-2 bg-gray-700 text-white  hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900  overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Payment</h2>
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400">Secure</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total Amount:</span>
            <span className="text-2xl font-bold text-white">
              {paymentService.formatAmount(amount, currency)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white">Select Payment Method</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {paymentMethodOptions.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  disabled={!method.supported}
                  className={`p-4  border-2 transition-colors ${
                    selectedMethod === method.id
                      ? 'border-pink-500 bg-pink-500/10'
                      : method.supported
                        ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                        : 'border-gray-800 bg-gray-800/30 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${
                    selectedMethod === method.id ? 'text-pink-400' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm font-medium ${
                    selectedMethod === method.id ? 'text-pink-300' : 'text-gray-300'
                  }`}>
                    {method.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                </button>
              );
            })}
          </div>

          {/* Payment Method Forms */}
          {selectedMethod === 'mobile_money' && (
            <div className="space-y-4 p-4 bg-gray-800/50 ">
              <h4 className="font-medium text-white">Mobile Money Details</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Provider</label>
                <div className="grid grid-cols-2 gap-2">
                  {['mtn', 'orange'].map((provider) => (
                    <button
                      key={provider}
                      onClick={() => setMobileMoneyData(prev => ({ ...prev, provider: provider as 'mtn' | 'orange' }))}
                      className={`p-3  border ${
                        mobileMoneyData.provider === provider
                          ? 'border-pink-500 bg-pink-500/10 text-pink-300'
                          : 'border-gray-600 bg-gray-700 text-gray-300'
                      }`}
                    >
                      {provider === 'mtn' ? 'MTN' : 'Orange'} Money
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={mobileMoneyData.phoneNumber}
                  onChange={(e) => setMobileMoneyData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="6XXXXXXXX"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          )}

          {selectedMethod === 'bank_transfer' && (
            <div className="space-y-4 p-4 bg-gray-800/50 ">
              <h4 className="font-medium text-white">Bank Transfer Details</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Bank</label>
                <select
                  value={bankTransferData.bankCode}
                  onChange={(e) => setBankTransferData(prev => ({ ...prev, bankCode: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Choose your bank</option>
                  {cameroonBanks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={processPayment}
          disabled={!selectedMethod || isProcessing}
          className={`w-full mt-6 px-6 py-3  font-medium transition-colors ${
            selectedMethod && !isProcessing
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            `Pay ${paymentService.formatAmount(amount, currency)}`
          )}
        </button>
      </div>
    </div>
  );
}
