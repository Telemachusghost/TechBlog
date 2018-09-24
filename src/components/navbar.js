import React, { Component } from 'react';
import CategoryItem from './category_item';
import './navbar.css';


class Navbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories,
      orientation: this.props.orientation
    }
  }

  componentWillReceiveProps(props) {
    this.setState(
      {
        categories: this.props.categories,
        orientation: this.props.orientation
      });
    // this.forceUpdate();
    // console.log(this.state.navbarclass)
  }


  render() {
    return (

      <div className={this.props.orientation ? "LandscapeNavbar" : "Navbar"}>
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