import * as React from 'react';
import './ProjectsBrowser.css'
import { ProjectSummary } from '../../../../types/project/projectSummary';
import ProjectDisplay from './ProjectDisplay/ProjectDisplay';
import api from '../../../../api';

interface IProjectsBrowserProps {
  projects: ProjectSummary[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectsBrowser(props: IProjectsBrowserProps): JSX.Element | null {

  const deleteProject = async (id: string) => {
    await api.projects.deleteProject(id);
  }

  return (
    <div className='projects-browser-wrapper'>
      {props.projects.map(
        project =>
        <ProjectDisplay key={`project-display-${project.id}`} delete={deleteProject} project={project} />
      )}
    </div>
  );
}