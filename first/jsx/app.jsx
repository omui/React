var Hello = React.createClass({
	getInitialState : function() {
		return { 
			messages : ["Hello Hariom!", "how are you?", "how was your day?"],
			messageIndex : 0,
			responses : []			
		};	
	},
	render : function(){
		return <div>
				for(var i = 0; i <= this.state.messageIndex; i++){
					<Message message={this.state.messages[i]} response={this.getResponseMessage()}/>
				}				
				<form onSubmit={this.submitMessage}>
					<input type="text" placeholder="type here..." ref="response"/>
				</form>
			</div>;
	},
	getResponseMessage : function(){
		//debugger;		
		var responseMessage = "";
		if(this.state.messageIndex > 0){
			responseMessage = this.state.responses[this.state.messageIndex - 1];
		}
		return responseMessage;
	},
	submitMessage : function(e){
		//debugger;
		e.preventDefault();			
		this.setState({
			responses : this.state.responses.concat([this.refs.response.value]),
			messageIndex : this.state.messageIndex + 1
		});		
	}
});

var Message = React.createClass({
	render : function(){
		return <div>
			<em>{this.props.message}</em>
			<p>{this.props.response}</p>
		</div>
	}
});

ReactDOM.render(<Hello/>, document.getElementById("container"));