import React from "react";

import { ToDoContext } from "../ToDoContext";
import { ToDoCounter } from '../ToDoCounter';
import { ToDoSearch } from '../ToDoSearch';
import { ToDoList } from '../ToDoList';
import { ToDoItem } from '../ToDoItem';
import { CreateToDoButton } from '../CreateToDoButton';

import { Modal } from '../Modal'
import { ToDoForm } from "../ToDoForm";

function AppUI() {

    const {
        error,
        loading,
        searchedToDoTasks,
        completeToDoTasks,
        deleteToDoTasks,
        openModal,
        setOpenModal
    } = React.useContext(ToDoContext);

    return (
        <React.Fragment>
            <ToDoCounter />
            <ToDoSearch />
            <ToDoList>

                {error && <h2 className="msg">Panic, there has been an error</h2>}
                {loading && <h2 className="msg">We are loading, do not panic</h2>}
                {(!loading && !searchedToDoTasks.length) && <h2 className="msg">Create your first task, please</h2>}

                {searchedToDoTasks.map(task => (
                    <ToDoItem
                        key={task.text}
                        text={task.text}
                        completed={task.completed}
                        onComplete={() => completeToDoTasks(task.text)}
                        onDelete={() => deleteToDoTasks(task.text)}
                    />
                ))};
            </ToDoList>
            {!!openModal && (
                <Modal>
                    <ToDoForm />
                </Modal>
            )}
            <CreateToDoButton
                setOpenModal={setOpenModal}
            />
        </React.Fragment>
    );
}

export { AppUI };