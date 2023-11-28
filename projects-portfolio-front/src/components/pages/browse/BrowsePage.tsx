import * as React from 'react';
import './BrowsePage.css'
import ProjectsBrowser from './ProjectsBrowser/ProjectsBrowser';
import { ProjectSummary } from '../../../types/project/projectSummary';
import { ProjectsContext } from '../../contexts/projects/ProjectsContext';

interface IBrowsePageProps {
  
}

/**
*
* @returns {JSX.Element | null}
*/
export default function BrowsePage(props: IBrowsePageProps): JSX.Element | null {

  const { projects } = React.useContext(ProjectsContext);

  return (
    <main className='browse-page-wrapper'>
      <h1 className='center'>Browse Projects</h1>
      <ProjectsBrowser projects={projects} />
    </main>
  );
}