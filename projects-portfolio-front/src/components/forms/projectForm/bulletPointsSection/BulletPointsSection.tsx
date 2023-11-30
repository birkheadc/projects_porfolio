import * as React from 'react';
import './BulletPointsSection.css'
import { BulletPoint } from '../../../../types/project/bulletPoint';

interface IBulletPointsSectionProps {
  bulletPoints: BulletPoint[],
  update: (bulletPoints: BulletPoint[]) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function BulletPointsSection(props: IBulletPointsSectionProps): JSX.Element | null {

  const handleChange = (language: string, index: number, value: string) => {
    const newValue = [...props.bulletPoints];
    const point = newValue.find(b => b.language === language);
    if (point == null || point.content.length <= index) {
      return;
    }
    point.content[index] = value;
    props.update(newValue);
  }

  const handleAddPoint = (language: string) => {
    const newValue = [...props.bulletPoints];
    const point = newValue.find(b => b.language === language);
    point?.content.push('');
    props.update(newValue);
  }

  const handleDeleteBulletPoint = (language: string) => {
    const confirm = window.confirm(`Really delete ${language} bullet points?`);
    if (confirm === false) return;

    const newValue = props.bulletPoints.filter(b => b.language !== language);
    props.update(newValue);
  }

  const handleAddBulletPoint = () => {
    const language = window.prompt("Enter the language code");
    if (language == null || language === '') return;

    if (props.bulletPoints.some(b => b.language === language)) {
      alert('That language already exists.');
      return;
    }

    const newValue = [...props.bulletPoints];
    newValue.push({ language, content: ['']});
    
    props.update(newValue);
  }

  const handleDeletePoint = (language: string, index: number) => {
    const newValue = [...props.bulletPoints];
    const bulletPoint: BulletPoint | undefined = newValue.find(b => b.language === language);
    if (bulletPoint == null) {
      return;
    }
    bulletPoint.content.splice(index, 1);
    props.update(newValue);

  }

  return (
    <div className='bullet-points-section-wrapper inline-label-wrapper'>
      <label>Bullet Points</label>
      {props.bulletPoints.map(
        bulletPoint =>
        <div key={`bullet-points-section-language-wrapper-${bulletPoint.language}`} className='bullet-points-section-language-wrapper inline-label-wrapper'>
          <label>{bulletPoint.language}</label>
          <button className='inline-delete-button' onClick={() => handleDeleteBulletPoint(bulletPoint.language)} type='button'>x</button>
          {bulletPoint.content.map(
            (point, index) =>
            <div key={`bullet-point-row-${index}`} className="bullet-point-row">
              <span>{index + 1}.</span>
              <input autoFocus={true} className='max-width' id={`bullet-point-content-${index}`} onChange={(event) => handleChange(bulletPoint.language, index, event.currentTarget.value)} value={point}></input>
              <button className='shadow' onClick={() => handleDeletePoint(bulletPoint.language, index)} type='button'>x</button>
            </div>
          )}
          <button className='shadow right-align' onClick={() => handleAddPoint(bulletPoint.language)} type='button'>+</button>
          
      </div>
      )}
      <button className='shadow right-align' onClick={handleAddBulletPoint} type='button'>+</button>
    </div>
  );
}