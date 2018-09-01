import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import './AddPost.css';

class AddPost extends Component {
  	
  constructor(props) {
		  super(props);
		  this.state = {
			   value: '',
			   nickname: "",
			   title: "",
			   category: this.props.currentCategory,
			   content: "",
		  };
		  this.handleChange =
			this.handleChange.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
		this.setState(
			{
				category: props.currentCategory,
				nickname: "",
				title: "",
				content: ""
			});
		// console.log(this.state.currentCategory)
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		let nickname = this.state.nickname;
		let content = this.state.content;
    let title = this.state.title;
    let category = this.state.category;
		if (!nickname)
			nickname = 'anonymous';

		this.props.onPost(
			{
				nickname: nickname, 
				content: content, 
				title: title, 
				category: category
			});
	}

	setValue(field, event) {
		let object = {};
		object[field] = event.target.value;
		this.setState(object);
	}

  render() {
  	return (
  		<Popup 	trigger = {
              <button >
              Add Post
              </button>
              }
              position="left center"
              contentStyle={{
              	width: "25%" 
              }}
              >
              <form className="AddPostForm" onSubmit={this.handleSubmit}>
				<label>
					Nickname<br/>
					<input
   
						type="text" 
						value={this.state.nickname} 
						onChange={this.setValue.bind(this, 'nickname')} 
						/>
				</label>
				<label>
					<br/>Title<br/>
					<input 
						type="text" 
						value={this.state.title} 
						onChange={this.setValue.bind(this, 'title')}
						required
						/>
				</label>
				<label>
					<br/>Post<br/>
					<textarea
						type="text"
						cols="21"
						rows="4"
						value={this.state.content}
						onChange={this.setValue.bind(this, 'content')}
						required
					/>
				</label>
				<br/>
				<input className="PostButton" type="submit" value="Post" />
			</form>
      </Popup>
    )
  }
   
   
}

export default AddPost;