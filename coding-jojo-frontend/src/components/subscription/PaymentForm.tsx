import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface PaymentFormProps {
  paymentMethod: "card" | "momo";
  pricing: {
    price: number | string;
    totalPrice: number;
    billingPeriod: string;
  };
  onPayment: (paymentData: any) => void;
  isProcessing: boolean;
  planType: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  pricing,
  onPayment,
  isProcessing,
  planType,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    phoneNumber: "",
    momoPin: "",
    country: "CM",
    agreeToTerms: false,
  });

  const [showCvv, setShowCvv] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const formatPhoneNumber = (value: string) => {
    const v = value.replace(/\D/g, "");
    let formatted = "";
    if (v.length > 0) formatted = v.substring(0, 3);
    if (v.length > 3) formatted += " " + v.substring(3, 6);
    if (v.length > 6) formatted += " " + v.substring(6, 9);
    return formatted;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    if (paymentMethod === "card") {
      if (!formData.cardName)
        newErrors.cardName = "Cardholder name is required";
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
    } else {
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";
      if (!formData.momoPin) newErrors.momoPin = "Mobile Money PIN is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onPayment({
      ...formData,
      paymentMethod,
      planType,
      amount: pricing.totalPrice,
    });
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const isEnterprisePlan = planType === "enterprise";

  if (isEnterprisePlan) {
    return (
      <div className="text-center py-6">
        <div className="bg-pink-500/10 border border-pink-500/20 p-4 max-w-xs mx-auto ">
          <h3 className="text-lg font-bold text-white mb-2">Enterprise Plan</h3>
          <p className="text-gray-300 mb-3 text-sm">
            Contact our sales team for custom pricing.
          </p>
          <button className="w-full py-2 px-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium transition-all duration-300 text-sm">
            Contact Sales Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4   bg-gray-900/70 p-4 shadow-xl border border-pink-500/10 mx-auto"
      style={{ maxWidth: 450, minWidth: 0, width: "100%" }}
    >
      {/* Personal Information */}
      <div>
        <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-pink-500" />
          Personal Info
        </h3>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              autoComplete="given-name"
              onChange={handleInputChange}
              className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs ${
                errors.firstName ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              autoComplete="family-name"
              onChange={handleInputChange}
              className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs ${
                errors.lastName ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="Last Name"
            />
          </div>
          {(errors.firstName || errors.lastName) && (
            <div className="grid grid-cols-2 gap-2">
              {errors.firstName && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-2 h-2" />
                  Required
                </p>
              )}
              {errors.lastName && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-2 h-2" />
                  Required
                </p>
              )}
            </div>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            autoComplete="email"
            onChange={handleInputChange}
            className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs ${
              errors.email ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-2 h-2" />
              Required
            </p>
          )}
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
          {paymentMethod === "card" ? (
            <CreditCard className="w-4 h-4 text-pink-500" />
          ) : (
            <Smartphone className="w-4 h-4 text-yellow-500" />
          )}
          {paymentMethod === "card" ? "Card Details" : "MoMo Details"}
        </h3>
        {paymentMethod === "card" ? (
          <div className="space-y-2">
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              autoComplete="cc-name"
              onChange={handleInputChange}
              className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs ${
                errors.cardName ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="Cardholder Name"
            />
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              autoComplete="cc-number"
              maxLength={19}
              className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs ${
                errors.cardNumber ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="1234 5678 9012 3456"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
                maxLength={5}
                autoComplete="cc-exp"
                className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 text-xs ${
                  errors.expiryDate ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="MM/YY"
              />
              <div className="relative">
                <input
                  type={showCvv ? "text" : "password"}
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength={4}
                  autoComplete="cc-csc"
                  className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 pr-6 text-xs ${
                    errors.cvv ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="CVV"
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  tabIndex={-1}
                >
                  {showCvv ? (
                    <EyeOff className="w-3 h-3" />
                  ) : (
                    <Eye className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex">
              <span className="inline-flex items-center px-2 bg-yellow-500/20 border border-r-0 border-yellow-500/30 text-yellow-600 text-xs font-semibold">
                +237
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputMode="numeric"
                maxLength={11}
                className={`flex-1 px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 border-yellow-500/30 text-xs`}
                placeholder="6XX XXX XXX"
              />
            </div>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                name="momoPin"
                value={formData.momoPin}
                onChange={handleInputChange}
                maxLength={5}
                inputMode="numeric"
                className={`w-full px-2 py-3  bg-gray-900 border text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 pr-6 text-xs ${
                  errors.momoPin ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="MoMo PIN"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                tabIndex={-1}
              >
                {showPin ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
              </button>
            </div>
            <div className="bg-yellow-50/90 border border-yellow-300/30 p-1.5 text-xs text-yellow-700">
              <span className="font-bold">Note:</span> SMS confirmation
              required.
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="pt-1">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-0.5 w-3 h-3 text-pink-500  bg-gray-900 border-gray-600 focus:ring-pink-500 rounded"
          />
          <span className="text-xs text-gray-300">
            I agree to the{" "}
            <a href="/terms" className="text-pink-400 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-pink-400 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-2 h-2" />
            Required
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-2.5 px-4 font-semibold text-white text-sm transition-all duration-300 shadow-lg ${
          isProcessing
            ? "bg-gray-600 cursor-not-allowed"
            : paymentMethod === "momo"
            ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
            : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500"
        }`}
      >
        {" "}
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size="xs" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Pay ${pricing.totalPrice.toFixed(2)}
          </div>
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
