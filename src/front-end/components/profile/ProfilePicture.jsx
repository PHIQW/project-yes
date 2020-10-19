import React, { Component } from "react";

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = { src: "" };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    console.log("Profile Picture edit");
  }
  render() {
    return (
      <div className="ProfilePicture">
        <ProfilePictureDisplay src={this.state.src} />
        <ProfilePictureEdit name="Edit" onClick={this.handleEdit} />
        <ProfilePictureSubmit
          name="Profile Picture Submit"
          value={this.state.src}
        />
      </div>
    );
  }
}

function ProfilePictureDisplay(props) {
  return (
    <img
      className="ProfilePictureDisplay"
      src={props.src}
      alt="Profile img from User"
    />
  );
}
function ProfilePictureEdit(props) {
  return (
    <button className="ProfilePictureEdit" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function ProfilePictureSubmit(props) {
  return (
    <form className="ProfilePictureSubmit">
      <input
        className="ProfilePictureSubmitBox"
        type="text"
        name={props.name}
        defaultValue={props.value}
      />
    </form>
  );
}

export default ProfilePicture;
