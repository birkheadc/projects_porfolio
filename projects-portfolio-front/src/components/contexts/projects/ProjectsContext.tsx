import * as React from 'react';
import { ProjectSummary } from '../../../types/project/projectSummary';
import api from '../../../api';

type Props = {
  children: React.ReactNode
}

type State = {
  projects: ProjectSummary[] | undefined,
  refreshProjects: () => Promise<void>
}

export const ProjectsContext = React.createContext<State>({ projects: undefined, refreshProjects: async () => {} });
export const ProjectsProvider = ({ children }: Props) => {
  const [ projects, setProjects ] = React.useState<ProjectSummary[] | undefined>(undefined);
  const refreshProjects = async () => {
    setProjects(undefined);
    const result = await api.projects.getAll();
    if (result.wasSuccess && result.body != null) setProjects(result.body);
    else setProjects([]);
  }
  return (
    <ProjectsContext.Provider value={{ projects, refreshProjects }}>
      { children }
    </ProjectsContext.Provider>
  );
}