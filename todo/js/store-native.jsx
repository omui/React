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

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
              nextState[key] = reducers[key](
                state[key],
                  action
              )
              return nextState;
            },
            {}
        );
    }
}
//const {combineReducers} = Redux;

//const todoApp = (state = {}, action) => {
//    return {
//        todos : todos(
//            state.todos,
//            action
//        ),
//        visibilityFilter : visibilityFilter(
//            state.visibilityFilter,
//            action
//        )
//    }
//};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});


const createStore = (reducer) => {
    let state = undefined;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return listeners.filter((l => l !== listener));
    }

    dispatch({});

    return {getState, dispatch, subscribe}
}

//const {createStore} = Redux;

const store = createStore(todoApp);


console.log("app initialized");
console.log(store.getState());
console.log("add item");
store.dispatch({
    type : "ADD_ITEM",
    id : 0,
    text : "first item",
    completed : false
});
console.log(store.getState());
console.log("item added");
store.dispatch({
   type : "SET_VISIBILITY_FILTER",
   filter: "SHOW_COMPLETED"
});
console.log(store.getState());
