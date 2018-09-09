import React, { Component } from 'react';
import './AddComment.css';


class AddComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			nickname: "",
			content: "",
			postid: this.props.postid,
		};

		this.handleChange =
			this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	/*
    This sends the form data as an object back up to
    App.js for sending to api. Data is flushed from form
    after submit is pressed by setting state.
	*/
	handleSubmit(event) {
		event.preventDefault();

		let nickname = this.state.nickname;
		let content = this.state.content;
		let postid = this.state.postid;
		if (!nickname)
			nickname = 'anonymous';

		this.props.onComment({nickname: nickname, content: content, postid: postid});
		this.setState({
			nickname: "",
			content: "",
			postid: ""
		})
	}

	setValue(field, event) {
		let object = {};
		object[field] = event.target.value;
		this.setState(object);
	}


	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					<input 
						type="text" 
						value={this.state.nickname} 
						onChange={this.setValue.bind(this, 'nickname')} 
						placeholder="Nickname"
						/>
				</label>
				<label>
					<textarea
						type="text" 
						value={this.state.content}
						onChange={this.setValue.bind(this, 'content')}
						required
						placeholder="Comment"
					/>
				</label>
				<input className="PostButton" type="submit" value="Post" />
			</form>
		)
	}

}


export default AddComment;
