import { initializeApp } from 'firebase/app';

// TODO: Replace with your actual firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyAE8miqVSulSQzXVzv9IMj5R3B0fcXGrrQ",
  authDomain: "ilytatgarden.firebaseapp.com",
  projectId: "ilytatgarden",
  storageBucket: "ilytatgarden.firebasestorage.app",
  messagingSenderId: "602001760221",
  appId: "1:602001760221:web:b297e2fe165a9067d32034",
  measurementId: "G-2K4NP92Z99"
};

const app = initializeApp(firebaseConfig);

export default app;