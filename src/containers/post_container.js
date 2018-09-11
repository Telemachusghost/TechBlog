import React, { Component } from 'react';
import './post_container.css';
import Post from '../components/Post';
import CommentContainer from'./CommentContainer'; 


class PostContainer extends Component {


	constructor(props) {
		super(props);
		this.state = {
			comments: this.props.comments,
			currentCategory: this.props.category,
			popFactor: 86267286 // This is roughly the Date.parse value of a day
		}
	}

	componentWillReceiveProps(props) {
		this.setState(
			{
				comments: props.comments,
				currentCategory: props.category
			});
		// console.log(this.state.currentCategory)
	}

	render() {
		return  <div className="PostContainer"> 
		{
			this.props.posts.filter(post => post.CATEGORY.trim() === this.state.currentCategory.trim())
							.sort((a,b) => (Date.parse(a.created_at) + this.state.popFactor*a.popularity) < (Date.parse(b.created_at) + this.state.popFactor*b.popularity))
							.map((post, i) => {
							return (
							<div key={post.id} className="container">
								<div key={i + 100} className="FeaturedPost">
								<Post key={post.id + 101} post={post} />
								</div>
								<CommentContainer 
								key={post.id+2} 
								post_id={post.id} 
								comments={this.props.comments}
								onComment={this.props.onComment}
								/>
							</div>
							);
			})}
		</div>
		
	}
}

export default PostContainer;