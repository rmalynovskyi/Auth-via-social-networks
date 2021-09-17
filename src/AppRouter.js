import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "./routes";
import {HOME_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";

const AppRouter = (props) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth);

    return user && !props.passedFunction(auth.currentUser.providerData[0].uid) ?
        (
            <Switch>
                {privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact={true}/>
                )}
                <Redirect to={LOGIN_ROUTE}/>
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact={true}/>
                )}
                <Redirect to={HOME_ROUTE}/>
            </Switch>
        );
}

export default AppRouter