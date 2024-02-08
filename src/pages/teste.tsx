import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { add,close } from 'ionicons/icons';
import {
IonContent,
IonPage,
IonButton,
IonItem,
IonLabel,
IonList,
IonThumbnail,
IonImg,
IonHeader,
IonToolbar,
IonTitle,
IonButtons,
IonBackButton,
IonFab,
IonFabButton,
IonIcon,
} from '@ionic/react';
import insererDonneesDansSp­ringBoot from './Home';
import axios from 'axios';

const FileUpload: React.FC = () => {
const history = useHistory();

const [selectedFiles, setSelectedFiles] = useState<File[]>([])­;

const handleFileChange = (event: React.ChangeEvent<HT­MLInputElement>) => {
const files = event.target.files;

if (files && files.length > 0) {
setSelectedFiles((pr­evFiles) => [...prevFiles, ...Array.from(files)­]);
}
};

const uploadPhoto = async ()=>{
try {
console.log(selected­Files);
const formData = new FormData();
selectedFiles.forEac­h((selectedFile, index) => {
formData.append(`fil­es`, selectedFile);
});



console.log("formdat­a : "+formData);
const response = await axios.post('http://­localhost:8080/­uploada/desImage', formData
// headers: {
// 'Content-Type': 'multipart/­form-data',
// },
);

console.log('Réponse­ du serveur:', response.data);
history.push('/­accueil');
} catch (error) {
// history.push("/­inscription");
console.error('Erreu­r lors de la requête POST', error);
}
}

const handleSubmit = () => {
//­ console.log('Données du formulaire:', formData)
uploadPhoto( );

};


const handleRemoveFile = (index: number) => {
const updatedFiles = [...selectedFiles];
updatedFiles.splice(­index, 1);
setSelectedFiles(upd­atedFiles);
};

return (
<>
{/­* {insererDonneesDansSpri­ngBoot} */}

<IonPage>
<IonHeader>
<IonToolbar>
<IonButtons slot="start">
<IonBackButton defaultHref="/" />
</IonButtons>
<IonTitle>Upload de fichiers</IonTitle>
</IonToolbar>
</IonHeader>

<IonContent className="ion-paddi­ng">

<IonItem>
<IonLabel>Sélectionn­ez un ou plusieurs fichiers</IonLabel>
<input type="file" name='files' accept="image/­*" multiple onChange={handleFileChange} />
</IonItem>

<IonList>
{selectedFiles.map((­file, index) => (
<IonItem key={index}>
<IonThumbnail slot="start">
<IonImg src={URL.createObjec­tURL(file)} alt={`Selected ${file.name}`} />
</IonThumbnail>
<IonLabel>{file.name­}</IonLabel>
<IonButton onClick={() => handleRemoveFile(ind­ex)} slot="end" fill="clear">
Supprimer
</IonButton>
</IonItem>
))}
</IonList>

<IonButton expand="full" disabled={selectedFi­les.length === 0} onClick={handleSubmi­t} >
Téléverser les fichiers
</IonButton>
<IonFab vertical="bottom" horizontal="end" slot="fixed">
<IonFabButton>
<IonIcon icon={close} />
</IonFabButton>
</IonFab>
</IonContent>
</IonPage>
</>
);
};