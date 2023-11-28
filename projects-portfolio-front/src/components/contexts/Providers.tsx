import * as React from 'react';
import { ProjectsProvider } from './projects/ProjectsContext';

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
      {props.children}
    </ProjectsProvider>
  );
}