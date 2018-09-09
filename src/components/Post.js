import React, { Component } from 'react';
import './Post.css';


class Post extends Component {
  

  convertUTCDateToLocalDate(d) {
    let date = new Date(d);
    let newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
  }


  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post
    }
  }

  componentWillReceiveProps(props) {
    this.setState(
    {
      post: this.props.post
    });
    // console.log(this.state.currentCategory)
  }

  
  render() {
    return (
     <div className="Post">
         <div className="Title">
            <small className="Date">{this.convertUTCDateToLocalDate(this.state.post.created_at).toString().slice(0,25)}</small>
            <small className="Date Replies">Replies:{this.state.post.popularity}</small>
            {this.state.post.title}
            <div className="Nickname"> 
            OP:{this.state.post.nickname}
            </div>
         </div>
         <div className="PostContent">
            {this.state.post.POST}
         </div>
     </div>
    );
  }
}

export default Post;