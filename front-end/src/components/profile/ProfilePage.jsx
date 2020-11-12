import React, { Component } from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileACS from './ProfileACS';
import ProfilePicture from './ProfilePicture';
import ProfileStatus from './ProfileStatus';
import ProfileRadar from './ProfileRadar';
import ProfileSocial from './ProfileSocial';
import { getProfile, updateUserAbout, updateUserPicture, addProfileTracker, 
    deleteProfileTracker, updateUserStatus } from '../../api/ProfileCalls.js';
import './ProfilePage.css';

/*note: currentUser is the user logged in currently
wantedUser is the user whose page is shown*/
const VIEW = 'View',
  EDIT = 'Edit',
  MODE = 'Mode',
  ABOUT = 'About',
  STATUS = 'Status',
  PICTURE = 'Picture',
  SOCIAL = 'Social',
  FOLLOW = 'Follow',
  UNFOLLOW = 'Unfollow',
  NOTFOUND = 'Not Found';

  const calls = {[ABOUT]: updateUserAbout, 
    [STATUS]: updateUserStatus,
    [PICTURE]: updateUserPicture,
    [FOLLOW]: addProfileTracker,
    [UNFOLLOW]: deleteProfileTracker,    
  };

class ProfilePage extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        ACS: 0,
        ACSChange: 0,
        ACSError:false,
        About: '',
        AboutEdit: '',
        AboutMode: VIEW,
        Picture: '',
        PictureEdit: '',
        PictureMode: VIEW,
        Status: '',
        StatusEdit: '',
        StatusMode: VIEW,
        Social: [
            'https://www.facebook.com',
            'https://twitter.com',
            'https://www.instagram.com/',
          ],
        SocialEdit: [
            'https://www.facebook.com',
            'https://twitter.com',
            'https://www.instagram.com/',
          ],
        SocialMode: VIEW,
        CurrentIsFollowing: true,
        CurrentFollowList: [],
        WantedFollowList: []
    };

    //generic functions
    this.GenericHandleEdit = this.GenericHandleEdit.bind(this);
    this.GenericHandleCancel = this.GenericHandleCancel.bind(this);
    this.GenericHandleChange = this.GenericHandleChange.bind(this);
    this.GenericHandleSave = this.GenericHandleSave.bind(this);

    //non-generic functions (call handles might be different)
    this.SocialHandleSave = this.SocialHandleSave.bind(this);
    this.SocialHandleChange = this.SocialHandleChange.bind(this);
    this.RadarHandleFollow = this.RadarHandleFollow.bind(this);
}

updateCurrentFollowing(){
    //should call whenever viewing another user
    //or if current's follow list is changed
    let fol = false;
    let ls = this.state.CurrentFollowList;
    for(let i=0; i<ls.length; i++){
        //updates CurrentIsFollowing if wantedUser is on current user's follow list
        if(ls[i].username === this.props.wantedUser){
            fol = true;
            break;
        }
    }
    this.setState({CurrentIsFollowing: fol,});
}

updateCurrentTracker(){
    //this is for updating current user's tracker after a change
    //expect to get json object with ACS, acs change later
    getProfile(this.props.currentUser).then((profile)=>{
        if(!profile.success){//throw if not successful
            throw new Error("error getting tracker");
        }
        this.setState({
            CurrentFollowList: profile.tracker
        });
        this.updateCurrentFollowing();
    }).catch((error) => {
        //will throw if somethings missing
        console.log('Error with tracker response' + error);
    });
}

updateShownUser(){
    //expect to get json object with ACS, acs change later
    getProfile(this.props.wantedUser).then((profile)=>{
        if(!profile.success){//throw if not successful
            throw new Error("error getting profile");
        }
        this.setState({
            ACS: profile.ACS,
            ACSChange: 0,
            ACSError:false,
            About: profile.about,
            AboutEdit: profile.about,
            AboutMode: VIEW,
            Picture: profile.picture,
            PictureEdit: profile.picture,
            PictureMode: VIEW,
            Status: profile.status,
            StatusEdit: profile.status,
            StatusMode: VIEW,
            Social: [
                'https://www.facebook.com',
                'https://twitter.com',
                'https://www.instagram.com/',
            ],
            SocialEdit: [
                'https://www.facebook.com',
                'https://twitter.com',
                'https://www.instagram.com/',
            ],
            SocialMode: VIEW,
            WantedFollowList: profile.tracker
        });
        //change current follow list if you're getting current user
        if(this.props.editable){
            this.setState({CurrentFollowList: profile.tracker})
        } else {
            this.updateCurrentFollowing();
        }
    }).catch((error) => {
        //will throw if somethings missing
            console.log(error);
            console.log('Error with profile response');
            this.setState({ ACSError: true });
    });
}

componentDidMount() {
    this.updateShownUser();
}

