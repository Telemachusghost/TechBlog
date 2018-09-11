import React, { Component } from 'react';
import './CommentContainer.css';
import Comment from '../components/comment';
import Popup from "reactjs-popup";
import AddComment from '../components/AddComment';
import 'tachyons';

class CommentContainer extends Component {

	constructor (props)  {
    	super(props);
    	this.state = 
    {
        commentsHidden: true,
        commentAddHidden: true,
        comments: this.props.comments
    }
  }

  // This allows child to be update when app fetches
  componentWillReceiveProps(props) {
    this.setState({ comments: props.comments});
    this.forceUpdate();
  }

  toggleHidden() {
      this.setState({
        isHidden: !this.state.isHidden
      })
  }

  toggleCommentPost() {
    this.setState({
      commentAddHidden: !this.state.commentAddHidden
    })
  }

	render() {
		return (
			<div className="CommentContainer">
				{this.state.isHidden && 
            	this.props.comments.filter(comment => comment.post_id === this.props.post_id)
                    					   .sort((a,b) => Date.parse(a.created_at) > Date.parse(b.created_at))
                                 .map((comment, key) => 
        	            					   	<Comment key={key + 200} comment={comment}/>
                    					   	)
              }
              {this.state.isHidden &&  
              <Popup trigger = {
              <button className="AddPost" >
              +
              </button>
              }
              position="bottom center"
              contentStyle={{background:"#cdddf7"}}
              arrow={false}>
              <AddComment onComment={this.props.onComment} postid = {this.props.post_id}/>
              </Popup>
              }
             
            	<button className = "SeeCommentsButton"
            	onClick={this.toggleHidden.bind(this)}>
                	See Comments
            	</button>
            	
			</div>
			 
			
		);
	}
}


export default CommentContainer;
       