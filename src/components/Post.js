import React, { Component } from 'react';
import './Post.css';


class Post extends Component {
  


  render() {
    return (
     <div className="Post">
         <div className="Title">
            {this.props.post.title}
            <div className="Nickname"> 
            OP:{this.props.post.nickname}
            </div>
         </div>
         <div className="PostContent">
            {this.props.post.POST}
         </div>
     </div>
    );
  }
}

export default Post;