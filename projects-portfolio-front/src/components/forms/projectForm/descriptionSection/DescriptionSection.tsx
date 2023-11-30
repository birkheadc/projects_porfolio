import * as React from 'react';
import './DescriptionSection.css'
import { ProjectDescription } from '../../../../types/project/projectDescription';
import { ProjectDescriptionLength } from '../../../../types/project/projectDescriptionLength';

interface IDescriptionSectionProps {
  descriptions: ProjectDescription[],
  length: ProjectDescriptionLength,
  update: (length: ProjectDescriptionLength, descriptions: ProjectDescription[]) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function DescriptionSection(props: IDescriptionSectionProps): JSX.Element | null {

  const handleAddLanguage = () => {
    const language = window.prompt("Enter the language code");
    if (language == null || language === '') return;

    if (props.descriptions.some(d => d.language === language)) {
      alert('That language already exists.');
      return;
    }
    
    const newValue = [...props.descriptions];
    newValue.push({ language, content: '' });

    props.update(props.length, newValue);
  }

  const handleChangeContent = (language: string, newContent: string) => {
    const newValue = [...props.descriptions];

    const description = newValue.find(d => d.language === language);
    if (description == null) return;

    description.content = newContent;

    props.update(props.length, newValue);
  }

  const handleDeleteDescription = (language: string) => {
    const confirm = window.confirm(`Really delete ${language} descriptions?`);
    if (confirm === false) return;

    const newValue = props.descriptions.filter(b => b.language !== language);
    props.update(props.length, newValue);
  }
  
  return (
    <div className='description-section-wrapper inline-label-wrapper'>
      <label>{props.length}</label>
      {props.descriptions.map(
        description =>
        <div key={`description-section-language-wrapper-${description.language}`} className='description-section-language-wrapper inline-label-wrapper'>
          <label>{description.language}</label>
          <button className='inline-delete-button' onClick={() => handleDeleteDescription(description.language)} type='button'>x</button>
          <textarea autoFocus={true} rows={5} value={description.content} onChange={(event) => handleChangeContent(description.language, event.currentTarget.value)}></textarea>
        </div>
      )}
      <button className='shadow right-align' onClick={handleAddLanguage} type='button'>+</button>
    </div>
  );
}