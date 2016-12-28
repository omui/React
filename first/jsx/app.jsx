var messages = ["how are you?", "how was your day?"]

var Chat = React.createClass({
	getInitialState : function(){
		return {
			chat : ["Hello Hariom!"],
			inputMsgVal : ""
		}
	},
	formSubmit : function(e){
		e.preventDefault();
		this.setState({
				chat :  messages.length ? this.state.chat.concat([this.refs.msg.value, messages.shift()]) : this.state.chat.concat([this.refs.msg.value]),
				inputMsgVal : ""
			});
	},
	inputChange : function(e){
		this.setState({
			inputMsgVal : e.target.value
		});
	},
	render : function(){
		return (<div>
			{this.state.chat.map(function(msg, index){
				return <p key={index}>{msg}</p>
			})}
			<form onSubmit={this.formSubmit} ref="form">
				<input type="text" placeholder="type here.." onChange={this.inputChange} value={this.state.inputMsgVal} ref="msg"/>
			</form>
		</div>);
	}
});

ReactDOM.render(<Chat/>, document.getElementById("container"));