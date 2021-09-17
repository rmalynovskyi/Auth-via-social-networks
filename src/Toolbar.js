import firebase from "./configs/firebase-config";
import {useContext} from "react";
import {Context} from "./index";

const Toolbar = (props) => {
    const {auth} = useContext(Context);

    const deleteUsers = () => {
        for (let i = 0; i < props.usersSelected.length; i++) {
            firebase.database().ref('users/').child(props.usersSelected[i]).remove().then(() => {
                    if (props.usersSelected[i] === auth.currentUser.providerData[0].uid) {
                        auth.signOut();
                    }
                    props.onChange();
                }
            );
        }
    }

    const blockUnblockUsers = (status) => {
        let isCurrentUserSelected = false;
        for (let i = 0; i < props.usersSelected.length; i++) {
            if (props.usersSelected[i] === auth.currentUser.providerData[0].uid) {
                isCurrentUserSelected = true;
            }
            firebase.database().ref('users/').child(props.usersSelected[i]).child('status').set(status).then(
                () => {
                    props.onChange();
                }
            );
        }
        if (status === 'blocked' && isCurrentUserSelected) {
            auth.signOut();
        }
    }

    return (<div className="btn-group-lg" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark" onClick={() => blockUnblockUsers('blocked')}>Block user
            </button>
            <button type="button" className="btn btn-primary" onClick={() => blockUnblockUsers('active')}>Unblock
                user
            </button>
            <button type="button" className="btn btn-danger" onClick={() => deleteUsers()}>Delete user</button>
        </div>
    );
}

export default Toolbar;