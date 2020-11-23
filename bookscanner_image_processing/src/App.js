import React from 'react'
import {
  Link,
  Route,
  useHistory,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom'
import Home from './pages/home'
import intro from './pages/intro'
import detail from './pages/detail'
import './App.css'

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route exact path="/" component={intro} />
          <Route path="/home" component={Home} />
          <Route path="/detail" component={detail} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
