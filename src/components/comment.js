import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {

  convertUTCDateToLocalDate(d) {
  	let date = new Date(d);
    let newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
  }

	render() {
		return (
			<div className='Comment'>
			<div className='CommentNickname'>
				{this.props.comment.nickname} <br/>
				<small>{this.convertUTCDateToLocalDate(this.props.comment.created_at).toString().slice(0,25)}</small>
			</div>
			<div className='CommentContent'>
			  { this.props.comment.image ? <a className="ThumbnailComment" href={this.props.comment.image}><img className="ImageComment" src={this.props.comment.image}  alt="UserImg"></img></a> : null}
				<div className="CommentQuote">{this.props.comment.content}</div>
			</div>
			</div>
		);
	}
}

export default Comment;