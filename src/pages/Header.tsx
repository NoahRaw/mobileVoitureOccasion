import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterLink } from '@ionic/react';
import Insertion_annonce from './annonce/insertion_annonce';

function Header() {

  // État pour stocker le titre actuel
  const [pageTitle, setPageTitle] = useState('Menu');

  // Fonction pour mettre à jour le titre
  const handleLinkClick = (newTitle) => {
    setPageTitle(newTitle);
  };

  return (
    <IonReactRouter>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Utilisez IonRouterLink pour naviguer vers la route d'insertion d'annonce */}
          <IonRouterLink onClick={() => handleLinkClick('Creation annonce')} routerLink="/insertion_annonce">
            Creation annonce
          </IonRouterLink>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Route path="/insertion_annonce" component={Insertion_annonce} />
        </IonContent>
      </IonPage>
    </IonReactRouter>
  );
}

export default Header;
