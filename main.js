
// main.js
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Sesión cerrada");
      window.location.href = "logininternohub.html"; // Redirecciona
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});

