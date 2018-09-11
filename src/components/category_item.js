import React, { Component } from 'react';

class CategoryItem extends Component {

	handleClick(e) {
		e.preventDefault();
		this.props.onClick({category: this.props.category});
	}

	render() {
		return <div className="CatItem"> <button className="CategoryItem" onClick={this.handleClick.bind(this)}> <h1>{this.props.category}</h1> </button></div>;
	}
}

export default CategoryItem;