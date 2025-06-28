import type { RouteObject } from "react-router";
import MainNav from "./MainNav";
import Home from "./MainNavChildern/Home";

const mainRoutes: RouteObject[] = [
    {
        path: '/',
        element: <MainNav />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
]

export default mainRoutes