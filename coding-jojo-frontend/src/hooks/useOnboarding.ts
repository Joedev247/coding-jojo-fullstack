import { useState } from 'react';

export interface OnboardingData {
  learningGoals: string[];
  experienceLevel: string;
  interests: string[];
  howDidYouHear: string;
  otherGoal?: string;
  otherInterest?: string;
  otherSource?: string;
}

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    learningGoals: [],
    experienceLevel: "",
    interests: [],
    howDidYouHear: "",
  });

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const resetOnboarding = () => {
    setCurrentStep(0);
    setOnboardingData({
      learningGoals: [],
      experienceLevel: "",
      interests: [],
      howDidYouHear: "",
    });
  };

  // Validation functions
  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return onboardingData.learningGoals.length > 0;
      case 2:
        return onboardingData.experienceLevel !== "";
      case 3:
        return onboardingData.interests.length > 0;
      case 4:
        return onboardingData.howDidYouHear !== "";
      default:
        return true;
    }
  };

  return {
    currentStep,
    onboardingData,
    updateOnboardingData,
    nextStep,
    prevStep,
    goToStep,
    resetOnboarding,
    canProceedFromStep,
    setOnboardingData,
  };
};