componentDidUpdate(prevProps) {
    if(this.props.wantedUser !== prevProps.wantedUser){
        this.updateShownUser();
    }
}

    GenericHandleEdit(caller){
        if (this.props.editable) {
            console.log(`Profile ${caller} edit`);
            this.setState({ [`${caller}${MODE}`]: EDIT });
          } else {
            console.log('Edit not authorised');
          }
    }

    GenericHandleCancel(caller){
        console.log(`Profile ${caller} cancel`);
        //reset editable field in tate
        //example: {AboutEdit: this.state.About} for updating About
        this.setState({ [`${caller}${EDIT}`]: this.state[`${caller}`],
                        [`${caller}${MODE}`]: VIEW });
    }

    GenericHandleChange(e, caller){
        this.setState({ [`${caller}${EDIT}`]: e.target.value });
    }

    GenericHandleSave(caller){
        console.log(`Profile ${caller} save`);
        //not your profile
        if (!this.props.editable) {
          console.log(`${caller} not authorized`);
          this.GenericHandleCancel(caller);
          return;
        }
        //change field in database
        calls[caller](this.state[`${caller}${EDIT}`]).then((res) => {
            if(res.success){
                //if successful, change field in state based on databaswe
                this.setState({ [`${caller}`]: res.text,
                                [`${caller}${EDIT}`]: res.text,
                                [`${caller}${MODE}`]: VIEW });
            } else {
                throw new Error(`Unsuccessful update to ${caller}`);
            }
        }).catch((error) => {
            //unsuccessful, therefore reset
            this.GenericHandleCancel(caller);
        });
    }

  SocialHandleSave() {
    console.log('Profile Social save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.GenericHandleCancel(SOCIAL);
      return;
    }
    //if successful, change message in state
    this.setState({ Social: this.state.SocialEdit });
    this.setState({ SocialMode: VIEW });
  }

  SocialHandleChange(e, id) {
    var tempLinks = [...this.state.SocialEdit]; //clone array
    tempLinks[id] = e.target.value;
    this.setState({ SocialEdit: tempLinks });
  }

  RadarHandleFollow() {
    //handle current user =(follow/unfollow)> wanted user (page view)
    //same user case, shouldnt happen
    if(this.props.editable){
        return;
    }
    //if current user is following => delete. else not following => add
    if(this.state.CurrentIsFollowing){
        //handle delete
        console.log(`Profile delete ${this.props.wantedUser}`);
        calls[UNFOLLOW](this.props.wantedUser).then((res) => {
            if(res.success || res.reason === NOTFOUND){
                //if successful or not followed, just re-get tracker and recheck if followed
                this.updateCurrentTracker();
            } else {
                throw new Error(`Unsuccessful unfollow to ${this.props.wantedUser}`);
            }
        }).catch((error) => {
            //unsuccessful, therefore dont unfollow
        });
    } else {
        //handle add
        console.log(`Profile add ${this.props.wantedUser}`);
        calls[FOLLOW](this.props.wantedUser).then((res) => {
            if(res.success){
                //if successful or not followed, just re-get tracker and recheck if followed
                this.updateCurrentTracker();
            } else {
                throw new Error(`Unsuccessful follow to ${this.props.wantedUser}`);
            }
        }).catch((error) => {
            //unsuccessful, therefore dont unfollow
        });
    }
  }

  render() {
    return (
      <div className="ProfilePage">
        <ProfilePicture
          editable={this.props.editable}
          mode={this.state.PictureMode}
          picture={this.state.Picture}
          handleEdit={() => this.GenericHandleEdit(PICTURE)}
          handleSave={() => this.GenericHandleSave(PICTURE)}
          handleCancel={() => this.GenericHandleCancel(PICTURE)}
          handleChange={(e) => this.GenericHandleChange(e, PICTURE)}
        />
        <ProfileAbout
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.AboutMode}
          message={this.state.About}
          handleEdit={() => this.GenericHandleEdit(ABOUT)}
          handleSave={() => this.GenericHandleSave(ABOUT)}
          handleCancel={() => this.GenericHandleCancel(ABOUT)}
          handleChange={(e) => this.GenericHandleChange(e, ABOUT)}
        />
        <ProfileStatus
          editable={this.props.editable}
          mode={this.state.StatusMode}
          message={this.state.Status}
          handleEdit={() => this.GenericHandleEdit(STATUS)}
          handleSave={() => this.GenericHandleSave(STATUS)}
          handleCancel={() => this.GenericHandleCancel(STATUS)}
          handleChange={(e) => this.GenericHandleChange(e, STATUS)}
        />
        <ProfileACS
          ACS={this.state.ACS}
          ACSChange={this.state.ACSChange}
          ACSError={this.state.ACSError}
        />
        <ProfileRadar
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          handleViewProfile={this.props.handleViewProfile}
          handleFollow={this.RadarHandleFollow}
          CurrentIsFollowing={this.state.CurrentIsFollowing}
          WantedFollowList={this.state.WantedFollowList}
        />
        <ProfileSocial
          editable={this.props.editable}
          mode={this.state.SocialMode}
          links={this.state.Social}
          handleEdit={() => this.GenericHandleEdit(SOCIAL)}
          handleSave={this.SocialHandleSave}
          handleCancel={() => this.GenericHandleCancel(SOCIAL)}
          handleChange={this.SocialHandleChange}
        />
      </div>
    );
  }
}

export default ProfilePage;
