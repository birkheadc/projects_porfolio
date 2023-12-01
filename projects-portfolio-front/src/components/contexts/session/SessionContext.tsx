import * as React from 'react';
import { Session, SessionStatus, Sessions } from '../../../types/session/session/session';

type Props = {
  children: React.ReactNode
}

type State = {
  session: Session,
  setSession: React.Dispatch<React.SetStateAction<Session>>
}


export const SessionContext = React.createContext<State>({ session: Sessions.DEFAULT, setSession: () => {} });
export const SessionProvider = ({ children }: Props) => {
  const [ session, setSession ] = React.useState<Session>(Sessions.DEFAULT);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      { children }
    </SessionContext.Provider>
  );
}