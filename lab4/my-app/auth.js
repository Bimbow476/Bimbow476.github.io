// auth.js
import { auth, db } from './src/firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Реєстрація
document.getElementById('register-button').addEventListener('click', async () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Збереження додаткової інформації про користувача у Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date()
    });
    alert('Реєстрація успішна!');
  } catch (error) {
    alert(`Помилка реєстрації: ${error.message}`);
  }
});

// Вхід
document.getElementById('login-button').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Вхід успішний!');
  } catch (error) {
    alert(`Помилка входу: ${error.message}`);
  }
});

// Вихід
document.getElementById('logout-button').addEventListener('click', async () => {
  try {
    await signOut(auth);
    alert('Вихід успішний!');
  } catch (error) {
    alert(`Помилка виходу: ${error.message}`);
  }
});

// Відстеження стану автентифікації
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';
    document.getElementById('user-email').textContent = user.email;
  } else {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
  }
});
