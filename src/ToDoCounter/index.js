import React from 'react';
import './ToDoCounter.css'
import { ToDoContext } from '../ToDoContext';

function ToDoCounter() {

    const { totalToDoTasks, completedToDoTasks } = React.useContext(ToDoContext);

    return (
        <h1 className='ToDoCounter'>You have completed {completedToDoTasks} out of {totalToDoTasks} to-do task</h1>
    );
}

export { ToDoCounter };