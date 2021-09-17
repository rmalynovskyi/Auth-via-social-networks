import {HOME_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import Home from "./Home";
import Table from "./Table";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    }
]

export const privateRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Table
    }
]
