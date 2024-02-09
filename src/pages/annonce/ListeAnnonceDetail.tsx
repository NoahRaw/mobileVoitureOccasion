import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonIcon,IonLabel } from '@ionic/react';
import { calendarOutline, carOutline } from 'ionicons/icons';

const ListeAnnonceDetail = ({ userData, setUserData }: { userData: any, setUserData: any }) => {
    const [voiturePhoto, setVoiturePhoto] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:52195/photoVoitureUtilisateurs/getPhotoVoitureUtilisateur/${userData.idvoitureutilisateur}`);

                if (response.ok) {
                    const data = await response.json();
                    setVoiturePhoto(data); // Mettez à jour l'état avec les données récupérées
                } else {
                    console.error('Erreur lors de la requête HTTP:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la requête HTTP:', error);
            }
        };

        fetchData();
    }, [userData.idvoitureutilisateur]);

    
    
    
    const [estVisible, setEstVisible] = useState(false);

    const handleClick = () => {
        setEstVisible(!estVisible);
    };


    

    const change_statut_vendu = async () => {
        setIsLoading(true);

        try {
          const response = await fetch(`http://localhost:52195/VoitureUtilisateurs/vendu/${userData.idvoitureutilisateur}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
          });
    
          if (response.ok) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:52195/Voitureutilisateur_view/ces_annonces`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data); 
                    } else {
                        console.error('Erreur lors de la requête HTTP:', response.statusText);
                    }
                } catch (error) {
                    console.error('Erreur lors de la requête HTTP:', error);
                }
            };
    
            fetchData();
          } else {
            console.error('Erreur lors de la demande:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la requête HTTP:', error);
        }finally{
            setIsLoading(false);
        }
      };

      useEffect(() => {
    }, [isLoading]); 

    useEffect(() => {
    }, [userData]); 
    return (
        <IonCard>
            
            { !isLoading && 
            <div>
            {voiturePhoto.map((photo) => (
                    <img src={`${photo.nomPhoto}`}  alt="Description de l'image" ></img>
            ))}
            <IonCardHeader>
                <IonCardTitle>{userData.nomtypedevehicule} {userData.nommodele}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p>{userData.prix} Ar / {userData.kilometrage} km</p>
                <p><IonIcon icon={calendarOutline} /> Date de vente: {userData.dateventedebut}</p>
                <p><IonIcon icon={carOutline} /> Matricule: {userData.matricule}</p>
                {estVisible &&
                    <div className="place-cap-top">
                        <p>Carburant : {userData.nomcarburant}</p>
                        <p>Puissance en chevaux : {userData.kw} kw / {userData.cv} cv</p>
                        <p>Puissance : {userData.puissance}</p>
                        <p>Marque : {userData.nommarque}</p>
                        <p>Type de boite de vitesse : {userData.nomboitedevitesse}</p>
                        <p>Nombre de porte : {userData.nbrporte}</p>
                    </div>
                }

                {userData.statut===1 &&  <div>
                    <IonLabel position="stacked">
                        statut :  non vendu
                    </IonLabel>
                <IonButton onClick={change_statut_vendu} expand="block">Vendu</IonButton>
                </div>
                }

                {userData.statut===2 &&  <div>
                    <IonLabel position="stacked">
                        statut :  vendu
                    </IonLabel>
                </div>
                }


                <IonButton onClick={handleClick} expand="block">Detail</IonButton>
                </IonCardContent>
            </div>
            }
            {isLoading && <img src="src/assets/gif/loading.gif" alt="Loading" className="loading-gif"/>}

        </IonCard>
    );
};

export default ListeAnnonceDetail;
