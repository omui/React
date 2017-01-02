"use strict";

var messages = ["how are you?", "how was your day?"];

var Chat = React.createClass({
   displayName: "Chat",

   getInitialState: function getInitialState() {
      return {
         chat: ["Hello Hariom!"],
         inputMsgVal: ""
      };
   },
   formSubmit: function formSubmit(e) {
      e.preventDefault();
      this.setState({
         chat: messages.length ? this.state.chat.concat([this.refs.msg.value, messages.shift()]) : this.state.chat.concat([this.refs.msg.value]),
         inputMsgVal: ""
      });
   },
   inputChange: function inputChange(e) {
      this.setState({
         inputMsgVal: e.target.value
      });
   },
   render: function render() {
      return React.createElement(
         "div",
         null,
         this.state.chat.map(function (msg, index) {
            return React.createElement(
               "p",
               { key: index },
               msg
            );
         }),
         React.createElement(
            "form",
            { onSubmit: this.formSubmit, ref: "form" },
            React.createElement("input", { type: "text", placeholder: "type here..", onChange: this.inputChange, value: this.state.inputMsgVal, ref: "msg" })
         )
      );
   }
});

ReactDOM.render(React.createElement(Chat, null), document.getElementById("container"));