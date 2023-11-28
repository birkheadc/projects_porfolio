import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrowsePage from './browse/BrowsePage';
import CreatePage from './create/CreatePage';
import EditPage from './edit/EditPage';

interface IPagesRouterProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function PagesRouter(props: IPagesRouterProps): JSX.Element | null {
  return (
    <Routes>
      <Route path='/browse' element={<BrowsePage />} />
      <Route path='/create' element={<CreatePage />} />
      <Route path='/edit/*' element={<EditPage />} />
      <Route path='*' element={<Navigate to={{ pathname: '/browse' }} replace={true} />} />
    </Routes>
  );
}