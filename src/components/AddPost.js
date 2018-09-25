import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import './AddPost.css';

class AddPost extends Component {
  	
  constructor(props) {
		  super(props);
		  this.state = {
			   value: "",
			   nickname: "",
			   title: "",
			   category: this.props.currentCategory,
			   content: "",
			   file: ""
		  };
		  this.handleChange = this.handleChange.bind(this);
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
	    let file = "";
	    let fileName = "";
	    const data = new FormData();
	    if (this.uploadInput.files[0]) {
			  fileName = this.uploadInput.files[0].name;
	      data.append('file', this.uploadInput.files[0])
	    }
	    console.log(file);
	    console.log(fileName);
			// console.log(data);
			if (!nickname)
				nickname = 'anonymous';

			this.props.onPost(
				{
					nickname: nickname, 
					content: content, 
					title: title, 
					category: category,
					fileName: fileName
				});

			this.props.onImageUpload(data);

			this.setState(
		      {
		      	nickname: "",
		      	content: "",
		      	title: ""
		      }
		  )
	}

	setValue(field, event) {
		let object = {};
		object[field] = event.target.value;
		this.setState(object);
	}

  render() {
  	return (
  		<Popup className="AddPostComponent"	trigger = {
              <button className="AddPostButton">
              Add Post
              </button>
              }
              position="bottom center"
              contentStyle={{padding:"0px", width:"50%", margin:"0px", background:"#cdddf7"}}
              arrow={false}
              >
              <form className="AddPostForm" onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						value={this.state.nickname} 
						onChange={this.setValue.bind(this, 'nickname')} 
						placeholder="Nickname"
						size="11"
						/>
						<br/>
					<input 
						type="text" 
						value={this.state.title} 
						onChange={this.setValue.bind(this, 'title')}
						required
						placeholder="title"
						size="11"
						required
						/>
						<br/>
					<textarea
						type="text"

						value={this.state.content}
						onChange={this.setValue.bind(this, 'content')}
						required
						placeholder="Post"
						cols="26"
						required
					/>
					<br/>
					<input className="ImageUpload"
					  ref={(ref) => {this.uploadInput = ref;}}
            type="file"
            size="11"
					/>
					<br/>
				<input className="PostButton" type="submit" value="Post" />
			</form>
      </Popup>
    )
  }
   
   
}

export default AddPost;