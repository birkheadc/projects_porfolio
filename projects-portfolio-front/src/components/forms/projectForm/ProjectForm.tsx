import * as React from 'react';
import './ProjectForm.css'
import BulletPointsSection from './bulletPointsSection/BulletPointsSection';
import DescriptionSection from './descriptionSection/DescriptionSection';
import TechnologiesSection from './technologiesSection/TechnologiesSection';
import { ProjectSummary } from '../../../types/project/projectSummary';
import { BLANK_NEW_PROJECT, NewProject } from '../../../types/project/newProject';
import { BulletPoint } from '../../../types/project/bulletPoint';
import { ProjectDescriptionLength } from '../../../types/project/projectDescriptionLength';
import { ProjectDescription } from '../../../types/project/projectDescription';

interface IProjectFormProps {
  project: ProjectSummary | undefined,
  submit: (project: NewProject) => Promise<void>
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectForm(props: IProjectFormProps): JSX.Element | null {

  const [ isActive, setActive ] = React.useState<boolean>(true);
  const [ project, setProject ] = React.useState<NewProject>(props.project ? { ...props.project, images: null } : BLANK_NEW_PROJECT);

  const handleChangeString = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    const type = event.currentTarget.type;
    setProject(p => {
      const newValue = {...p}
      newValue[name] = type === 'number' ? parseInt(value) : value;
      return newValue;
    });
  }

  const handleUpdateBulletPoints = (bulletPoints: BulletPoint[]) => {
    setProject(p => {
      const newValue = {...p};

      newValue.descriptions.bulletPoints = bulletPoints;

      return newValue;
    });
  }

  const handleUpdateDescriptions = (length: ProjectDescriptionLength, descriptions: ProjectDescription[]) => {
    setProject(p => {
      const newValue = {...p};

      switch (length) {
        case ProjectDescriptionLength.SHORT:
          newValue.descriptions.shortDescriptions = descriptions;
          break;
        case ProjectDescriptionLength.LONG:
          newValue.descriptions.longDescriptions = descriptions;
          break;
      }

      return newValue;
    });
  }

  const handleUpdateTechnologies = (technologies: string[]) => {
    setProject(p => {
      const newValue = {...p};
      newValue.technologies = technologies;
      return newValue;
    })
  }

  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject(p => {
      const newValue = {...p};
      newValue.images = event.target.files;
      return newValue;
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActive(false);
    await props.submit(project);
    setActive(true);
  }

  return (
    <form className={`project-form-wrapper ${isActive ? '' : 'disabled'}`} onSubmit={handleSubmit}>
      { props.project &&
      <div className="form-row">
        <div className='inline-label-wrapper'>
          <label htmlFor='id'>Id</label>
          <input disabled={true} id='id' name='id' type='text' value={props.project?.id}></input>
        </div>
      </div>
      }
      <div className="form-row">
        <div className='inline-label-wrapper'>
          <label htmlFor='title'>Title</label>
          <input id='title' name='title' type='text' value={project.title} onChange={handleChangeString}></input>
        </div>
        <div className='inline-label-wrapper'>
          <label htmlFor='favorite-level'>Favorite Level</label>
          <input className='small' id='favorite-level' name='favoriteLevel' value={project.favoriteLevel} onChange={handleChangeString} type='number'></input>
        </div>
      </div>
      <div className='form-row'>
        <div className='inline-label-wrapper'>
          <label htmlFor='site'>Site</label>
          <input id='site' name='site' type='text' value={project.site} onChange={handleChangeString}></input>
        </div>
        <div className='inline-label-wrapper'>
          <label htmlFor='source'>Source</label>
          <input id='source' name='source' value={project.source} onChange={handleChangeString}></input>
        </div>
      </div>
      <BulletPointsSection bulletPoints={project.descriptions.bulletPoints} update={handleUpdateBulletPoints}/>
      <DescriptionSection descriptions={project.descriptions.shortDescriptions} length={ProjectDescriptionLength.SHORT} update={handleUpdateDescriptions} />
      <DescriptionSection descriptions={project.descriptions.longDescriptions} length={ProjectDescriptionLength.LONG} update={handleUpdateDescriptions} />
      <TechnologiesSection technologies={project.technologies} update={handleUpdateTechnologies} />
      <div className='inline-label-wrapper'>
        <label htmlFor='images'>Images</label>  
        <input type='file' id='images' name='images' multiple={true} accept='image/*' onChange={handleChangeFiles}></input>
      </div>
      <button type='submit' className='shadow center'>Submit</button>
    </form>
  );
}