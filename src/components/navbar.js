import React, { Component } from 'react';
import CategoryItem from './category_item';
import './navbar.css';


class Navbar extends Component {
  
  render() {
    return (
      <div className="Navbar">

      {this.props.categories.map(function(category, i) {
        
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