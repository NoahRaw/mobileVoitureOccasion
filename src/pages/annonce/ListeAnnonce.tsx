import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import ListeAnnonceDetail from './ListeAnnonceDetail';

const ListeAnnonce = () => {
    const [userData, setUserData] = useState([]);

    const authToken = localStorage.getItem('authToken');
    
    useEffect(() => {
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
                    setUserData(data); // Mettez à jour l'état avec les données récupérées
                } else {
                    console.error('Erreur lors de la requête HTTP:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la requête HTTP:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    {userData.map((user) => (
                        <IonRow>
                            <IonCol>
                                <ListeAnnonceDetail
                                    userData={user}
                                    setUserData={setUserData}
                                />
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ListeAnnonce;
