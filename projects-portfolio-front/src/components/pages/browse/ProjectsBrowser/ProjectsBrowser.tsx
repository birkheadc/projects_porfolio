import * as React from 'react';
import './ProjectsBrowser.css'
import { ProjectSummary } from '../../../../types/project/projectSummary';
import ProjectDisplay from './ProjectDisplay/ProjectDisplay';
import api from '../../../../api';
import { SessionContext } from '../../../contexts/session/SessionContext';

interface IProjectsBrowserProps {
  projects: ProjectSummary[] | undefined
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectsBrowser(props: IProjectsBrowserProps): JSX.Element | null {

  const { session } = React.useContext(SessionContext);

  const deleteProject = async (id: string) => {
    await api.projects.deleteProject(id, session.token);
  }

  return (
    <div className='projects-browser-wrapper'>
      {props.projects && props.projects.map(
        project =>
        <ProjectDisplay key={`project-display-${project.id}`} delete={deleteProject} project={project} />
      )}
    </div>
  );
}