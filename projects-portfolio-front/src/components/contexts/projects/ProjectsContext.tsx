import * as React from 'react';
import { ProjectSummary } from '../../../types/project/projectSummary';

type Props = {
  children: React.ReactNode
}

type State = {
  projects: ProjectSummary[] | undefined,
  setProjects: React.Dispatch<React.SetStateAction<ProjectSummary[] | undefined>>
}

export const ProjectsContext = React.createContext<State>({ projects: undefined, setProjects: () => {} });
export const ProjectsProvider = ({ children }: Props) => {
  const [ projects, setProjects ] = React.useState<ProjectSummary[] | undefined>(undefined);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      { children }
    </ProjectsContext.Provider>
  );
}