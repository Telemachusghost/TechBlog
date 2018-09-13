import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo';
import Navbar from './components/navbar';
import AddPost from './components/AddPost';
import AddCategory from './components/AddCategory';
import SearchBox from './components/SearchBox';
import PostContainer from './containers/post_container';
import Footer from "./components/Footer";
class App extends Component {
  
  /*
  Initializes initial state keeps track of categories, posts, currentcategory and comments
  May be used to keep track of ip in future incase of having user accounts or blocking ips
  */
  constructor() {
    super();
    this.state = {
      posts: [],
      tempPosts: [],
      categories: [],
      tempCategories: [],
      ip: '',
      currentCategory: 'General',
      comments: []
    }
    this.onSearchPosts =
      this.onSearchPosts.bind(this);
    this.onSearchCategories =
      this.onSearchCategories.bind(this);
    this.onImageUpload =
      this.onImageUpload.bind(this);
  }
  
  /*
  Updates the current posts in the view and forces App.js to rerender the relevant child components
  */
  updatePosts() {
    fetch('api/posts')
    .then(response => response.json())
    .then(posts => 
      {
        this.setState({ posts: posts, tempPosts: posts})
        // console.log(posts)
        this.forceUpdate();
      })
  }

  /*
  Updates the categories based in the view and forces App.js to rerender the relevant child components
  */
  updateCategories() {
    fetch('api/categories')
    .then(response => response.json())
    .then(categories => {
      this.setState({ categories: categories, tempCategories: categories})
      // console.log(categories)
      this.forceUpdate();
    })
  }

  /*
  Updates the comments when called then updates the relevant child components
  */
  updateComments() {
    fetch('api/comments')
    .then(response => response.json())
    .then(comments => {
      this.setState({ comments: comments})
      // console.log(comments);
      this.forceUpdate();
    })
  }
  
  /*
  TODO add doc for this method 
  */
  componentDidMount() {
    this.updateComments();
    this.updateCategories();
    this.updatePosts();
  }
  
  /*
  TODO add doc for this function
  */
  onCategoryChange = (value) => {
    this.setState({currentCategory: value.category});
    this.forceUpdate();
  }
  
  /*
  TODO add doc for this function
  */
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

  /*
  TODO Add doc for this function
  */
  PostComment = (form) => {
    this.onImageUpload(form.data);
    console.log(form.fileName);
    form.data = "";
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
    this.updatePosts();
  }

  
  /*
  TODO Add doc for this function
  */
  AddCategory = (form) => {
    fetch('api/addcategory', {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.updateCategories();
  }

  onImageUpload = (data) => {
    console.log(data);
    fetch('api/upload', {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: data,
    })
  }
   
  /*
  Gets the form from the search box in controls and 
  creates a regex to filter the posts for the pattern
  replaces all non-alphanumeric characters with a blank space
  in order to validate form
  */
  onSearchPosts = (form) => {
    this.setState ({
      posts: this.state.tempPosts
    })
    
    let pattern = form.searchTerm.replace(/[^a-z0-9]/gmi, " ").toLowerCase();
    let re = new RegExp(pattern, "g");
    // console.log(re)
    
    this.setState ({
      posts: this.state.tempPosts.filter((post) => post.title.toLowerCase().match(re) || post.POST.toLowerCase().match(re))
    })

    this.forceUpdate();
    // console.log(this.state.posts);
  }
  
  /*
  TODO add doc
  */
  onSearchCategories = (form) => {
    this.setState ({
      categories: this.state.tempCategories
    })

    let pattern = form.searchTerm.replace(/[^a-z0-9]/gmi, " ").toLowerCase();
    let re = new RegExp(pattern, "g");
    
    this.setState ({
      categories: this.state.tempCategories.filter((category) => category.category.toLowerCase().match(re))
    })


  }

  // TODO Put Category instructions into its own component
  render() {
    return (
      <div className="App">
      	<div className="Header">
        	<Logo />
        	<Navbar categories={this.state.categories} onChange={this.onCategoryChange}/>
        </div>
        {  /*<h1 className="categoryInstructions"><div className="FingerIcon"></div><div className="KeyboardIcon"></div><br/></h1>*/ }
        <div className="Controls">
          <AddPost 
            onPost={this.AddPost} 
            currentCategory={this.state.currentCategory}
            onImageUpload={this.onImageUpload}
          />
          <AddCategory
          onCategoryAdd={this.AddCategory}
          />
          <SearchBox  onSearch={this.onSearchCategories} placeholder=" Search Categories" size="13" max="256"/>
          <SearchBox  onSearch={this.onSearchPosts} placeholder=" Search Posts" size="13" max="256"/>
        </div>
        <div className="Content">
          <PostContainer posts={this.state.posts} 
                         comments={this.state.comments}
                         onComment={this.PostComment}
                         category={this.state.currentCategory}
          />
        </div>
        <Footer />
        
      </div>
    );
  }
}

export default App;
