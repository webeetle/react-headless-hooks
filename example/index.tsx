import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDropdown } from '../.';

const App = () => {
  const { trigger, list, isListOpen } = useDropdown();

  return (
    <>
      <div>
        <button {...trigger}>Open Dropdown</button>
      </div>
      {isListOpen && (
        <ul style={{ border: '1px solid black', padding: 3 }} {...list}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
