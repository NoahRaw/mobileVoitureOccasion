// RegisterComponent.tsx

import React, { useState } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonRouterLink} from '@ionic/react';
import { IonIcon , IonImg} from '@ionic/react';
import { person, mail, lockClosed } from 'ionicons/icons';

import {IonItem} from '@ionic/react';

interface InternalValues {
  file: any;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  //pour upload
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (fileChangeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = fileChangeEvent.target.files?.[0];
  
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  

  const submitForm = async () => {
    if (!file) {
      return;
    }
    setLoading(true);

    const formData = new FormData();

    formData.append('photo', file, file.name);

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    } finally {
      setLoading(false);
    }
  };


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
        {/* upload */}
        <IonItem>
          <input type="file" onChange={(ev) => onFileChange(ev)} />
        </IonItem>
        <IonButton color="primary" expand="full" onClick={() => submitForm()} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </IonButton>
        {/* upload */}

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
