import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from './parts/Layout';
import Home from './Home';
import About from './About';
import Countries from './countries/Countries';

const App = () => (
  <Router>
    <Layout>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/countries" component={Countries} />
      </div>
    </Layout>
  </Router>
);

export default App;
