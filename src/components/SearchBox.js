import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
	  constructor(props) {
  	  super(props);
		  this.state = {
			   searchTerm: '',
		   };
		   this.handleChange = this.handleChange.bind(this);
    

    }
  
  handleChange(event) {
  
    this.props.onSearch({
    	searchTerm: event.target.value
    })
	}


	setValue(field, event) {
		let object = {};
		object[field] = event.target.value;
		this.setState(object);
	}

	render() {
		return ( 
        <form >
			    <input
			      className="SearchBox"
						type="text" 
						onKeyUp= {this.handleChange}
						placeholder={this.props.placeholder}
						size={this.props.size}
						max={this.props.max}
						required
					/>
        </form>

		)
	}
}

export default SearchBox;