import * as React from 'react';
import './ProjectsBrowser.css'
import { ProjectSummary } from '../../../../types/project/projectSummary';
import ProjectDisplay from './ProjectDisplay/ProjectDisplay';
import api from '../../../../api';
import { SessionContext } from '../../../contexts/session/SessionContext';
import { Result } from '../../../../types/result/result';
import ResultDisplay from '../../../forms/resultDisplay/ResultDisplay';
import { ProjectsContext } from '../../../contexts/projects/ProjectsContext';

interface IProjectsBrowserProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectsBrowser(props: IProjectsBrowserProps): JSX.Element | null {

  const { session } = React.useContext(SessionContext);

  const [ isWorking, setWorking ] = React.useState<boolean>(false)
  const [ recentResult, setRecentResult ] = React.useState<Result | undefined>(undefined);

  const { projects, refreshProjects } = React.useContext(ProjectsContext);

  const deleteProject = async (id: string) => {
    setWorking(true);
    const result = await api.projects.deleteProject(id, session.token);
    setRecentResult(result);
    setWorking(false);
    if (result.wasSuccess) {
      await refreshProjects();
    }
  }

  return (
    <div className='projects-browser-wrapper'>
      {!projects &&
        <span>Loading Projects</span>
      }
      {isWorking && 
        <span>Working</span>
      }
      {!isWorking &&
        <ResultDisplay result={recentResult} />
      }
      {projects && !isWorking && projects.map(
        project =>
        <ProjectDisplay key={`project-display-${project.id}`} delete={deleteProject} project={project} />
      )}
      {
        projects && !isWorking && projects.length < 1 && 
        <span>Nothing here!</span>
      }
    </div>
  );
}