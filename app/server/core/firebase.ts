import admin from 'firebase-admin';

// IMPORTANT: Replace with your actual service account credentials
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
