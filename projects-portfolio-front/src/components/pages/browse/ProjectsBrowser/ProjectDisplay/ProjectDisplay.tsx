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

  const confirmDelete = () => {
    const confirm = window.confirm(`Are you sure you want to delete ${props.project.title}?`);
    if (confirm) {
      props.delete(props.project.id);
    }
  }

  return (
    <div className='project-display-wrapper'>
      <div className='project-display-header'>
        <h2>{props.project.title}</h2>
        { session.status === SessionStatus.LOGGED_IN && <Link to={`/edit/${props.project.id}`}>Edit</Link>}
        { session.status === SessionStatus.LOGGED_IN && <button className='project-display-delete-button' onClick={confirmDelete} type='button'>Delete</button>}
      </div>
      <div className='project-display-body'>
        <img className='' width={400} height={300} src={props.project.imageUrls[0] ?? `https://picsum.photos/seed/${props.project.id}/400/300`}></img>
        <ul className='project-display-bullet-points'>
          {props.project.descriptions.bulletPoints.find(bp => bp.language === language)?.content.map(
            point =>
            <li key={`project-display-bullet-point-${point}`}>
              {point}
            </li>
          )}
        </ul>
      </div>
      <div className='project-display-more-info'>
        <ProjectDisplayMoreInfo project={props.project} />
      </div>
    </div>
  );
}