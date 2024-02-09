// RegisterComponent.tsx

import React, { useState,  useEffect} from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonRouterLink} from '@ionic/react';
import { IonIcon , IonImg} from '@ionic/react';
import { person, mail, lockClosed } from 'ionicons/icons';

import {IonItem} from '@ionic/react';

interface InternalValues {
  file: any;
}

const Register: React.FC = () => {
  //const [username, setUsername] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  var idutilisateur = 0;
  const [idutilisateur_state, setIdutilisateur_state] = useState(0);
  var nomutilisateur = "";
  const [nomutilisateur_state, setNomutilisateur_state] = useState("");
  var email = "";
  const [email_state,setEmail_state] = useState("");
  var password = "";
  const [password_state,setPassword_state] = useState("");
  var etat = 0;
  const [etat_state, setEtat_state] = useState(0);
  var image = "";
  const [image_state,setImage_state] = useState("im");

  //const [photos, setPhotos] = useState(File);
  const [photos, setPhotos] = useState<File[]>([]);
  //pour upload
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (fileChangeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = fileChangeEvent.target.files?.[0];
  
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if(files){
      const filesArray = Array.from(files); // Convertir FileList en un tableau de File
      setPhotos(prevPhotos => [...prevPhotos, ...filesArray]); 
      console.log(photos);
    }
  };

  useEffect(() => {
    console.log(photos);
  }, [photos]); 
  

  const handleInsertion = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    //photos.forEach((selectedFile, index) => {
      formData.append('files', new Blob(photos,{type: 'multipart/form-data' }));
    //});
    

    const utilisateurRequest = {
      idutilisateur: idutilisateur_state,
      nomutilisateur: nomutilisateur_state,
      email : email_state,
      mdp: password_state,
      etat: etat_state,
      image: image_state
    };

     console.log("idutilisateur : "+idutilisateur_state);
     console.log("nomutilisateur : "+nomutilisateur_state);
     console.log("image : "+image_state);
     console.log("photos : "+photos);




    console.log(utilisateurRequest);
    formData.append('utilisateurRequest', new Blob([JSON.stringify(utilisateurRequest)], { type: 'application/json' }));
    const headers = new Headers();
    headers.append("Authorization", "Bearer "+localStorage.getItem('authToken'));



    try {
      //localStorage.setItem("authToken",'26fe43fb46b3487451b03e018bdf1fc625fadb3ced47397792a23b0a5e1b7c12')
      //console.log(localStorage.getItem('authToken'));
      const response = await fetch('http://localhost:52195/Utilisateurs/createUtilisateur', {                
        method: 'POST',
        body: formData, // Utilisez formData directement comme corps de la requête
        headers : headers
      }); 
  
      if (response.ok) {
        console.log("nety le izy");
      } else {
        console.error('Erreur lors de la soumission des données:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission des données:', error);
    }
  };


  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const apiUrl = `http://localhost:52195/Utilisateurs`;
  //   console.log('API URL:', apiUrl);
  //   try {
  //     // Effectuer la requête
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json', // Indiquer que le corps de la requête est du JSON
  //       },
  //       body: JSON.stringify({
  //         nomutilisateur: username,
  //         email: email,
  //         mdp: password,
  //         etat: 0
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json(); // Si votre API renvoie du JSON, utilisez response.json() plutôt que response.text()
  //       console.log('Registration successful:', data);
  //       // Gérer la réponse de l'API comme nécessaire
  //     } else {
  //       console.error('Registration failed:', response.status);
  //       // Gérer l'échec de l'inscription ici
  //     }
    
  //   } catch (error) {
  //     console.error('Erreur lors de la requête HTTP:', error);
  //   }
  // };

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
        <IonInput type="text" value={nomutilisateur} onIonChange={(e) => setNomutilisateur_state(e.detail.value!)} />

        <IonLabel position="stacked">
        <IonIcon icon={mail} /> Email
        </IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail_state(e.detail.value!)} />
        <IonLabel position="stacked">
        <IonIcon icon={lockClosed} /> Password
        </IonLabel>
        <IonInput type="password" value={password} onIonChange={(e) => setPassword_state(e.detail.value!)} />
        {/* upload */}
        {/* <IonItem>
          <input type="file" onChange={(ev) => onFileChange(ev)} />
        </IonItem> */}
        <IonItem>
          <input type="file" onChange={handleFileChange} multiple />
        </IonItem>


        <IonButton expand="block" onClick={handleInsertion}>
          Create
          </IonButton>
        {/* <IonButton color="primary" expand="full" onClick={() => submitForm()} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </IonButton> */}
        {/* upload */}

        {/* <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton> */}
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
