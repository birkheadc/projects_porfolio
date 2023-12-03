import * as React from 'react';
import './ProjectDisplay.css'
import { ProjectSummary } from '../../../../../types/project/projectSummary';
import { Link } from 'react-router-dom';
import { SessionContext } from '../../../../contexts/session/SessionContext';
import { SessionStatus } from '../../../../../types/session/session/session';
import ProjectDisplayMoreInfo from './ProjectDisplayMoreInfo/ProjectDisplayMoreInfo';

interface IProjectDisplayProps {
  project: ProjectSummary,
  delete: (id: string) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectDisplay(props: IProjectDisplayProps): JSX.Element | null {

  const language = 'en';
  const { session } = React.useContext(SessionContext);

  const project = props.project;

  const confirmDelete = () => {
    const confirm = window.confirm(`Are you sure you want to delete ${project.title}?`);
    if (confirm) {
      props.delete(project.id);
    }
  }

  return (
    <div className='project-display-wrapper'>
      <div className='project-display-header'>
        <h2>{project.title}</h2>
        { session.status === SessionStatus.LOGGED_IN && <Link to={`/edit/${project.id}`}>Edit</Link>}
        { session.status === SessionStatus.LOGGED_IN && <button className='project-display-delete-button' onClick={confirmDelete} type='button'>Delete</button>}
      </div>
      <div className='project-display-body'>
        <img width={400} height={300} src={`https://picsum.photos/seed/${project.id}/400/300`}></img>
        <ul className='project-display-bullet-points'>
          {project.descriptions.bulletPoints.find(bp => bp.language === language)?.content.map(
            point =>
            <li key={`project-display-bullet-point-${point}`}>
              {point}
            </li>
          )}
        </ul>
      </div>
      <div className='project-display-more-info'>
        <ProjectDisplayMoreInfo project={project} />
      </div>
    </div>
  );
}