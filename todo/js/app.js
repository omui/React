"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var todo = function todo(state, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                id: action.id,
                text: action.text,
                completed: action.completed
            };
        case "TOGGLE_ITEM":
            if (state.id !== action.id) {
                return state;
            }
            return _extends({}, state, {
                completed: !state.completed
            });
        default:
            return state;
    }
};

var todos = function todos(state, action) {
    if (state === undefined) state = [];

    switch (action.type) {
        case "ADD_ITEM":
            return [].concat(_toConsumableArray(state), [todo(undefined, action)]);
        case "TOGGLE_ITEM":
            return state.map(function (item) {
                return todo(item, action);
            });
        default:
            return state;
    }
};

var visibilityFilter = function visibilityFilter(state, action) {
    if (state === undefined) state = "SHOW_ALL";

    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

var _Redux = Redux;
var combineReducers = _Redux.combineReducers;

var todoApp = combineReducers({
    todos: todos, visibilityFilter: visibilityFilter
});

var _Redux2 = Redux;
var createStore = _Redux2.createStore;

var store = createStore(todoApp);

var _React = React;
var Component = _React.Component;

var nextTodoId = 0;

var TodoApp = (function (_Component) {
    _inherits(TodoApp, _Component);

    function TodoApp() {
        _classCallCheck(this, TodoApp);

        _get(Object.getPrototypeOf(TodoApp.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TodoApp, [{
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "div",
                null,
                React.createElement("input", { ref: function (node) {
                        _this.input = node;
                    } }),
                React.createElement(
                    "button",
                    { onClick: function () {
                            store.dispatch({
                                type: "ADD_ITEM",
                                text: _this.input.value,
                                id: nextTodoId++
                            });
                            _this.input.value = "";
                        } },
                    "Add Todo"
                ),
                React.createElement(
                    "ul",
                    null,
                    this.props.todos.map(function (todo) {
                        return React.createElement(
                            "li",
                            { key: todo.id, onClick: function () {
                                    store.dispatch({
                                        type: "TOGGLE_ITEM",
                                        id: todo.id,
                                        completed: !todo.completed
                                    });
                                }, style: {
                                    textDecoration: todo.completed ? "line-through" : "none"
                                } },
                            todo.text
                        );
                    })
                )
            );
        }
    }]);

    return TodoApp;
})(Component);

var render = function render() {
    ReactDOM.render(React.createElement(TodoApp, { todos: store.getState().todos }), document.getElementById("container"));
};

store.subscribe(render);
render();
