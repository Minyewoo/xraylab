import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import DashboardPinned from './components/dashboard/DashboardPinned'
import SnapshotDetails from './components/snapshots/SnapshotDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateSnapshot from './components/snapshots/CreateSnapshot'
import Home from './components/home/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard/all' component={Dashboard} />
          <Route path='/dashboard/pinned' component={DashboardPinned} />
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
