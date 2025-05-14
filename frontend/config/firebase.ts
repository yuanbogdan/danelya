import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDbRufQJg7Gf2u9r30ln2GbjyczuslHTOY",
    authDomain: "danelya-a50c0.firebaseapp.com",
    databaseURL: "https://danelya-a50c0-default-rtdb.firebaseio.com",
    projectId: "danelya-a50c0",
    storageBucket: "danelya-a50c0.appspot.com",
    messagingSenderId: "844000095431",
    appId: "1:844000095431:web:20e7b689e20750bae9a2e2"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация базы данных
export const database = getDatabase(app);

// Проверка инициализации
console.log('Firebase initialized with config:', {
    projectId: firebaseConfig.projectId,
    databaseURL: firebaseConfig.databaseURL
}); 