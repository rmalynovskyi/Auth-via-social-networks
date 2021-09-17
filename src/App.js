import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import AppRouter from "./AppRouter";
import firebase from "./configs/firebase-config";

const App = () => {
    const isCurrentUserBlocked = (uid) => {
        let isCurrentUserBlocked = false;
        firebase.database().ref('users/').on("value", async snapshot => {
            snapshot.forEach(childSnapShot => {
                if (uid === childSnapShot.val().uid && childSnapShot.val().status === 'blocked') {
                    isCurrentUserBlocked = true;
                }
            });
        });
        return isCurrentUserBlocked;
    }

    return (
        <BrowserRouter>
            <AppRouter passedFunction={isCurrentUserBlocked}/>
        </BrowserRouter>
    );
}

export default App;