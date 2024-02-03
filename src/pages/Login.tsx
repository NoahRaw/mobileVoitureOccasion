import React, { useState } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonRouterLink, IonIcon, IonRow, IonCol } from '@ionic/react';
import { personCircle, mail, lockClosed } from 'ionicons/icons';


interface LoginProps {
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({ setIsConnected }) => {
//const Login: React.FC = ({ setIsConnected }) => {
//Login = ({ setIsConnected }) => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construire l'URL
    const apiUrl = `http://localhost:52195/Utilisateurs/authenticateSimpleUser?login=${email}&pwd=${password}`;
    console.log('API URL:', apiUrl);
    try {
      // Effectuer la requête
      const response = await fetch(apiUrl, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.text();
        const authToken = data; // Assure-toi d'adapter cela à la structure de la réponse du service web
        if (authToken) {
          setToken(authToken);
          localStorage.setItem('authToken', authToken);
          setIsConnected(true);

          console.log('User is connected.');

          //history.push('/home');
        }

        // Stockage dans le localStorage
        console.log(authToken);
      } else {
        console.error('Erreur lors de l\'authentification');
      }
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
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
            Sign up
          </IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
