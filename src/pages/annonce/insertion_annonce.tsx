// RegisterComponent.tsx

import React, { useState,useEffect } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage,  
IonSelect,IonSelectOption,IonList,IonCard,IonCardHeader,
IonCardTitle,IonCardSubtitle} from '@ionic/react';
import { IonIcon} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';


interface InternalValues {
  file: any;
}

const Insertion_annonce: React.FC = () => {
  var idmarque = 0;
  const [idmarque_state, setIdmarque_state] = useState(0);

  var idmodele = 0;
  const [idmodele_state,setIdmodele_state] = useState(0);

  var idcarburant = 0;
  const [idcarburant_state,setIdcarburant_state] = useState(0);

  var idpuissance = 0;
  const [idpuissance_state,setIdpuissance_state] = useState(0);
  
  var idboitedevitesse = 0;
  const [idboitedevitesse_state,setIdboitedevitesse_state] = useState(0);

  var idtypedevehicule = 0;
  const [idtypedevehicule_state,setIdtypedevehicule_state] = useState(0);

  var nbrporte = 0;
  const [nbrporte_state,setNbr_state] = useState(0);

  var puissance = 0;
  const [puissance_state,setPuissance_state] = useState(0);

  var matricule = "";
  const [matricule_state,setMatricule_state] = useState("");


  var kilometrage = 0;
  const [kilometrage_state,setKilometrage_state] = useState(0);

  var prix = 0;
  const[prix_state,setPrix_state] = useState(0);


  const [idvoituredefini,setIdvoituredefini] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  

  const [afficherMarque, setAfficherMarque] = useState(true);
  const [afficherModele, setAfficherModele] = useState(false);
  const [afficherCarburant, setAfficherCarburant] = useState(false);
  const [afficherPuissance, setAfficherPuissance] = useState(false);
  const [afficherBoiteDeVitesse, setAfficherBoiteDeVitesse] = useState(false);
  const [afficherTypeDeVehicule, setAfficherTypeDeVehicule] = useState(false);
  const [afficherNbrPorte, setAfficherNbrPorte] = useState(false);
  const [afficherPuissanceVal, setAfficherPuissanceVal] = useState(false);
  const [afficherMatricule, setAfficherMatricule] = useState(false);
  const [afficherKilometrage, setAfficherKilometrage] = useState(false);
  const [afficherPrix, setAfficherPrix] = useState(false);


  const [dropdownModele,setDropdownModele] = useState([]);
  const [dropdownCarburant,setDropdownCarburant] = useState([]);
  const [dropdownPuissance,setDropdownPuissance] = useState([]);
  const [dropdownBoiteDeVitesse,setDropdownBoiteDeVitesse] = useState([]);
  const [dropdownTypeDeVehicule,setDropdownTypeDeVehicule] = useState([]);
  const [dropdownNbrPorte,setDropdownNbrPorte] = useState([]);

  
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


  const [selectedMarque, setSelectedMarque] = useState('');

  const handleSelectMarque = async (event: CustomEvent) => {
    idmarque = event.detail.value;
    setIdmarque_state(event.detail.value);
    setAfficherMarque(false);
    setAfficherModele(true);
    setIsLoading(true);

            try {

             const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idmarque : idmarque,
                    idmodele : idmodele,
                    idcarburant : idcarburant,
                    idpuissance : idpuissance,
                    idboitedevitesse : idboitedevitesse,
                    idtypedevehicule : idtypedevehicule,
                    nbrporte : nbrporte,
                    puissance : puissance
                }),
              }); 

              if (response.ok) {
                  const options = await response.json();
                  setDropdownModele(options);
              } else {
                console.error('Erreur lors de la soumission des données:', response.statusText);
              }
            } catch (error) {
              console.error('Erreur lors de la soumission des données:', error);
            }finally{
              setIsLoading(false);
            }

  };


  const handleSelectModele = async (event: CustomEvent) => {
    setAfficherModele(false);
    setAfficherCarburant(true);
    setIsLoading(true);

    idmodele = event.detail.value;
    setIdmodele_state(idmodele);
    console.log("marque event : "+idmarque);

    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele,
             idcarburant : idcarburant,
             idpuissance : idpuissance,
             idboitedevitesse : idboitedevitesse,
             idtypedevehicule : idtypedevehicule,
             nbrporte : nbrporte,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
           setDropdownCarburant(options);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
        setIsLoading(false);
     }


  };


  const handleSelectCarburant = async (event: CustomEvent) => {
    setAfficherCarburant(false);
    setAfficherPuissance(true);
    idcarburant = event.detail.value;
    setIdcarburant_state(idcarburant);
    setIsLoading(true);

    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele_state,
             idcarburant : idcarburant,
             idpuissance : idpuissance,
             idboitedevitesse : idboitedevitesse,
             idtypedevehicule : idtypedevehicule,
             nbrporte : nbrporte,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
           setDropdownPuissance(options);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
      setIsLoading(false);
     }

  };



  const handleSelectIdPuissance = async (event: CustomEvent) => {
    setAfficherPuissance(false);
    setAfficherBoiteDeVitesse(true);
    idpuissance = event.detail.value;
    setIdpuissance_state(idpuissance);
    setIsLoading(false);

    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele_state,
             idcarburant : idcarburant_state,
             idpuissance : idpuissance,
             idboitedevitesse : idboitedevitesse,
             idtypedevehicule : idtypedevehicule,
             nbrporte : nbrporte,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
           setDropdownBoiteDeVitesse(options);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
      setIsLoading(false);
     }

  };

  const [selectedBoiteDeVitesse, setSelectedBoiteDeVitesse] = useState('');

  const handleSelectBoiteDeVitesse = async (event: CustomEvent) => {
    setAfficherBoiteDeVitesse(false);
    setAfficherTypeDeVehicule(true);
    idboitedevitesse = event.detail.value;
    setIdboitedevitesse_state(idboitedevitesse);
    setIsLoading(true);

    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele_state,
             idcarburant : idcarburant_state,
             idpuissance : idpuissance_state,
             idboitedevitesse : idboitedevitesse,
             idtypedevehicule : idtypedevehicule,
             nbrporte : nbrporte,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
           setDropdownTypeDeVehicule(options);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
        setIsLoading(false);
     }
  };

  const [selectedIdTypeDeVehicule, setSelectedIdTypeDeVehicule] = useState('');

  const handleSelectTypeDeVehicule = async (event: CustomEvent) => {
    setSelectedIdTypeDeVehicule(event.detail.value);
    setAfficherTypeDeVehicule(false);
    setAfficherNbrPorte(true);
    idtypedevehicule = event.detail.value;
    setIdtypedevehicule_state(idtypedevehicule);
    setIsLoading(true);
    
    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele_state,
             idcarburant : idcarburant_state,
             idpuissance : idpuissance_state,
             idboitedevitesse : idboitedevitesse_state,
             idtypedevehicule : idtypedevehicule,
             nbrporte : nbrporte,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
           setDropdownNbrPorte(options);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
      setIsLoading(false);
     }

  };

  const [selectedNbrPorte, setSelectedNbrPorte] =  useState('');

  const handleSelectNbrPorte = async (event: CustomEvent) => {
    setSelectedNbrPorte(event.detail.value);
    setAfficherNbrPorte(false);
    setAfficherPuissanceVal(true);
    nbrporte = event.detail.value;
    setNbr_state(nbrporte);
    setIsLoading(false);

    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele_state,
             idcarburant : idcarburant_state,
             idpuissance : idpuissance_state,
             idboitedevitesse : idboitedevitesse_state,
             idtypedevehicule : idtypedevehicule_state,
             nbrporte : nbrporte,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
           setDropdownPuissance(options);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
      setIsLoading(false);
     }
  };

  const [selectedPuissance, setSelectedPuissance] = useState('');

  const handleSelectPuissance = async (event: CustomEvent) => {
    setSelectedNbrPorte(event.detail.value);
    setAfficherPuissanceVal(false);
    setAfficherMatricule(true);
    setAfficherKilometrage(true);
    setAfficherPrix(true);
    puissance = event.detail.value;
    setPuissance_state(puissance);
    setIsLoading(true);

    try {

      const response = await fetch(`http://localhost:52195/Voituredefini_view/recherche_colonne_voiture`, {                
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             idmarque : idmarque_state,
             idmodele : idmodele_state,
             idcarburant : idcarburant_state,
             idpuissance : idpuissance_state,
             idboitedevitesse : idboitedevitesse_state,
             idtypedevehicule : idtypedevehicule_state,
             nbrporte : nbrporte_state,
             puissance : puissance
         }),
       }); 

       if (response.ok) {
           const options = await response.json();
          setIdvoituredefini(options[0].idvoituredefini);
       } else {
         console.error('Erreur lors de la soumission des données:', response.statusText);
       }
     } catch (error) {
       console.error('Erreur lors de la soumission des données:', error);
     }finally{
      setIsLoading(false);
     }
  };



  const handleSelectMatricule = (event: CustomEvent) => {
    setMatricule_state(event.detail.value);
  };



  const handleSelectKilometrage = (event: CustomEvent) => {
    setKilometrage_state(event.detail.value);
  };


  const handleSelectPrix = (event: CustomEvent) => {
    setPrix_state(event.detail.value);
  }
  ;

  
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

  const handleRemoveFile = (indexToRemove: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, index) => index !== indexToRemove));
};

  const [dropdownMarque, setDropdownMarque] = useState([]);

    useEffect(() => {
        // Exemple de chargement des options depuis un web service
        const fetchDropdownOptions = async () => {
          try {
            const response = await fetch('http://localhost:52195/Marque');
            if (response.ok) {
              const options = await response.json();
              setDropdownMarque(options);
            } else {
              console.error('Erreur lors de la requête HTTP:', response.statusText);
            }
          } catch (error) {
            console.error('Erreur lors de la requête HTTP:', error);
          }
        };
    
        fetchDropdownOptions();
      }, []);
  

       const handleInsertion = async (e: React.FormEvent) => {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData();
            //photos.forEach((selectedFile, index) => {
              formData.append('files', new Blob(photos,{type: 'multipart/form-data' }));
            //});
            

            const annonceRequest = {
              idvoituredefini: idvoituredefini,
              matricule: matricule_state,
              kilometrage: kilometrage_state,
              prix: prix_state
            };


            console.log(annonceRequest);
            formData.append('annonceRequest', new Blob([JSON.stringify(annonceRequest)], { type: 'application/json' }));
            const headers = new Headers();
            headers.append("Authorization", "Bearer "+localStorage.getItem('authToken'));

            try {
              const response = await fetch('http://localhost:52195/VoitureUtilisateurs/createAnnonce', {                
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
            }finally{
              setIsLoading(false);
            }
          };

          useEffect(() => {
          }, [isLoading]); 
        

  return (
    <IonPage>
      <IonContent className="ion-padding">
      {afficherMarque && (
              <div>
                      <IonLabel position="stacked">
                          <IonIcon/> Marque
                      </IonLabel>
                      <IonSelect aria-label="marque" interface="popover" value={idmarque} placeholder="Select One" onIonChange={handleSelectMarque}>
                          <IonSelectOption value="0">Marque</IonSelectOption>
                          {dropdownMarque.map((option) => (
                              <IonSelectOption value={option.id_marque}>{option.description}</IonSelectOption>
                          ))}
                      </IonSelect>
              </div>
      )}


      {afficherModele && !isLoading && (
                <div>
                      <IonLabel position="stacked">
                          <IonIcon/> Modele
                      </IonLabel>
                      <IonSelect aria-label="marque" interface="popover" value={idmodele} placeholder="Select One" onIonChange={handleSelectModele}>
                          <IonSelectOption value="0">Modele</IonSelectOption>
                          {dropdownModele.map((option) => (
                              <IonSelectOption value={option.idmodele}>{option.nommodele}</IonSelectOption>
                          ))}
                      </IonSelect>
                </div>
      )}

      {afficherCarburant && !isLoading && (
                <div>
                    <IonLabel position="stacked">
                        <IonIcon/> Carburant
                    </IonLabel>
                    <IonSelect aria-label="marque" interface="popover" value={idcarburant} placeholder="Select One" onIonChange={handleSelectCarburant}>
                        <IonSelectOption value="0">Carburant</IonSelectOption>
                        {dropdownCarburant.map((option) => (
                            <IonSelectOption value={option.idcarburant}>{option.nomcarburant}</IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
      )}


      {afficherPuissance && !isLoading && (
                <div>
                    <IonLabel position="stacked">
                        <IonIcon/> type Puissance
                    </IonLabel>
                    <IonSelect aria-label="marque" interface="popover" value={idpuissance} placeholder="Select One" onIonChange={handleSelectIdPuissance}>
                        <IonSelectOption value="0">type Puissance</IonSelectOption>
                        {dropdownPuissance.map((option) => (
                            <IonSelectOption value={option.idpuissance}>{option.kw} kw {option.cv} cv</IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
      )}

      {afficherBoiteDeVitesse && !isLoading && (
                <div>
                      <IonLabel position="stacked">
                          <IonIcon/> boite de vitesse
                      </IonLabel>
                      <IonSelect aria-label="marque" interface="popover" value={idboitedevitesse} placeholder="Select One" onIonChange={handleSelectBoiteDeVitesse}>
                          <IonSelectOption value="0">Boite de vitesse</IonSelectOption>
                          {dropdownBoiteDeVitesse.map((option) => (
                              <IonSelectOption value={option.idboitedevitesse}>{option.nomboitedevitesse}</IonSelectOption>
                          ))}
                      </IonSelect>
                </div>
      )}

      {afficherTypeDeVehicule && !isLoading  && (
                <div>
                    <IonLabel position="stacked">
                        <IonIcon/> type de vehicule
                    </IonLabel>
                    <IonSelect aria-label="marque" interface="popover" value={idtypedevehicule} placeholder="Select One" onIonChange={handleSelectTypeDeVehicule}>
                        <IonSelectOption value="0">type de vehicule</IonSelectOption>
                        {dropdownTypeDeVehicule.map((option) => (
                            <IonSelectOption value={option.idtypedevehicule}>{option.nomtypedevehicule}</IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
      )}

      {afficherNbrPorte && !isLoading && (
                <div>
                    <IonLabel position="stacked">
                        <IonIcon/> nombre de porte
                    </IonLabel>
                    <IonSelect aria-label="marque" interface="popover" value={nbrporte} placeholder="Select One" onIonChange={handleSelectNbrPorte}>
                        <IonSelectOption value="0">Nombre porte</IonSelectOption>
                        {dropdownNbrPorte.map((option) => (
                            <IonSelectOption value={option.nbrporte}>{option.nbrporte}</IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
      )}

      
      {afficherPuissanceVal  && (
                <div>  
                    <IonLabel position="stacked">
                        <IonIcon/> puissance
                    </IonLabel>

                    <IonSelect aria-label="marque" interface="popover" value={puissance} placeholder="Select One" onIonChange={handleSelectPuissance}>
                        <IonSelectOption value="0">puissance</IonSelectOption>
                        {dropdownPuissance.map((option) => (
                            <IonSelectOption value={option.puissance}>{option.puissance}</IonSelectOption>
                        ))}
                    </IonSelect>

                </div>
      )}

      {afficherMatricule && (
                <div>
                    <IonInput label="matricule" labelPlacement="floating" fill="outline" type="text" value={matricule_state} onIonChange={handleSelectMatricule} />
                </div>
      )}

    <br />

      {afficherKilometrage && (
                <div>
                    <IonInput label="Kilometrage" labelPlacement="floating" fill="outline"  type="text" value={kilometrage_state} onIonChange={handleSelectKilometrage} />
                </div>
      )}

      <br />

        {afficherPrix && (
                <div>
                          <div>
                              <IonInput label="Prix" labelPlacement="floating" fill="outline" type="text" value={prix_state} onIonChange={handleSelectPrix} />
                          </div>

                <br />

                <div class="file-input">
                      <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        class="file-input__input"
                        onChange={handleFileChange} multiple
                      />
                      <label class="file-input__label" for="file-input">
                        <span>Ajouter photo</span></label>
                </div>

                <IonList>

                {photos.map((file, index) => (
                    <IonCard>
                        <img alt="Silhouette of mountains" src={URL.createObjectURL(file)} width={100}/>
                        <IonCardHeader>
                          <IonCardTitle>{file.name}</IonCardTitle>
                          <IonCardSubtitle></IonCardSubtitle>
                        </IonCardHeader>
                        <IonIcon icon={trashOutline} style={{ color: 'red', fontSize: '24px' }} onClick={() => handleRemoveFile(index)}/>
                  </IonCard>
                ))}
              </IonList>
          </div>
        )}

        <IonButton expand="block" onClick={handleInsertion}>
            Publier
        </IonButton>        
        {isLoading && <img src="src/assets/gif/loading.gif" alt="Loading" className="loading-gif"/>}

      </IonContent>
    </IonPage>
  );
};

export default Insertion_annonce;
