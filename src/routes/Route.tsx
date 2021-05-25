import React from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from "react-router-dom";

import { useAuth } from "../hooks/Auth";
import Main from "../pages/Main";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  title?: string;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  title,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.title = `${title} | AutoPosto`;
        return isPrivate === !!user ? (
          <Main>
            <Component />
          </Main>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
