import * as React from 'react';
import { Routes } from 'react-router-dom';

interface IPagesRouterProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function PagesRouter(props: IPagesRouterProps): JSX.Element | null {
  return (
    <Routes>
      <Route />
    </Routes>
  );
}