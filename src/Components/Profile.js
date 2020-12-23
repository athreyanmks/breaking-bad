import React, { Component } from 'react'

export class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             profile : []
        }
    }
    
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-sm-6'>IMG</div>
                    <div className='col-sm-6'>Name</div>
                </div>
                <div className='row'>DOB</div>
                <div className='row'>OCC</div>
                <div className='row'>Status</div>
                <div className='row'>Nickname</div>
                <div className='row'>Actor</div>
                <div className='row'>Seasons</div>
                <div className='row'>Quotes</div>
            </div>
        )
    }
}

export default Profile
