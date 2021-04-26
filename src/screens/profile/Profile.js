import React, { Component } from "react";
import Header from "../../common/header/Header";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import "./Profile.css";

import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import Input from "@material-ui/core/Input";
import Fab from "@material-ui/core/Fab";

const customStyleSheets = theme => ({
  avatarStyle: {
    float: "left",
    width: "250px",
    height: "210px"
  }
});

const editNameModalBody = (
  <div>
    <div>
      <h2 id="simple-modal-title">Edit</h2>
    </div>
    <div>
      <FormControl>
        <InputLabel htmlFor="username" required>
          Full Name
        </InputLabel>
        <Input id="username" type="text" />
      </FormControl>
    </div>
    <br />
    <br />
    <div>
      <Button variant="contained" color="primary">
        UPDATE
      </Button>
    </div>
  </div>
);

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      username: "",
      count_of_posts: 0,
      profile_pic: "https://asia.olympus-imaging.com/content/000107506.jpg",
      fullName: "PRATIK KUMAR",
      modalImageId: 0,
      currentModal: null,
      postsCount: 3,
      followsCount: 1120,
      followedbyCount: 1200,
      displayEditNameModal: "display-none"
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("access-token") === null) {
      this.props.history.push("/");
    }
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open(
      "GET",
      "https://graph.instagram.com/me/media?fields=id,caption&access_token=" +
        sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var response_Received = JSON.parse(this.responseText);
        let number_of_posts = response_Received.data.length;
        for (let i = 0; i < number_of_posts; i++) {
          var id = response_Received.data[i].id;
          that.getPostDetailsForID(id);
        }
      }
    });
  }

  getPostDetailsForID = id => {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open(
      "GET",
      "https://graph.instagram.com/" +
        id +
        "?fields=id,media_type,media_url,username,timestamp,caption&access_token=" +
        sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var response = JSON.parse(this.responseText);
        response.like = false;
        response.likeCount = 7;
        response.comments = [];
        response.className = "none";
        let tags = "";
        let captionData = response.caption.split("#");
        response.caption = captionData[0];
        for (let i = 1; i < captionData.length; i++) {
          tags += "#" + captionData[i] + " ";
        }
        response.hashTags = tags;
        var posts_available = that.state.posts;
        posts_available.push(response);
        that.setState({
          posts: posts_available,
          username: posts_available[0].username,
          count_of_posts: that.state.count_of_posts + 1
        });
      }
    });
  };

  editNameHandler = () => {
    this.setState({ displayEditNameModal: "display-block" });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="main-container">
        <Header
          displaySearch={false}
          displayProfile={true}
          history={this.props.history}
        ></Header>

        <div className="account-data-container">
          <div>
            <Avatar
              src={this.state.profile_pic}
              alt="Profile picture"
              className={classes.avatarStyle}
            />
          </div>
          <div>
            <h2>
              {this.state.posts.length > 0 && this.state.posts[0].username}
            </h2>
            <div className="profile-data-wrapper">
              <div>Posts: {this.state.postsCount}</div>
              <div>Follows: {this.state.followsCount}</div>
              <div>Followed By: {this.state.followedbyCount}</div>
            </div>
            <div className="profile-name">
              {this.state.fullName}
              <Fab
                color="secondary"
                aria-label="edit"
                className="fab-button"
                onClick={this.editNameHandler}
              >
                <EditIcon />
              </Fab>
              {/* {
                <div className={this.state.displayEditNameModal}>
                  <Modal
                    open={true}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {editNameModalBody}
                  </Modal>
                </div>
              } */}
            </div>
          </div>
        </div>
        <div class="profile-data-holder">
          <GridList cellHeight={450} cols={3}>
            {this.state.posts &&
              this.state.posts.length > 0 &&
              this.state.posts.map(post => (
                <GridListTile
                  key={post.media_url}
                  onClick={e => this.showModalforId(post.id)}
                >
                  <img
                    src={post.media_url}
                    alt="post"
                    width="100%"
                    height="100%"
                    className="image-display"
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(customStyleSheets)(Profile);
