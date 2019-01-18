import * as React from 'react';
import { Route } from 'react-router-dom';

export default function PrivateRoute(route: any) {
  return (
    <Route
      path={route.path}
      render={(props: any) => {
        if (route.title) { document.title = route.title; }
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
}
