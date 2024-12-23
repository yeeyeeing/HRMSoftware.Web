/*
import { useState } from 'react';
import TimePicker from 'react-time-picker';

function MyApp() {
    const [value, onChange] = useState('10:00');

    return (
        <div>
            < TimePicker onChange={onChange} value={value} />
        </div>
    );
}
export default MyApp;
*/
import React from 'react';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, Serenity.is!</h1>
        <p>This is my React component.</p>
      </div>
    );
  }
}

export default MyComponent;
