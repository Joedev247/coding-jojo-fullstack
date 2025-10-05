import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test to verify the frontend-backend field mapping
console.log('🔍 Testing Frontend-Backend Field Mapping Fix');
console.log('===============================================');

const frontendFile = path.join(__dirname, 'coding-jojo-frontend/src/app/instructor/verification/page.tsx');
const backendFile = path.join(__dirname, 'coding-jojo-backend/src/controllers/verificationController.js');

try {
  const frontendContent = fs.readFileSync(frontendFile, 'utf8');
  const backendContent = fs.readFileSync(backendFile, 'utf8');

  // Check if frontend now uses educationCertificate instead of educationVerification
  const frontendMatches = frontendContent.match(/completedSteps\.educationCertificate/g);
  const oldFrontendMatches = frontendContent.match(/completedSteps\.educationVerification/g);
  
  console.log('\n✅ Frontend Changes:');
  console.log(`- Uses educationCertificate field: ${frontendMatches ? frontendMatches.length : 0} times`);
  console.log(`- Old educationVerification field: ${oldFrontendMatches ? oldFrontendMatches.length : 0} times`);

  // Check backend field usage
  const backendMatches = backendContent.match(/completedSteps\.educationCertificate/g);
  
  console.log('\n✅ Backend Verification:');
  console.log(`- Uses educationCertificate field: ${backendMatches ? backendMatches.length : 0} times`);

  // Check if the automatic step 6 jump was removed
  const autoJumpMatch = frontendContent.match(/setCurrentStep\(6\)/g);
  
  console.log('\n✅ Flow Control Fix:');
  console.log(`- Automatic jump to step 6: ${autoJumpMatch ? 'STILL PRESENT ❌' : 'REMOVED ✅'}`);

  // Check steps array
  const stepsArray = frontendContent.match(/const steps: VerificationStep\[\] = \[([\s\S]*?)\];/);
  if (stepsArray) {
    const stepsContent = stepsArray[1];
    const stepCount = (stepsContent.match(/{\s*id:/g) || []).length;
    console.log(`- Total verification steps defined: ${stepCount}`);
  }

  console.log('\n🎯 Expected Behavior After Fix:');
  console.log('- Education certificate upload should update completedSteps.educationCertificate to true');
  console.log('- Frontend should recognize all 6 steps as complete (6/6 instead of 5/5)');
  console.log('- Should not auto-jump to completion step until all steps are truly complete');
  console.log('- Should show "Submit for Review" only when all 6 steps are complete');

} catch (error) {
  console.error('Error reading files:', error.message);
}
