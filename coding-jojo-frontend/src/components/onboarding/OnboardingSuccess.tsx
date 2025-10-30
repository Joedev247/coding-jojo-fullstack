import React from 'react';
import { CheckCircle, Sparkles, Target, Users } from 'lucide-react';

interface OnboardingSuccessProps {
  userName: string;
  completedSteps: number;
  totalSteps: number;
  onContinue: () => void;
}

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({
  userName,
  completedSteps,
  totalSteps,
  onContinue,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white  p-8 max-w-md w-full mx-4 text-center">
        <div className="relative mb-6">
          {/* Success animation */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle className="w-10 h-10 text-green-600" />
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-75"></div>
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce" />
          </div>
          <div className="absolute top-4 right-8">
            <Sparkles className="w-4 h-4 text-purple-400 animate-bounce delay-300" />
          </div>
          <div className="absolute top-4 left-8">
            <Sparkles className="w-3 h-3 text-blue-400 animate-bounce delay-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome aboard, {userName}! 🎉
        </h2>
        
        <p className="text-gray-600 mb-6">
          You've completed your onboarding and we've personalized your learning experience. 
          You're all set to start your journey!
        </p>

        {/* Progress indicator */}
        <div className="bg-gray-50  p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Profile Setup Complete</span>
            <span className="text-sm font-bold text-green-600">{completedSteps}/{totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-xs text-gray-600">Goals Set</div>
            <div className="text-sm font-semibold text-gray-800">✓</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-xs text-gray-600">Interests</div>
            <div className="text-sm font-semibold text-gray-800">✓</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-xs text-gray-600">Community</div>
            <div className="text-sm font-semibold text-gray-800">✓</div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-indigo-600 text-white py-3  font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Start Learning Now! 🚀
        </button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;