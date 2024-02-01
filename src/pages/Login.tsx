import React, { useState } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle , IonRouterLink } from '@ionic/react';
import { IonIcon, IonRow, IonCol} from '@ionic/react';
import { person, mail, lockClosed, personCircle} from 'ionicons/icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Ajoutez ici la logique de connexion
    console.log(` email: ${email} and password: ${password}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

      <IonRow>
        <IonCol style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IonIcon 
            style={{ fontSize: "70px", color: "#0040ff" }}
            icon={personCircle}
          />
        </IonCol>
      </IonRow>

      
      <IonLabel position="stacked">
        <IonIcon icon={mail} /> Email
        </IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        <IonLabel position="stacked">
          <IonIcon icon={lockClosed} /> Password
        </IonLabel>
        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        
        <p className="ion-text-center">
        Don't have an account?{' '}
        <IonRouterLink routerLink="/register">
          Sing up
        </IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
