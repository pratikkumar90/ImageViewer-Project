import React, { Component } from "react";
import "./Header.css";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Avatar from "@material-ui/core/Avatar";

class Header extends Component {
  constructor() {
    super();
    this.state = { showMenu: "display-none" };
  }

  showMenuHandler = () => {
    if (this.state.showMenu === "display-none") {
      this.setState({ showMenu: "display-block" });
    } else {
      this.setState({ showMenu: "display-none" });
    }
  };

  render() {
    return (
      <div>
        <div className="app-header">
          <div className="pointer">Image Viewer</div>
        </div>
        {this.props.displaySearch === true ? (
          <div className="search-box-area">
            <SearchIcon className="search-icon" />
            <InputBase
              placeholder="Search..."
              onChange={this.props.seachInputHandler}
            />
          </div>
        ) : (
          ""
        )}

        {this.props.displayProfile === true ? (
          <div className="profile-icon">
            <Avatar onClick={this.showMenuHandler} className="pointer">
              <img
                className="header-thumbnail-image"
                src="https://asia.olympus-imaging.com/content/000107506.jpg"
                alt={"Profile-pic"}
              />
            </Avatar>
            <div className={this.state.showMenu}>
              <div className="dropdown-content">
                {this.props.myAccount !== false ? (
                  <div>
                    <div className="pointer">My Account</div>
                    <div className="divider" />
                  </div>
                ) : (
                  ""
                )}
                <div className="pointer">Logout</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Header;
