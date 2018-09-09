import React, { Component } from 'react';
import CategoryItem from './category_item';
import './navbar.css';


class Navbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories
    }
    
  }

  componentWillReceiveProps(props) {
    this.setState(
      {
        categories: this.props.categories,
      });
    
  }

  render() {
    return (
      <div className="Navbar">

      {this.props.categories.sort((a,b) => a.popularity < b.popularity)
                            .map(function(category, i) {
        
        return <CategoryItem 
                key={i} 
                category={category.category} 
                onClick={this.props.onChange}
                />
      }, this)
      }
      </div>
    );
  }
}


export default Navbar;