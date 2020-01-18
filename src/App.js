import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ProjectBoard from './components/ProjectBoard';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import { Provider } from "react-redux";
import store from './store';
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Route exact path="/" component={ProjectBoard} />
          <Route exact path="/addProjectTask" component={AddProjectTask} />
          <Route exact path="/update-task/:pt_id" component={UpdateProjectTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
