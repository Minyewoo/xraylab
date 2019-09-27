import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SnapshotDetails from './components/snapshots/SnapshotDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateSnapshot from './components/snapshots/CreateSnapshot'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/snapshot/:id' component={SnapshotDetails} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/create' component={CreateSnapshot} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
