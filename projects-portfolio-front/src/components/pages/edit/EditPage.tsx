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
import { NewProject } from '../../../types/project/newProject';
import { SessionStatus } from '../../../types/session/session/session';

interface IEditPageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function EditPage(props: IEditPageProps): JSX.Element | null {

  const { projects, refreshProjects } = React.useContext(ProjectsContext);
  const id = window.location.href.split('/').pop();
  
  const [ oldProject, setOldProject ] = React.useState<ProjectSummary | undefined>(undefined);
  const [ recentResult, setRecentResult ] = React.useState<Result | undefined>(undefined);

  const { session } = React.useContext(SessionContext);

  const nav = useNavigate();

  // React.useEffect(function returnHomeIfProjectIdNotFound() {
  //   if (projects !== undefined && session.status !== SessionStatus.CHECKING && oldProject == null) {
  //     nav('/');
  //   }
  // }, [ oldProject, session, projects ]);

  const handleSubmit = async (project: NewProject) => {
    const result = await api.projects.putProject(project, session.token);
    setRecentResult(result);
    if (result.wasSuccess) {
      await refreshProjects();
      nav('/browse');
    }
  }

  React.useEffect(function setOldProjectOnMount() {
    console.log("Projects: ", projects);
    if (projects == null) return;
    const project = projects.find(p => p.id === id);
    console.log("Project: ", project);
    setOldProject(project);
  }, [ projects ])

  return (
    <main className='edit-page-wrapper'>
      <h1 className='center'>Edit Project</h1>
      <ResultDisplay result={recentResult} />
      <ProjectForm project={oldProject} submit={handleSubmit} />
    </main>
  );
}