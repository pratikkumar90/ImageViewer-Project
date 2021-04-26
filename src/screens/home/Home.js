import React, { Component } from "react";
import Header from "../../common/header/Header";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      copyOfPosts: [],
      hardCoded_profile_pic:
        "https://asia.olympus-imaging.com/content/000107506.jpg",
      search_string: " "
    };
  }

  componentDidMount() {
    // If access token is missing redirect to login page
    if (sessionStorage.getItem("access-token") === null) {
      this.props.history.push("/");
    }

    // let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open(
      "GET",
      "https://graph.instagram.com/me/media?fields=id,caption&access_token=" +
        sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send();

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var response_Received = JSON.parse(this.responseText);
        let number_of_posts = response_Received.data.length;
        for (let i = 0; i < number_of_posts; i++) {
          var id = response_Received.data[i].id;
          that.getPostDetailsForID(id);
        }
        that.setState({ copyOfPosts: response_Received.data });
      }
    });

    console.log("access token=" + sessionStorage.getItem("access-token"));
    console.log(this.state.copyOfPosts);
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
        // some hard coded data
        response.like = false;
        response.likeCount = 7;
        response.comments = [];
        response.className = "none";
        let tags = "";
        if (response.caption != null) {
          let captionData = response.caption.split("#");
          response.caption = captionData[0];
          for (let i = 1; i < captionData.length; i++) {
            tags += "#" + captionData[i] + " ";
          }
        }

        response.hashTags = tags;
        var posts_available = that.state.posts;
        console.log("response=" + this.responseText);
        posts_available.push(response);
        that.setState({
          posts: posts_available
        });
      }
    });
  };

  formatTime = time => {
    let tempFormat = new Date(time);
    let timeFormat =
      tempFormat.getUTCDate() +
      "/" +
      (tempFormat.getUTCMonth() + 1) +
      "/" +
      tempFormat.getUTCFullYear() +
      " " +
      tempFormat.getUTCHours() +
      ":" +
      tempFormat.getUTCMinutes() +
      ":" +
      tempFormat.getUTCSeconds();
    return timeFormat;
  };

  likeHandler = value => {
    let postsCount = this.state.posts.length;
    var temporaryPosts = this.state.posts;
    for (let i = 0; i < postsCount; i++) {
      if (temporaryPosts[i].id === value) {
        if (temporaryPosts[i].like === false) {
          temporaryPosts[i].like = true;
          temporaryPosts[i].likeCount++;
          temporaryPosts[i].className = "red";
        } else {
          temporaryPosts[i].like = false;
          temporaryPosts[i].likeCount--;
          temporaryPosts[i].className = "none";
        }
      }
      this.setState({ posts: temporaryPosts });
    }
  };

  commentHandler = (id, value) => {
    let postsCount = this.state.posts.length;
    var temporaryPosts = this.state.posts;
    for (let i = 0; i < postsCount; i++) {
      if (
        temporaryPosts[i].id === id &&
        value !== this.state.posts[0].username + ": "
      ) {
        var comments = temporaryPosts[i].comments;
        comments.push(value);
        temporaryPosts[i].comments = comments;
      }
      this.setState({ posts: temporaryPosts });
    }
  };

  seachInputHandler = event => {
    this.setState({ posts: [], search_string: event.target.value });
    let search_string = event.target.value;

    let postsCount = this.state.copyOfPosts.length;
    for (let i = 0; i < postsCount; i++) {
      if (
        this.state.copyOfPosts[i].caption
          .toUpperCase()
          .includes(search_string.toUpperCase())
      ) {
        this.getPostDetailsForID(this.state.copyOfPosts[i].id);
      }
    }
  };

  render() {
    return (
      <div>
        <Header
          displaySearch={true}
          displayProfile={true}
          seachInputHandler={this.seachInputHandler}
          history={this.props.history}
        ></Header>
        <div className="show-case ">
          {this.state.posts.map(post => (
            <div key={"instagram" + post.id}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar>
                      <img
                        className="thumbnail-image"
                        src={this.state.hardCoded_profile_pic}
                        alt={post.id}
                      />
                    </Avatar>
                  }
                  title={post.username}
                  subheader={this.formatTime(post.timestamp)}
                />

                <CardContent>
                  <img
                    src={post.media_url}
                    alt={post.id}
                    className="poster-image"
                  />
                  <div className="divider" />
                  <Typography>
                    <b>{post.caption}</b>
                    <span>{post.hashTags}</span>
                  </Typography>
                  <span
                    onClick={() => {
                      this.likeHandler(post.id);
                    }}
                  >
                    {post.className === "red" ? (
                      <FavoriteIcon className={post.className} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </span>
                  <span class="like-count">
                    {"  " + post.likeCount + "Likes"}
                  </span>
                  <br />
                  {post.comments.map(comment => (
                    <div
                      key={"comment" + post.id + comment}
                      className="comment-data"
                    >
                      <b>{comment.split(":")[0]}</b> : {comment.split(":")[1]}
                    </div>
                  ))}
                  <FormControl className="comment">
                    <InputLabel htmlFor={post.id} required>
                      Add a comment
                    </InputLabel>
                    <Input id={post.id} type="text" />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className="comment-button"
                    onClick={() =>
                      this.commentHandler(
                        post.id,
                        post.username +
                          ": " +
                          document.getElementById(post.id).value
                      )
                    }
                  >
                    ADD
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
