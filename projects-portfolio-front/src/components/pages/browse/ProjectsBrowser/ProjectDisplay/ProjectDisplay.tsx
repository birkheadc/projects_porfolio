import * as React from 'react';
import './ProjectDisplay.css'
import { ProjectSummary } from '../../../../../types/project/projectSummary';
import { Link } from 'react-router-dom';

interface IProjectDisplayProps {
  project: ProjectSummary,
  delete: (id: string) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectDisplay(props: IProjectDisplayProps): JSX.Element | null {

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
        <Link to={`/edit/${project.id}`}>Edit</Link>
        <button className='project-display-delete-button' onClick={confirmDelete} type='button'>Delete</button>
      </div>
      <div className='project-display-body'>
        <img width={400} height={300} src={`https://picsum.photos/seed/${project.id}/400/300`}></img>
        <p>{project.descriptions.shortDescriptions.find(d => d.language === 'en')?.content}</p>
      </div>
    </div>
  );
}