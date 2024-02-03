// RegisterComponent.tsx

import React, { useState } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonRouterLink} from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { person, mail, lockClosed } from 'ionicons/icons';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleRegister = () => {
  //   // Ajoutez ici la logique d'inscription
  //   console.log(`Register with username: ${username}, email: ${email}, and password: ${password}`);
  // };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `http://localhost:52195/Utilisateurs`;
    console.log('API URL:', apiUrl);
    try {
      // Effectuer la requête
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indiquer que le corps de la requête est du JSON
        },
        body: JSON.stringify({
          nomutilisateur: username,
          email: email,
          mdp: password,
          etat: 0
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Si votre API renvoie du JSON, utilisez response.json() plutôt que response.text()
        console.log('Registration successful:', data);
        // Gérer la réponse de l'API comme nécessaire
      } else {
        console.error('Registration failed:', response.status);
        // Gérer l'échec de l'inscription ici
      }
    
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonLabel position="stacked">

        <IonIcon icon={person} /> Username
        </IonLabel>
        <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)} />

        <IonLabel position="stacked">
        <IonIcon icon={mail} /> Email
        </IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        <IonLabel position="stacked">
          <IonIcon icon={lockClosed} /> Password
        </IonLabel>
        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />

        <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton>
        <p className="ion-text-center">
        Already an account?{' '}
        <IonRouterLink routerLink="/">
           Login
        </IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
