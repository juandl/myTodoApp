import React, { useEffect } from 'react';

import { Jumbotron } from 'react-bootstrap';

//Components
import MyTodoList from './components/MyTodoList';

//Utils
import SessionUser from './utils/userSession';

//Styles
import './styles/app.scss';

/**
 * Main component
 */
const AppTodo = () => {
  //Initial Setup
  useEffect(() => SessionUser.set(), []);

  return (
    <main className='main_app'>
      <div className='container'>
        <Jumbotron className='title'>
          <h2>ToDo, Enhance your productivity.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            imperdiet vehicula leo, et fermentum magna laoreet id
          </p>
        </Jumbotron>

        <div className='row'>
          <div className='col-md-12'>
            <MyTodoList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppTodo;
