import React, { Component } from 'react';
import {LocaleProvider} from 'antd-mobile'
import {HashRouter} from 'react-router-dom'
import Routes from './router.js'
class App extends Component {
  render() {
    return (
      <LocaleProvider>
        <HashRouter>
          <Routes></Routes>
        </HashRouter>
      </LocaleProvider>
    );
  }
}
export default App;
