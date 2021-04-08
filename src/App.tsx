import React from 'react';
import logo from './assets/logo.svg';
import './App.scss';

const App = () => {
  const obj = {
    name: '学习 React'
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          编辑 <code>src/App.tsx</code> 代码，接下来就可以看到它了。
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {obj.name}
        </a>
      </header>
    </div>
  );
};

export default App;
