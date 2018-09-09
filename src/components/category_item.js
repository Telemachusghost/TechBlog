import React, { Component } from 'react';
import "./category_item.css";


class CategoryItem extends Component {

	handleClick(e) {
		e.preventDefault();
		this.props.onClick({category: this.props.category});
	}

	render() {
		return <div className="CatItem"> <button onClick={this.handleClick.bind(this)}> <h1>{this.props.category}</h1> </button></div>;
	}
}

export default CategoryItem;