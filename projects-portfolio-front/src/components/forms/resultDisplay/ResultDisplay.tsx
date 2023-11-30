import * as React from 'react';
import './ResultDisplay.css';
import { Result } from '../../../types/result/result';
import { error } from 'console';

interface ResultDisplayProps {
  result: Result | null
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ResultDisplay(props: ResultDisplayProps): JSX.Element | null {

  const result = props.result;

  if (result == null) return null;

  return (
    <div className='result-display-wrapper'>
      <h2 className={result.wasSuccess ? 'success' : 'error'}>{result.wasSuccess ? 'Success' : 'Failed'}</h2>
      {result.errors.map(
        (error, index) =>
        <React.Fragment key={`error-${index}`}>{error.message && <span key={`error-${index}`} className='error'>{error.message}</span>}</React.Fragment>
      )}
    </div>
  );
}

export default ResultDisplay;