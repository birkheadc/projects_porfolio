import * as React from 'react';
import './CreatePage.css'
import ProjectForm from '../../forms/projectForm/ProjectForm';
import { ProjectSummary } from '../../../types/project/projectSummary';
import api from '../../../api';
import { Result } from '../../../types/result/result';
import ResultDisplay from '../../forms/resultDisplay/ResultDisplay';
import { SessionContext } from '../../contexts/session/SessionContext';
import { ProjectsContext } from '../../contexts/projects/ProjectsContext';
import { useNavigate } from 'react-router-dom';
import { NewProject } from '../../../types/project/newProject';

interface ICreatePageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function CreatePage(props: ICreatePageProps): JSX.Element | null {

  const [ recentResult, setRecentResult ] = React.useState<Result | undefined>(undefined);
  const { session } = React.useContext(SessionContext);
  const { refreshProjects } = React.useContext(ProjectsContext);
  const nav = useNavigate();

  const handleSubmit = async (project: NewProject) => {
    const result = await api.projects.putProject(project, session.token);
    setRecentResult(result);
    if (result.wasSuccess) {
      await refreshProjects();
      nav('/browse');
    }
  }

  return (
    <main className='create-page-wrapper'>
      <h1 className='center'>Create New Project</h1>
      <ResultDisplay result={recentResult} />
      <ProjectForm project={undefined} submit={handleSubmit} />
    </main>
  );
}