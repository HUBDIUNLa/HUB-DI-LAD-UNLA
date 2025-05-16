
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Configuración de tu app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBc79auXZDrGI1LjEv3uxZZeFP6nmk5Iw", // tu API key aquí
  authDomain: "interno-hub.firebaseapp.com",
  projectId: "interno-hub",
  storageBucket: "interno-hub.appspot.com", // corregido: debe terminar en .appspot.com
  messagingSenderId: "810981623575",
  appId: "1:810981623575:web:2dd4eeed6c5a66115c9952",
  measurementId: "G-ZHG0BJL800"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };








