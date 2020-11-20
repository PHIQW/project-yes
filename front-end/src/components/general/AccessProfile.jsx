import React, { Component } from 'react';
import {getUserPicture} from '../../api/ProfileCalls';
import './AccessProfile.css';

/*
props should have username
props should also have handleClick, which is App.handleViewProfile
App.handleViewProfile(username) call should redirect app to profile page

Important:
in App.jsx, in your component add prop handleViewProfile
    <TopNavBar
              ...
              handleViewProfile={this.handleViewProfile}
    />
Example use:
import AccessProfile from '../general/AccessProfile.jsx';
<AccessProfile username="demouser3" handleClick={this.props.handleViewProfile}}/>
<AccessProfile username={username} handleClick={this.props.handleViewProfile}}/>
*/
class AccessProfile extends Component {
    constructor(props){
        super(props);
        this.state = {mode:"U" , picture:""};
    }

    componentDidMount(){
        getUserPicture(this.props.username).then((res)=>{
            this.setState({picture:res.picture});
        }).catch(()=>{
            console.log('Error getting profile picture');
        });
    }

    render() { 
        return <img className="AccessProfileImage" src={this.state.picture} alt={`${this.props.username}'s pic`} onClick={()=>{this.props.handleViewProfile(this.props.username)}}></img>;
    }
}
 
export default AccessProfile;