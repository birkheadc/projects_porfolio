import * as React from 'react';
import { SessionContext } from '../../contexts/session/SessionContext';
import { Sessions } from '../../../types/session/session/session';
import helpers from '../../../helpers';
import { useNavigate } from 'react-router-dom';

import './LogoutPage.css';

interface ILogoutProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function LogoutPage(props: ILogoutProps): JSX.Element | null {
  const nav = useNavigate();
  const { setSession } = React.useContext(SessionContext);
  

  React.useEffect(function logoutOnMount() {
    setSession(Sessions.LOGGED_OUT);
    helpers.localStorage.token.clear();
    nav('/');
  }, []);

  return (
    <main className='logout-page-wrapper'>
      <h1>Logging out...</h1>
    </main>
  );
}