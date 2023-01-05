import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { LoginPage } from './pages/auth'
import { DashboardPage } from './pages/dashboard'
import { NotFoundErrorPage } from './pages/error'

const App = () => {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/dashboard' exact component={DashboardPage} />
        <Route component={NotFoundErrorPage} />
      </Switch>
    </Router>
    </>
  )
}

export default App;
