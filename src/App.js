import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Logo from './components/logo';
import Navbar from './components/navbar';
import AddPost from './components/AddPost';
import { setCategories } from './actions';
import PostContainer from './containers/post_container';

class App extends Component {
  
  // const mapStateToProps = state => {
  //   return {
  //     categories: state.getCategory.categories
  //   }
  // }

  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     componentDidMount: (event) => dispatch(setCategories)
  //   }
  // }

  // Simple initial state want to keep track
  // of ip, posts, and categories for now
  constructor() {
    super();
    this.state = {
      posts: [],
      categories: [],
      ip: '',
      currentCategory: 'General',
      comments: []
    }
  }

  updatePosts() {
    fetch('api/posts')
    .then(response => response.json())
    .then(posts => 
      {
        this.setState({ posts: posts})
        // console.log(posts)
        this.forceUpdate();
      })
  }

  updateCategories() {
    fetch('api/categories')
    .then(response => response.json())
    .then(categories => {
      this.setState({ categories: categories})
      // console.log(categories)
    })
  }

  updateComments() {
    fetch('api/comments')
    .then(response => response.json())
    .then(comments => {
      this.setState({ comments: comments})
      // console.log(comments);
      this.forceUpdate();
    })
  }

  componentDidMount() {
    this.updateComments();
    this.updateCategories();
    this.updatePosts();
  }

  onCategoryChange = (value) => {
    this.setState({currentCategory: value.category});
    this.forceUpdate();
    // console.log(this.state);
  }

  PostComment = (form) => {
    fetch('api/postcomment', {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.updateComments();
  }

  AddPost = (form) => {
    fetch('api/addpost', {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.updatePosts();

  }

  render() {
    return (
      <div className="App">
      	<div className="Header">
        	<Logo />
        	<Navbar categories={this.state.categories} onChange={this.onCategoryChange}/>
      	</div>
        <div className="Controls">
          <AddPost 
            onPost={this.AddPost} 
            currentCategory={this.state.currentCategory}
          />
        </div>
        <div className="Content">
          <PostContainer posts={this.state.posts} 
                         comments={this.state.comments}
                         onComment={this.PostComment}
                         category={this.state.currentCategory}
          />
        </div>
      </div>
    );
  }
}

export default App;
