import React from "react";
import CurrentUser from './CurrentUser';
import logo from "../../resources/sportcredLogo2.png";
import "./TopNavBar.css";

// Need to get back end data for currently logged in user including name and profile pic
class TopNavBar extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <nav className="TopNavBar"> 
        <div className="logoContainer">
          <img className="logo" src={logo} />
        </div>
        <button className="TheZoneButton" onClick={this.props.redirectToTheZone}>The Zone</button>
        <CurrentUser
          currentUser="Dave"
          handleLogout={this.props.handleLogout}
          redirectToProfile={this.props.redirectToProfile}
        />
      </nav>
    )
  }
}

export default TopNavBar;