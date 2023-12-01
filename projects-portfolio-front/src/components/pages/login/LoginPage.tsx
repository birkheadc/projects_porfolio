import * as React from 'react';
import './LoginPage.css';
import LoginForm from '../../forms/loginForm/LoginForm';
import { LoginCredentials } from '../../../types/session/loginCredentials/loginCredentials';
import api from '../../../api';
import { Result } from '../../../types/result/result';
import ResultDisplay from '../../forms/resultDisplay/ResultDisplay';
import { SessionContext } from '../../contexts/session/SessionContext';
import { Sessions } from '../../../types/session/session/session';
import helpers from '../../../helpers';

interface LoginPageProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function LoginPage(props: LoginPageProps): JSX.Element | null {

  const [ recentResult, setRecentResult ] = React.useState<Result<string> | undefined>(undefined);

  const { setSession } = React.useContext(SessionContext);
  
  const handleSubmit = async (credentials: LoginCredentials) => {
    const result = await api.session.login(credentials);
    setRecentResult(result);
    const token = result.body;
    if (result.wasSuccess && token != null) {
      setSession(Sessions.LOGGED_IN(token));
      helpers.localStorage.token.store(token);
    }
  }

  return (
    <main className='login-page-wrapper'>
      <h1 className='center'>Please Login</h1>
      <ResultDisplay result={recentResult} />
      <LoginForm submit={handleSubmit}/>
    </main>
  );
}

export default LoginPage;