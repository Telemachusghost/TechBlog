import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
	render() {
		return (
			<div className='Comment'>
			<div className='CommentNickname'>
				{this.props.comment.nickname}
			</div>
			<div className='CommentContent'>
				{this.props.comment.content}
			</div>
			</div>
		);
	}
}

export default Comment;