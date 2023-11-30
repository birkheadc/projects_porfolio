import * as React from 'react';
import './TechnologiesSection.css'

interface ITechnologiesSectionProps {
  technologies: string[],
  update: (technologies: string[]) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function TechnologiesSection(props: ITechnologiesSectionProps): JSX.Element | null {

  const handleAddNewTechnology = () => {
    const tech = window.prompt('Enter the name of the technology');
    if (tech == null || tech === '') return;

    if (props.technologies.some(t => t === tech)) {
      alert('That technology is already listed.');
      return;
    }

    const newValue = [...props.technologies];
    newValue.push(tech);
    props.update(newValue);
  }

  const handleDeleteTechnology = (technology: string) => {
    const newValue = props.technologies.filter(t => t !== technology);
    props.update(newValue);
  }

  return (
    <div className='technologies-section-wrapper inline-label-wrapper'>
      <label>Technologies</label>
      <div className='technology-buttons-wrapper'>
        {props.technologies.map(
          technology =>
          <button key={`technology-button-${technology}`} type='button' className='shadow' onClick={() => handleDeleteTechnology(technology)}>{technology}</button>
        )}
      </div>
      <button type='button' className='shadow right-align' onClick={handleAddNewTechnology}>+</button>
    </div>
  );
}