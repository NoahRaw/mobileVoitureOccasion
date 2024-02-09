import React, { useState, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './pages/Header';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './assets/css/style.css';


/* Theme variables */
import './theme/variables.css';

import { useHistory } from 'react-router-dom';

setupIonicReact();


const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  console.log('Is connected:', isConnected);
  const authToken = localStorage.getItem('authToken');
   alert(authToken);

    if(authToken!=null && isConnected===false){
       setIsConnected(true)
    }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            {isConnected ? <Redirect to="/insertion_annonce" /> : <Login setIsConnected={setIsConnected} />}
          </Route>
          <Route path="/home" exact={true}>
            {isConnected ? <Home /> : <Redirect to="/" />}
          </Route>
          <Route path="/register" exact={true}>
            <Register />
          </Route>
          <Route path="/message/:id">
           <ViewMessage />
          </Route>
          {/* Autres routes... */}
          <Header />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
