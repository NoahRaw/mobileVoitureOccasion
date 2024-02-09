import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonIcon } from '@ionic/react';
import { calendarOutline, carOutline } from 'ionicons/icons';

const ListeAnnonceDetail = ({ userData, setUserData }: { userData: any, setUserData: any }) => {
    const [voiturePhoto, setVoiturePhoto] = useState([]);

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

    useEffect(() => {
        const fetchAnnonces = async () => {
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
                    console.error('Erreur lors de la récupération des annonces:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
            }
        };

        fetchAnnonces();
    }, []);

    const [estVisible, setEstVisible] = useState(false);

    const handleClick = () => {
        setEstVisible(!estVisible);
    };

    return (
        <IonCard>
            <IonImg src="https://images.bfmtv.com/UsUszd-6qH5LSvmGP4LK5ZkJgwE=/4x3:1252x705/800x0/images/-180591.jpg" />
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
                        <p>Statut : {userData.statut}</p>
                    </div>
                }
                <IonButton onClick={handleClick} expand="block">Detail</IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default ListeAnnonceDetail;
