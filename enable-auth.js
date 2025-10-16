const { execSync } = require('child_process');

console.log('🔐 Enabling Firebase Authentication...\n');

console.log('📋 Steps to enable Email/Password Authentication:');
console.log('');
console.log('1. Open your Firebase Console:');
console.log('   https://console.firebase.google.com/project/rahbar-dcd4a/authentication');
console.log('');
console.log('2. Click "Get Started" (if first time) or "Sign-in method" tab');
console.log('');
console.log('3. Find "Email/Password" in the providers list');
console.log('');
console.log('4. Click on it and toggle "Enable" to ON');
console.log('');
console.log('5. Click "Save"');
console.log('');
console.log('✅ Authentication will be enabled immediately!');
console.log('');
console.log('Note: Firebase CLI does not support enabling auth providers directly.');
console.log('The Firebase Console is the official way to enable authentication.');
console.log('');
console.log('🚀 Once enabled, your signup will work at: https://rahbar-dcd4a.web.app');

