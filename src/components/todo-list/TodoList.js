import React from "react";
import TodoListItem from "../todo-list-item";
import './TodoList.css';
const AppList = ({todos, onDeleted, onEdited, onToggleImportant, onToggleDone}) => {


    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem {...itemProps}
                onDeleted={() => onDeleted(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleDone={() => onToggleDone(id)}
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default AppList;