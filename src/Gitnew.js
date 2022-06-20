import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GitnewapiChild from "./GitnewChild";

class Gitnewapi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: "",
      username: "",
      users: null,
    };
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      username: e.target.value,
      searchItem: "Showing Results for: " + e.target.value,
    });
  };

  handleSumit = e => {
    e.preventDefault();
    this.searchProfile();
  };

  searchProfile = () => {
    fetch(
      `https://api.github.com/search/users?q=${this.state.username}%20in:name`
    )
      .then(data => {
        return data.json();
      })
      .then(response => {
        // console.log(response);
        this.setState({
          ...this.state,
          users: response,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="search-container card m-3 sticky-top">
          <div className="card-header bg-dark text-white d-flex">
            <span className="px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </span>
            <h3>Github User Search</h3>
            <span
              style={{
                position: "relative",
                top: "10px",
                marginLeft: "0.5rem",
              }}
            >
              <p>~By Subhradip</p>
            </span>
          </div>
          <div className="card-body text-center">
            <form className="form-inline" onSubmit={this.handleSumit}>
              <div className="form-group">
                <input
                  value={this.state.username}
                  type="text"
                  style={{ width: "50%", margin: "auto" }}
                  className="form-control shadow"
                  placeholder="Search Name"
                  onChange={this.handleChange}
                />
                <input
                  type="submit"
                  value="SEARCH"
                  className="btn btn-sm btn-dark m-2"
                />
              </div>
            </form>
          </div>
        </div>
        <div
          className="reult-container row m-3"
          style={{
            backgroundColor: "#A5BECC",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <div>
            <h5 style={{ margin: "10px" }}>{this.state.searchItem}</h5>
          </div>
          <div className="row d-flex">
            {this.state.users !== null && (
              <>
                {this.state.users.items.map(user => {
                  return (
                    <Fragment key={user.id}>
                      <GitnewapiChild link={user.url} />
                    </Fragment>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Gitnewapi;
