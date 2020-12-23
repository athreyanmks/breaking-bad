import React, {Component} from 'react';
import Listing from './Listing'

class Mainpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display : true
        }
    }


    render() { 
        // display = 

        return (
            <div className='row'>
                <div className= 'col-sm-12'><Listing search = {this.state.search} category = {this.state.category}/></div>
            </div>
            );
    }
}
 
export default Mainpage;