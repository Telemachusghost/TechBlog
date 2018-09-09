import React, { Component } from 'react';
import './AddCategory.css';
import Popup from 'reactjs-popup';


class AddCategory extends Component {
	  constructor(props) {
  	  super(props);
		  this.state = {
			   value: '',
         category: ''
		   };
		   this.handleChange = this.handleChange.bind(this);
		   this.handleSubmit = this.handleSubmit.bind(this);
    

    }
  
  handleChange(event) {
    this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

    let category = this.state.category;
		

		this.props.onCategoryAdd(
			{
				category: category
			});
		this.setState(
		  {
        category: ""
		  }
		)
	}

	setValue(field, event) {
		let object = {};
		object[field] = event.target.value;
		this.setState(object);
	}

	render() {
		return (
	    <Popup trigger = {
              <button className="AddCatButton">
              Add Category
              </button>
              }
              position="bottom center"
              contentStyle={{padding:"0px", width:"50%", margin:"0px", background:"#cdddf7"}}
              arrow={false}
              >
        <form onSubmit={this.handleSubmit}>
			    <input 
						type="text" 
						value={this.state.category} 
						onChange={this.setValue.bind(this, 'category')} 
						placeholder="Category"
						size="11"
						max="24"
						required
					  />
				  <input className="PostButton" type="submit" value="Add Category" />
			  </form>

      </Popup> 
		)
	}
}

export default AddCategory;