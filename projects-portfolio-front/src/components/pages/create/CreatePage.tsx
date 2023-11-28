import * as React from 'react';
import './CreatePage.css'

interface ICreatePageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function CreatePage(props: ICreatePageProps): JSX.Element | null {
  return (
    <main className='create-page-wrapper'>
      <h1 className='center'>Create New Project</h1>
    </main>
  );
}