import React, { Component } from 'react';

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
						type="text" 
						onKeyUp= {this.handleChange}
						placeholder={this.props.placeholder}
						size="15"
						max="256"
						required
					/>
        </form>

		)
	}
}

export default SearchBox;