import * as React from 'react';
import './PrimaryNav.css'
import { NavLink } from 'react-router-dom';
import { SessionContext } from '../contexts/session/SessionContext';
import { SessionStatus } from '../../types/session/session/session';

interface IPrimaryNavProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function PrimaryNav(props: IPrimaryNavProps): JSX.Element | null {

  const { session } = React.useContext(SessionContext);

  return (
    <nav>
      <ul>
        <li><NavLink to='/browse'>Home</NavLink></li>
        { session.status === SessionStatus.LOGGED_IN 
          ? <>
              <li><NavLink to='/create'>Create New</NavLink></li>
              <li><NavLink to='/logout'>Logout</NavLink></li>
            </>
          : <>
              <li><NavLink to='/login'>Login</NavLink></li>
            </>
        }
        
      </ul>
    </nav>
  );
}