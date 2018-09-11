import React, { Component } from 'react';
import CategoryItem from './category_item';
import './navbar.css';


class Navbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories,
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
      {console.log(this.props.categories.sort((a,b) => b.popularity -  a.popularity   ))}
      {this.props.categories.sort(function compare(a, b) {
                                      if (b.popularity < a.popularity) return -1;
                                      if (b.popularity > a.popularity) return 1;
                                      if (b.category > a.category) return -1;
                                      if (b.category < a.category) return 1; 
                                      return 0;
                                  })  
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