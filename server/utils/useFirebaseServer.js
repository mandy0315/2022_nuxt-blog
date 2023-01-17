import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

export default function () {
  const config = useRuntimeConfig();
  let app = '';
  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert({
        type: config.FIREBASE_TYPE,
        project_id: config.FIREBASE_PROJECT_ID,
        private_key_id: config.FIREBASE_PRIVATE_KEY_ID,
        private_key: config.FIREBASE_PRIVATE_KEY,
        client_email: config.FIREBASE_CLIENT_EMAIL,
        client_id: config.FIREBASE_CLIENT_ID,
        auth_uri: config.FIREBASE_AUTH_URI,
        token_uri: config.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: config.FIREBASE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: config.FIREBASE_CLIENT_CERT_URL
      }),
      databaseURL: config.FIREBASE_DATABASE_URL
    });
  }

  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();
  return { db, storage, auth };
}
