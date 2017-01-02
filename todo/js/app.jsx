const todo = (state, action) => {
    switch(action.type){
        case "ADD_ITEM":
            return {
                id : action.id,
                text : action.text,
                completed : action.completed
            };
        case "TOGGLE_ITEM":
            if(state.id !== action.id){
                return state;
            }
            return {
                ...state,
                completed : !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch(action.type) {
        case "ADD_ITEM":
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_ITEM":
            return state.map(item => todo(item, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch(action.type){
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

const {combineReducers} = Redux;
const todoApp = combineReducers({
    todos,visibilityFilter
});

const {createStore} = Redux;
const store = createStore(todoApp);

const { Component } = React;
let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }}/>
                <button onClick={() => {
                    store.dispatch({
                       type : "ADD_ITEM",
                       text : this.input.value,
                       id : nextTodoId++
                    });
                    this.input.value = "";
                }}>
                Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id} onClick={() => {
                            store.dispatch({
                                type : "TOGGLE_ITEM",
                                id : todo.id,
                                completed : !todo.completed
                            });
                        }} style={{
                            textDecoration : todo.completed ?
                                "line-through" :
                                "none"
                        }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(<TodoApp todos={store.getState().todos}/>, document.getElementById("container"));
}

store.subscribe(render);
render();
