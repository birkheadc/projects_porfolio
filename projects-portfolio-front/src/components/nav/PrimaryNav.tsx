import * as React from 'react';
import './PrimaryNav.css'
import { NavLink } from 'react-router-dom';

interface IPrimaryNavProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function PrimaryNav(props: IPrimaryNavProps): JSX.Element | null {
  return (
    <nav>
      <ul>
        <li><NavLink to='/browse'>Home</NavLink></li>
        <li><NavLink to='/create'>Create New</NavLink></li>
      </ul>
    </nav>
  );
}