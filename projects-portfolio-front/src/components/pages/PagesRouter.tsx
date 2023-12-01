import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrowsePage from './browse/BrowsePage';
import CreatePage from './create/CreatePage';
import EditPage from './edit/EditPage';
import LoginPage from './login/LoginPage';
import { SessionContext } from '../contexts/session/SessionContext';
import { SessionStatus } from '../../types/session/session/session';
import LogoutPage from './logout/LogoutPage';

interface IPagesRouterProps {
  
}

/**
*
* @returns {JSX.Element | null}
*/
export default function PagesRouter(props: IPagesRouterProps): JSX.Element | null {

  const { session } = React.useContext(SessionContext);
  
  if (session.status === SessionStatus.LOGGED_IN) return (
    <Routes>
      <Route path='/browse' element={<BrowsePage />} />
      <Route path='/create' element={<CreatePage />} />
      <Route path='/edit/*' element={<EditPage />} />
      <Route path='/logout' element={<LogoutPage />} />
      <Route path='*' element={<Navigate to={{ pathname: '/browse' }} replace={true} />} />
    </Routes>
  );

  return (
    <Routes>
      <Route path='/browse' element={<BrowsePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<Navigate to={{ pathname: '/browse' }} replace={true} />} />
    </Routes>
  );
}