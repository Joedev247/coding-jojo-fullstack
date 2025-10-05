import { toast } from 'sonner';

/**
 * Utility functions for common toast notification patterns
 */

export const toastUtils = {
  // Authentication related toasts
  auth: {
    loginSuccess: (username?: string) => 
      toast.success(`Welcome back${username ? `, ${username}` : ''}!`, {
        description: 'You have been successfully logged in.',
      }),
    
    loginError: (error?: string) => 
      toast.error('Login failed', {
        description: error || 'Please check your credentials and try again.',
      }),
    
    logoutSuccess: () => 
      toast.info('Logged out successfully', {
        description: 'See you next time!',
      }),
    
    signupSuccess: () => 
      toast.success('Account created successfully!', {
        description: 'Welcome to Coding Jojo!',
      }),
    
    passwordChanged: () => 
      toast.success('Password updated', {
        description: 'Your password has been changed successfully.',
      }),
  },

  // Course related toasts
  courses: {
    enrolled: (courseName: string) => 
      toast.success('Enrollment successful!', {
        description: `You've been enrolled in "${courseName}".`,
      }),
    
    completed: (courseName: string) => 
      toast.success('🎉 Course completed!', {
        description: `Congratulations on completing "${courseName}"!`,
      }),
    
    progressSaved: () => 
      toast.info('Progress saved', {
        description: 'Your course progress has been automatically saved.',
        duration: 2000,
      }),
    
    lessonUnlocked: (lessonName: string) => 
      toast.info('New lesson unlocked!', {
        description: `"${lessonName}" is now available.`,
      }),
  },

  // Shopping cart related toasts
  cart: {
    itemAdded: (itemName: string) => 
      toast.success('Added to cart', {
        description: `"${itemName}" has been added to your cart.`,
      }),
    
    itemRemoved: (itemName: string) => 
      toast.info('Removed from cart', {
        description: `"${itemName}" has been removed from your cart.`,
      }),
    
    cleared: () => 
      toast.info('Cart cleared', {
        description: 'All items have been removed from your cart.',
      }),
    
    checkoutSuccess: () => 
      toast.success('Order placed successfully!', {
        description: 'You will receive a confirmation email shortly.',
      }),
  },

  // Payment related toasts
  payment: {
    processing: () => 
      toast.loading('Processing payment...', {
        description: 'Please do not close this window.',
      }),
    
    success: (amount: string) => 
      toast.success('Payment successful!', {
        description: `$${amount} has been charged to your account.`,
      }),
    
    failed: (reason?: string) => 
      toast.error('Payment failed', {
        description: reason || 'Please try again or use a different payment method.',
      }),
  },

  // File operations
  files: {
    uploadStart: (fileName: string) => 
      toast.loading(`Uploading ${fileName}...`),
    
    uploadSuccess: (fileName: string) => 
      toast.success('Upload complete!', {
        description: `"${fileName}" has been uploaded successfully.`,
      }),
    
    uploadError: (fileName: string, error?: string) => 
      toast.error('Upload failed', {
        description: error || `Failed to upload "${fileName}". Please try again.`,
      }),
    
    downloadStart: (fileName: string) => 
      toast.info('Download started', {
        description: `Downloading "${fileName}"...`,
      }),
  },

  // Form operations
  forms: {
    saveSuccess: () => 
      toast.success('Changes saved', {
        description: 'Your changes have been saved successfully.',
      }),
    
    saveError: (error?: string) => 
      toast.error('Save failed', {
        description: error || 'Failed to save changes. Please try again.',
      }),
    
    validationError: (field?: string) => 
      toast.warning('Validation error', {
        description: field ? `Please check the ${field} field.` : 'Please check your input and try again.',
      }),
  },

  // Network related toasts
  network: {
    offline: () => 
      toast.warning('No internet connection', {
        description: 'Some features may not work properly.',
      }),
    
    online: () => 
      toast.success('Connection restored', {
        description: 'You are back online!',
      }),
    
    slowConnection: () => 
      toast.info('Slow connection detected', {
        description: 'Content may take longer to load.',
      }),
  },

  // Generic utility toasts
  general: {
    copied: (text?: string) => 
      toast.success('Copied to clipboard', {
        description: text ? `"${text}" copied to clipboard.` : undefined,
        duration: 2000,
      }),
    
    comingSoon: (feature?: string) => 
      toast.info('Coming soon!', {
        description: feature ? `${feature} will be available soon.` : 'This feature is coming soon.',
      }),
    
    maintenanceMode: () => 
      toast.warning('Maintenance mode', {
        description: 'Some features may be temporarily unavailable.',
      }),
    
    featureUpdated: (feature: string) => 
      toast.info('Feature updated!', {
        description: `${feature} has been improved with new features.`,
      }),
  },
};

export default toastUtils;
