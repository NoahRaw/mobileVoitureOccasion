// RegisterComponent.tsx

import React, { useState } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonRouterLink} from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { person, mail, lockClosed } from 'ionicons/icons';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Ajoutez ici la logique d'inscription
    console.log(`Register with username: ${username}, email: ${email}, and password: ${password}`);
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
        <IonRouterLink routerLink="/login">
           Login
        </IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
