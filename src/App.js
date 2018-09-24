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

  componentWillMount() {
    if (window.orientation === 90) {
      this.setState(
      {
        landscape: true
      })
    }
    else {
      this.setState({
        landscape: false
      })
    }
  }

  componentDidMount() {
    this.updateComments();
    this.updateCategories();
    this.updatePosts();
    window.addEventListener("orientationchange", function () {
      if (window.orientation === 90) {
        this.setState(
          {
            landscape: true 
          }
        );
      } else {
        this.setState(
          {
            landscape: false
          }
        );
      }
    }.bind(this)); 
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
      categories = categories.sort(function compare(a, b) {
                                      if (b.popularity < a.popularity) return -1;
                                      if (b.popularity > a.popularity) return 1;
                                      if (b.category > a.category) return -1;
                                      if (b.category < a.category) return 1; 
                                      return 0;
                            })  
      this.setState({ categories: categories, tempCategories: categories, currentCategory: categories[0].category})
      // this.forceUpdate();
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
  Method that is called when the category is changed by selecting a category in the navbar
  */
  onCategoryChange = (value) => {
    this.setState({currentCategory: value.category});
    this.forceUpdate();
  }
  
  /*
  Adds a post to server image filename is present in form data
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
  Adds a comment and sends the file data portion to onImageUpload
  if no image is present the error is logged to console through server
  */
  PostComment = (form) => {
    this.onImageUpload(form.data);
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
  Adds a category to the SQL schema
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
  
  /*
  Method used when image is uploaded which sends a image file to node.js in order to be transferred to server
  */
  onImageUpload = (data) => {
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
        	<Navbar 
            categories={this.state.categories} 
            onChange={this.onCategoryChange} 
            orientation={this.state.landscape}
          />
        </div>
        <div className="Controls">
          <AddPost 
            onPost={this.AddPost} 
            currentCategory={this.state.currentCategory}
            onImageUpload={this.onImageUpload}
          />
          <AddCategory
          onCategoryAdd={this.AddCategory}
          />
          <SearchBox  
            onSearch={this.onSearchCategories} 
            placeholder=" Search Categories" 
            size="13" 
            max="256"
          />
          <SearchBox  
            onSearch={this.onSearchPosts} 
            placeholder=" Search Posts" 
            size="13" 
            max="256"
          />
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
