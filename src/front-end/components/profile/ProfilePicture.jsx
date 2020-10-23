import React, { Component } from "react";
import { getUserPicture, setUserPicture } from "./ProfilePictureCalls";
import "./ProfilePicture.css";

const VIEW = "View",
  EDIT = "Edit",
  SAVE = "Save",
  CANCEL = "Cancel";

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: VIEW,
      org: "",
      src: "",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    //get user picture from storage before render
    var image = getUserPicture(this.props.username);
    this.setState({
      org: image,
      src: image,
    });
  }

  handleEdit() {
    console.log("Profile Picture edit");
    this.setState({ mode: EDIT });
  }

  handleSave() {
    console.log("Profile About save");
    //change message in database
    setUserPicture(this.state.username, this.state.src);
    //if successful, change message in state
    this.setState({ org: this.state.src });

    this.setState({ mode: VIEW });
  }

  handleCancel() {
    console.log("Profile About cancel");

    //reset editMessage
    this.setState({ src: this.state.org });

    this.setState({ mode: VIEW });
  }

  handleChange(e) {
    this.setState({ src: e.target.value });
  }

  render() {
    return (
      <div className="ProfilePicture">
        <ProfilePictureDisplay src={this.state.src} />

        {this.state.mode === EDIT ? (
          <ProfilePictureSubmit
            name="Profile Picture Submit"
            value={this.state.src}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
            onChange={this.handleChange}
          />
        ) : (
          <ProfilePictureEdit name="Edit" onClick={this.handleEdit} />
        )}
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
        onChange={props.onChange}
      />
      <div className="ProfilePictureButtonContainer">
        <button
          type="button"
          className="ProfilePictureCancel"
          onClick={props.onCancel}
        >
          {CANCEL}
        </button>
        <button
          type="button"
          className="ProfilePictureSave"
          onClick={props.onSave}
        >
          {SAVE}
        </button>
      </div>
    </form>
  );
}
export default ProfilePicture;
