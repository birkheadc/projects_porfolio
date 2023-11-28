import * as React from 'react';
import './EditPage.css'

interface IEditPageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function EditPage(props: IEditPageProps): JSX.Element | null {
  return (
    <main className='edit-page-wrapper'>
      <h1 className='center'>Edit Project</h1>
    </main>
  );
}