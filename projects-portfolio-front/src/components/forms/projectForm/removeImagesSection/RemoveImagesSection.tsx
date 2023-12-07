import * as React from 'react';
import './RemoveImagesSection.css';
import { OldImageStatus } from '../../../../types/project/oldImageStatus';

interface RemoveImagesSectionProps {
  images: string[] | undefined,
  update: (oldImages: OldImageStatus[]) => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function RemoveImagesSection(props: RemoveImagesSectionProps): JSX.Element | null {

  const [oldImages, setOldImages] = React.useState<OldImageStatus[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.name;
    const remove = event.currentTarget.checked;
    
    setOldImages(o => {
      const newValue = [...o];

      const oldImage = o.find(element => element.image === image);
      if (oldImage != null) oldImage.remove = remove;

      return newValue;
    })
  }

  React.useEffect(function populateOldImages() {
    if (props.images == null) return;
    const newValue: OldImageStatus[] = [];
    props.images.forEach(element => {
      newValue.push({ image: element, remove: false });
    });
    setOldImages(newValue);
  }, [ props.images ]);

  if (props.images == null || props.images.length < 1) {
    return null;
  }
  return (
    <div className='remove-images-section-wrapper inline-label-wrapper'>
      <label>Remove Images</label>
      {props.images.map(
        image =>
        <div key={`remove-images-sub-section-key-${image}`} className='remove-images-section-sub-section'>
          <img width={400} height={300} src={image}></img>
          <div>
            <label htmlFor={`remove-checkbox-${image}`}>Remove</label>
            <input className='checkbox' id={`remove-checkbox-${image}`} name={image} type='checkbox' checked={isOldImageKeep(oldImages, image)} onChange={handleChange}></input>
          </div>
        </div>
      )}
    </div>
  );
}

function isOldImageKeep(oldImages: OldImageStatus[], image: string) {
  const oldImage = oldImages.find(o => o.image === image);
  return oldImage?.remove ?? false;
}

export default RemoveImagesSection;