import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterLink } from '@ionic/react';
import Insertion_annonce from './annonce/insertion_annonce';
import ListeAnnonce from './annonce/ListeAnnonce';

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
          <div>
            <IonRouterLink onClick={() => handleLinkClick('Creation annonce')} routerLink="/insertion_annonce">
              Creation annonce
            </IonRouterLink>
          </div>
           <br />
           <div>
            <IonRouterLink onClick={() => handleLinkClick('Vos annonces')} routerLink="/mes_annonces">
            Vos annonces
            </IonRouterLink>
          </div>
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
        <IonContent className="ion-padding">
          <Route path="/mes_annonces" component={ListeAnnonce} />
        </IonContent>
      </IonPage>
    </IonReactRouter>
  );
}

export default Header;
