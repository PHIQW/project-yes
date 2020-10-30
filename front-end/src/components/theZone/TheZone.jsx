//Should probably have the main app pass user data when login auth success
//redirect function empty for now, not sure how to redirect in react -> maybe render a new page? 
import React from "react";
import "./TheZone.css";
import ScoreTicker from './ScoreTicker';
import TheZoneCreatePost from './TheZoneCreatePost';
import TheZonePostList from './TheZonePostList';


class TheZone extends React.Component{
  constructor(props) {
      super(props);
  }
  
  render() {
    return (
      <div>
        <div className="TheZoneContainer"> 
          <button className="redirect" onClick={this.props.redirectToTrivia}>Trivia</button>
          <button className="redirect" onClick={this.props.redirectToPicksAndPredictions}>Picks & Predictions</button>
          <button className="redirect" onClick={this.props.redirectToDebate}>Debate</button>
        </div>
        <TheZoneCreatePost />
        <TheZonePostList />
      </div>
    )
  }
}

export default TheZone;