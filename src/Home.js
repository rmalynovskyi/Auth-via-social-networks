import {facebookProvider, githubProvider, twitterProvider} from "./configs/authMethod";
import React, {useState} from "react";
import firebase from "./configs/firebase-config";
import Chart from "./Chart";

const Home = () => {
    const [showAlert, setShowAlert] = useState(false);

    const socialMediaAuth = (provider) => {
        return firebase.auth().signInWithPopup(provider).then(res => {
            if (isCurrentUserBlocked(res.user.providerData[0].uid)) {
                setShowAlert(true);
            } else {
                writeUserData(res.user.providerData[0].uid, res.user.providerData[0].displayName,
                    res.user.providerData[0].providerId, res.user.metadata.creationTime,
                    res.user.metadata.lastSignInTime,
                    "active");
            }
            return res.user;
        }).catch((error) => {
            return error;
        });
    }

    function writeUserData(uId, name, socialNetwork, dateFirstLogin, dateLastLogin, status) {
        firebase.database().ref('users/' + uId).set({
            uid: uId,
            name: name,
            socialNetwork: socialNetwork,
            firstLogin: dateFirstLogin,
            lastLogin: dateLastLogin,
            status: status
        });
    }

    const handleOnClick = async (provider) => {
        await socialMediaAuth(provider);
    };

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

    return (<div className="App">
        <div className="container">
            <a onClick={() => handleOnClick(facebookProvider)}
               className="btn btn-block btn-social btn-facebook">
                <i className="fa fa-facebook"/>Sign in with Facebook
            </a>
        </div>
        <div className="container">
            <a onClick={() => handleOnClick(twitterProvider)} className="btn btn-block btn-social btn-twitter">
                <i className="fa fa-twitter"/> Sign in with Twitter
            </a>
            {showAlert ?
                <div className="alert alert-danger" role="alert">
                    This account is blocked
                </div> : <div/>}
        </div>
        <div className="container">
            <a onClick={() => handleOnClick(githubProvider)} className="btn btn-block btn-social btn-github">
                <i className="fa fa-github"/> Sign in with Github
            </a>
        </div>
        <div className="chart"><Chart/>
        </div>
    </div>);
}
export default Home;