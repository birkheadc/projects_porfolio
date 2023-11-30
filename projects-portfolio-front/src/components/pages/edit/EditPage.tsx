import * as React from 'react';
import './EditPage.css'
import ProjectForm from '../../forms/projectForm/ProjectForm';
import ResultDisplay from '../../forms/resultDisplay/ResultDisplay';
import { ProjectSummary } from '../../../types/project/projectSummary';
import api from '../../../api';
import { Result } from '../../../types/result/result';
import { ProjectsContext } from '../../contexts/projects/ProjectsContext';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../contexts/session/SessionContext';

interface IEditPageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function EditPage(props: IEditPageProps): JSX.Element | null {

  const { projects } = React.useContext(ProjectsContext);
  const id = window.location.href.split('/').pop();
  
  const [ oldProject ] = React.useState<ProjectSummary | undefined>(projects.find(p => p.id === id ));
  const [ recentResult, setRecentResult ] = React.useState<Result | null>(null);

  const { sessionToken } = React.useContext(SessionContext);

  const nav = useNavigate();

  React.useEffect(function returnHomeIfProjectIdNotFound() {
    if (oldProject == null) {
      nav('/');
    }
  }, [ oldProject ]);

  const handleSubmit = async (projectSummary: ProjectSummary) => {
    const result = await api.projects.putProject(projectSummary, sessionToken?.token);
    setRecentResult(result);
  }

  return (
    <main className='edit-page-wrapper'>
      <h1 className='center'>Edit Project</h1>
      <ResultDisplay result={recentResult} />
      <ProjectForm project={oldProject} submit={handleSubmit} />
    </main>
  );
}