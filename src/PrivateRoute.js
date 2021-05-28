import React, {useContext} from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const location = useLocation();
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }}/>
        )
      }
    />
  );
}
  
  export default PrivateRoute;
  
  
  
