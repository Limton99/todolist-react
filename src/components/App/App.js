import React, {Component} from 'react';
import AppHeader from "../app-header";
import AppList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import './App.css'
import ItemAddForm from "../item-add-form";

export default class App extends Component{
    newID = 100;

    state = {
        todoData: [
            this.createNewItem('Do something'),
            this.createNewItem('Do something 2'),
            this.createNewItem('Do something 3'),
        ],
        term: '',
        filter: 'all'
    };

    createNewItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.newID++
        };
    };

    addItem = (text) => {
        const newItem = this.createNewItem(text);

        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem]

            return {
                todoData: newArray
            };
        });


    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
                todoData: newArray
            };
        });
    };




    search = (items, term) => {
        if(term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }
    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });

    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount } />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>

                <AppList todos={visibleItems}
                         onDeleted={this.deleteItem}
                         onToggleImportant={this.onToggleImportant}
                         onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onButtonAdded={this.addItem}/>
            </div>
        );
    }

};



