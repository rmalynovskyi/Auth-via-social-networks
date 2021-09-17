import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/compat";

const auth = firebase.auth();
export  const Context = createContext(null);

ReactDOM.render(<Context.Provider value={{auth}}><App/> </Context.Provider>, document.getElementById('root'));
