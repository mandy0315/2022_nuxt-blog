import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
import config from './firebaseConfig.json';

const app = initializeApp(config);

export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);
