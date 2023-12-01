export type Session = {
  status: SessionStatus,
  token?: string | undefined
}

export enum SessionStatus {
  CHECKING = 0,
  LOGGED_OUT = 1,
  LOGGED_IN = 2
}

export class Sessions {
  static DEFAULT: Session = {
    status: SessionStatus.CHECKING,
    token: undefined
  }

  static LOGGED_OUT: Session = {
    status: SessionStatus.LOGGED_OUT,
    token: undefined
  }

  static LOGGED_IN(token: string): Session {
    return {
      status: SessionStatus.LOGGED_IN,
      token
    }
  }
}