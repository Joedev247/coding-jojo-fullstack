// Quick test to verify onboarding flags are working correctly
console.log('=== ONBOARDING DEBUG CHECKER ===');
console.log('needs_onboarding:', localStorage.getItem('needs_onboarding'));
console.log('onboarding_completed:', localStorage.getItem('onboarding_completed'));
console.log('Current pathname:', window.location.pathname);

// Clear flags for testing (uncomment to reset)
// localStorage.removeItem('needs_onboarding');
// localStorage.removeItem('onboarding_completed');
// console.log('Flags cleared!');