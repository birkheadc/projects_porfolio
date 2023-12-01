import * as React from 'react';
import PagesRouter from './components/pages/PagesRouter';
import PrimaryNav from './components/nav/PrimaryNav';
import { ProjectsContext } from './components/contexts/projects/ProjectsContext';
import api from './api';
import { SessionContext } from './components/contexts/session/SessionContext';
import helpers from './helpers';
import { SessionStatus, Sessions } from './types/session/session/session';

interface IRootProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function Root(props: IRootProps): JSX.Element | null {

  const { projects, setProjects } = React.useContext(ProjectsContext);
  const { session, setSession } = React.useContext(SessionContext);

  const isReady = (
    projects !== undefined &&
    session.status !== SessionStatus.CHECKING
  );

  React.useEffect(function checkStorageForSessionTokenOnMount() {
    const token: string | null = helpers.localStorage.token.retrieve();
    if (token == null) {
      setSession(Sessions.LOGGED_OUT);
      return;
    }
    (async function verifyToken(token: string) {
      const result = await api.session.verifyToken(token);
      if (result.wasSuccess) {
        setSession(Sessions.LOGGED_IN(token));
        return;
      }
      helpers.localStorage.token.clear();
      setSession(Sessions.LOGGED_OUT);
    })(token);
  }, []);

  React.useEffect(() => {
    (async function fetchProjects() {
      const result = await api.projects.getAll();
      if (result.wasSuccess === false || result.body == null) {
        return;
      }
      setProjects(result.body);
    })();
  }, []);

  if (!isReady) return (
    <h1>Loading</h1>
  );

  return (
    <>
      <PrimaryNav />
      <PagesRouter />
    </>
  );
}