import * as React from 'react';
import './ProjectDisplayMoreInfo.css'
import Collapsible from 'react-collapsible';
import { ProjectSummary } from '../../../../../../types/project/projectSummary';

interface IProjectDisplayMoreInfoProps {
  project: ProjectSummary
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectDisplayMoreInfo(props: IProjectDisplayMoreInfoProps): JSX.Element | null {

  const language = 'en';
  const [ isOpen, setOpen ] = React.useState<boolean>(false);

  return (
    <Collapsible
      open={isOpen}
      onOpening={() => {setOpen(true)}}
      onClosing={() => {setOpen(false)}}
      transitionTime={100}
      trigger={<span className='project-display-more-info-trigger'>{isOpen ? 'Less Information' : 'More Information'}</span>}
    >
      <div className='project-display-more-info-wrapper'>
        <p className='project-display-long-description'>{props.project.descriptions.longDescriptions.find(d => d.language === language)?.content}</p>
        <div className='project-display-technologies'>
          {props.project.technologies.map(
            tech =>
            <span key={`project-display-technology-${tech}`}>{tech}</span>
          )}
        </div>
      </div>
    </Collapsible>
  );
}