import * as React from 'react';
import './LoginForm.css';
import { LoginCredentials } from '../../../types/session/loginCredentials/loginCredentials';

interface LoginFormProps {
  submit: (credentials: LoginCredentials) => Promise<void>
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function LoginForm(props: LoginFormProps): JSX.Element | null {

  const [ isActive, setActive ] = React.useState<boolean>(true);
  const [ credentials, setCredentials ] = React.useState<LoginCredentials>({ username: '', password: ''});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const newCredentials = {...credentials};
    newCredentials[name] = value;
    setCredentials(newCredentials);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActive(false);
    (document.activeElement as HTMLElement)?.blur()
    await props.submit(credentials);
    setActive(true);
  }

  return (
    <form className={`login-form-wrapper ${isActive ? '' : 'disabled'}`} onSubmit={handleSubmit}>
      <div className='inline-label-wrapper'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' onChange={handleChange} value={credentials.username}></input>
      </div>
      <div className='inline-label-wrapper'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' onChange={handleChange} value={credentials.password}></input>
      </div>
      <button className='shadow center' type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;