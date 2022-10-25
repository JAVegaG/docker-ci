import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const ToDoContext = React.createContext();

function ToDoProvider(props) {
    const {
        item: toDoTasks,
        saveItem: saveToDoTasks,
        loading,
        error,
    } = useLocalStorage('TODOTASKS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const completedToDoTasks = toDoTasks.filter(task => !!task.completed).length;
    const totalToDoTasks = toDoTasks.length;

    let searchedToDoTasks = [];

    if (!searchValue.length >= 1) {
        searchedToDoTasks = toDoTasks;
    } else {
        searchedToDoTasks = toDoTasks.filter(task => {
            const taskText = task.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return taskText.includes(searchText);
        });
    }

    const addToDoTask = (text) => {
        const newToDoTasks = [...toDoTasks];
        newToDoTasks.push({
            completed: false,
            text
        });
        saveToDoTasks(newToDoTasks);
    };

    const completeToDoTask = (text) => {
        const toDoIndex = toDoTasks.findIndex(task => task.text === text);
        const newToDoTasks = [...toDoTasks];
        newToDoTasks[toDoIndex].completed = true;
        saveToDoTasks(newToDoTasks);
    };

    const deleteToDoTask = (text) => {
        const toDoIndex = toDoTasks.findIndex(todo => todo.text === text);
        const newToDoTasks = [...toDoTasks];
        newToDoTasks.splice(toDoIndex, 1);
        saveToDoTasks(newToDoTasks);
    };

    return (
        <ToDoContext.Provider value={{
            loading,
            error,
            totalToDoTasks,
            completedToDoTasks,
            searchValue,
            setSearchValue,
            searchedToDoTasks,
            addToDoTask,
            completeToDoTask,
            deleteToDoTask,
            openModal,
            setOpenModal
        }}>
            {props.children}
        </ToDoContext.Provider>
    );
}

export { ToDoContext, ToDoProvider };
