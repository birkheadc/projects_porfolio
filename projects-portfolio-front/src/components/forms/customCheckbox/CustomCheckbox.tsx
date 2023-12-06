import * as React from 'react';
import './CustomCheckbox.css';

interface CustomCheckboxProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function CustomCheckbox(props: CustomCheckboxProps): JSX.Element | null {
  return (
    <div className='custom-checkbox-container'>
      <input type='checkbox'></input>
    </div>
  );
}

export default CustomCheckbox;