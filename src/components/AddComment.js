import React, { Component } from 'react';
import './AddComment.css';


class AddComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			nickname: "",
			replytag: "hello",
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
		const data = new FormData();
		let fileName = "";
		if (this.uploadInput.files[0]) {
		  fileName = this.uploadInput.files[0].name;
      data.append('file', this.uploadInput.files[0])
    }

		if (!nickname)
			nickname = 'anonymous';

		this.props.onComment(
			{
				nickname: nickname, 
				content: content, 
				postid: postid,
				fileName: fileName,
				data: data
		  });
		
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
			<form className="CommentForm" onSubmit={this.handleSubmit}>
				<label>
					<input 
						type="text" 
						value={this.state.nickname} 
						onChange={this.setValue.bind(this, 'nickname')} 
						placeholder="Nickname"
						size="14"
						/>
				</label>
				<label>
					<textarea
						type="text" 
						value={this.state.content}
						onChange={this.setValue.bind(this, 'content')}
						required
						placeholder="Comment"
						cols="15"
					>
					  {this.state.replytag}asdfasdf
					</textarea>
				</label>
				<label>
				  	<input className="ImageUpload"
					  ref={(ref) => {this.uploadInput = ref;}}
            type="file"
            size="11"
					/>
				</label>
				<input className="PostButton" type="submit" value="Post" />
			</form>					

		)
	}

}


export default AddComment;
