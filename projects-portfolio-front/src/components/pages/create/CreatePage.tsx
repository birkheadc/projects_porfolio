import * as React from 'react';
import './CreatePage.css'
import ProjectForm from '../../forms/projectForm/ProjectForm';
import { ProjectSummary } from '../../../types/project/projectSummary';
import api from '../../../api';
import { Result } from '../../../types/result/result';
import ResultDisplay from '../../forms/resultDisplay/ResultDisplay';
import { SessionContext } from '../../contexts/session/SessionContext';

interface ICreatePageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function CreatePage(props: ICreatePageProps): JSX.Element | null {

  const [ recentResult, setRecentResult ] = React.useState<Result | undefined>(undefined);
  const { session } = React.useContext(SessionContext);

  const handleSubmit = async (projectSummary: ProjectSummary) => {
    const result = await api.projects.putProject(projectSummary, session.token);
    setRecentResult(result);
  }

  return (
    <main className='create-page-wrapper'>
      <h1 className='center'>Create New Project</h1>
      <ResultDisplay result={recentResult} />
      <ProjectForm project={undefined} submit={handleSubmit} />
    </main>
  );
}