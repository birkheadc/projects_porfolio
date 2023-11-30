import * as React from 'react';
import { SessionToken } from '../../../types/session/sessionToken/sessionToken';

type Props = {
  children: React.ReactNode
}

type State = {
  sessionToken: SessionToken | undefined,
  setSessionToken: React.Dispatch<React.SetStateAction<SessionToken | undefined>>
}

export const SessionContext = React.createContext<State>({ sessionToken: undefined, setSessionToken: () => {} });
export const SessionProvider = ({ children }: Props) => {
  const [ sessionToken, setSessionToken ] = React.useState<SessionToken | undefined>(undefined);
  return (
    <SessionContext.Provider value={{ sessionToken, setSessionToken }}>
      { children }
    </SessionContext.Provider>
  );
}