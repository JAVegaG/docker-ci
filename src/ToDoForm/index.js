import React from 'react'
import { ToDoContext } from '../ToDoContext'
import './ToDoForm.css'

function ToDoForm() {

    const [newToDoTask, setNewToDoTask] = React.useState('');

    const {
        addToDoTask,
        setOpenModal,
    } = React.useContext(ToDoContext);

    const onChange = (event) => {
        setNewToDoTask(event.target.value);
    };

    const onCancel = () => {
        setOpenModal(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        addToDoTask(newToDoTask);
        setOpenModal(false);
        setNewToDoTask('');
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Type a new task</label>
            <textarea
                value={newToDoTask}
                onChange={onChange}
                placeholder="New Task"
            />
            <div className="ToDoForm-buttonContainer">
                <button
                    type="button"
                    className="ToDoForm-button ToDoForm-button--cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="ToDoForm-button ToDoForm-button--add"
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export { ToDoForm }