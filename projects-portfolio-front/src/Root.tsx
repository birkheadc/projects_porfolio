import * as React from 'react';
import PagesRouter from './components/pages/PagesRouter';
import PrimaryNav from './components/nav/PrimaryNav';
import { ProjectsContext, ProjectsProvider } from './components/contexts/projects/ProjectsContext';
import { AppStatus } from './types/status/appStatus';
import api from './api';
import { SessionContext } from './components/contexts/session/SessionContext';

interface IRootProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function Root(props: IRootProps): JSX.Element | null {

  const [status, setStatus] = React.useState<AppStatus>(AppStatus.INITIAL);
  const { projects, setProjects } = React.useContext(ProjectsContext);
  const { sessionToken, setSessionToken } = React.useContext(SessionContext);

  React.useEffect(function checkStorageForSessionTokenOnMount() {
    // TODO
  }, []);

  React.useEffect(() => {
    (async function fetchProjects() {
      setStatus(AppStatus.LOADING);
      const result = await api.projects.getAll();

      if (result.wasSuccess === false || result.body == null) {
        setStatus(AppStatus.ERROR);
        return;
      }

      setProjects(result.body);
      setStatus(AppStatus.READY);
    })();
  }, []);

  if (status !== AppStatus.READY) {
    return (
      <h1>{status}</h1>
    );
  }

  return (
    <>
      <PrimaryNav />
      <PagesRouter />
    </>
  );
}