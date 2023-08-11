const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const dotenv = require("dotenv");

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tweelon.firebaseapp.com",
    projectId: "tweelon",
    storageBucket: "tweelon.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
