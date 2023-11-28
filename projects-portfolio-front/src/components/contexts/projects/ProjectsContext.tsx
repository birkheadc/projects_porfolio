import * as React from 'react';
import { ProjectSummary } from '../../../types/project/projectSummary';

type Props = {
  children: React.ReactNode
}

type State = {
  projects: ProjectSummary[],
  setProjects: React.Dispatch<React.SetStateAction<ProjectSummary[]>>
}

export const ProjectsContext = React.createContext<State>({ projects: [], setProjects: () => {} });
export const ProjectsProvider = ({ children }: Props) => {
  const [ projects, setProjects ] = React.useState<ProjectSummary[]>([]);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      { children }
    </ProjectsContext.Provider>
  );
}