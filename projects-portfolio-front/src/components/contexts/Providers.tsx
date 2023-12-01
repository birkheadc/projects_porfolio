import * as React from 'react';
import { ProjectsProvider } from './projects/ProjectsContext';
import { SessionProvider } from './session/SessionContext';

interface IProvidersProps {
  children: React.ReactNode
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Providers(props: IProvidersProps): JSX.Element | null {
  return (
    <ProjectsProvider>
      <SessionProvider>
        {props.children}
      </SessionProvider>
    </ProjectsProvider>
  );
}