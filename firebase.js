import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { firebaseConfig, recaptchaSiteKey } from "./keys.js";

// Firebase config imported from keys.js

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize App Check for maximum security
if (typeof window !== 'undefined') {
  try {
    console.log('Initializing Firebase App Check with site key:', recaptchaSiteKey);
    
    // Initialize App Check
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true
    });
    
    console.log('Firebase App Check initialized successfully');
    window.firebaseAppCheck = appCheck;
    
    // Ensure Firestore uses this App Check instance
    // Firestore will automatically use App Check tokens when the instance is available
    
    // Wait for App Check to be fully ready before allowing Firestore operations
    const waitForAppCheck = async () => {
      try {
        const { getToken } = await import('firebase/app-check');
        const token = await getToken(appCheck, false);
        console.log('App Check token ready:', token ? 'Yes' : 'No');
        
        if (token && token.token) {
          console.log('Firebase App Check is fully ready for Firestore operations');
          // Initialize Firestore now that App Check is ready
          initializeFirestore();
          window.firebaseAppCheckReady = true;
          window.dispatchEvent(new CustomEvent('firebaseAppCheckReady'));
        } else {
          console.error('App Check token not available');
          // Retry after a delay
          setTimeout(waitForAppCheck, 2000);
        }
      } catch (error) {
        console.error('App Check token generation failed:', error);
        // Retry after a delay
        setTimeout(waitForAppCheck, 2000);
      }
    };
    
    // Start the App Check readiness check
    setTimeout(waitForAppCheck, 1000);
    
  } catch (error) {
    console.error('Failed to initialize Firebase App Check:', error);
  }
}

// Configure Google provider for better OAuth experience
provider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

// Initialize Firestore - we'll create it after App Check is ready
let firestore = null;

// Create Firestore instance after App Check is ready
const initializeFirestore = () => {
  if (!firestore) {
    // Create Firestore instance - it should automatically use App Check tokens
    // when the App Check instance is available on the same Firebase app
    firestore = getFirestore(app);
    console.log('Firestore initialized with App Check support');
    
    // Verify App Check is properly associated
    if (window.firebaseAppCheck) {
      console.log('App Check instance is available for Firestore');
      
      // Test token generation
      import('firebase/app-check').then(({ getToken }) => {
        getToken(window.firebaseAppCheck).then((token) => {
          console.log('App Check token test for Firestore:', token ? 'Success' : 'Failed');
          if (token) {
            console.log('Token length:', token.token.length);
          }
        }).catch((error) => {
          console.error('App Check token test failed:', error);
        });
      });
    } else {
      console.warn('App Check instance not available for Firestore');
    }
  }
  return firestore;
};

// Export getter for firestore to ensure it's initialized with App Check
export const getFirestoreInstance = () => initializeFirestore();

export { auth, provider, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail, app };
export default app;
