import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';

import { User } from './models';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Home from './pages/Home';
import Team from './pages/Team';
import Player from './pages/Player';
import Profile from './pages/Profile';
import TeamDetail from './pages/TeamDetail';
import PlayerDetail from './pages/PlayerDetail';
import { RootState } from './redux/rootReducer';

interface PrivateRouteProp {
  component: React.FC;
  isLoggedIn: boolean;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProp> = ({
  component: Component,
  isLoggedIn,
  path,
}: PrivateRouteProp): JSX.Element => {
  return (
    <Route
      path={path}
      exact
      render={(props: any) =>
        isLoggedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes: React.FC<any> = (): JSX.Element => {
  const history = useHistory();

  const user: User = useSelector<RootState>(
    (state: RootState) => state.auth.user
  ) as User;

  useEffect(() => {
    if (user) {
      history.push('/home');
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot" exact component={ForgotPassword} />
      <PrivateRoute
        path="/teams/:teamId/"
        component={TeamDetail}
        isLoggedIn={!!user}
      />
      <PrivateRoute
        path="/players/:playerId/"
        component={PlayerDetail}
        isLoggedIn={!!user}
      />
      <PrivateRoute path="/home" component={Home} isLoggedIn={!!user} />
      <PrivateRoute path="/teams" component={Team} isLoggedIn={!!user} />
      <PrivateRoute path="/players" component={Player} isLoggedIn={!!user} />
      <PrivateRoute path="/profile" component={Profile} isLoggedIn={!!user} />
      <Route path="*" exact render={() => <Redirect to="/login" />} />
    </Switch>
  );
};

export default Routes;
