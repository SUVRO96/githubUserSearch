import React from "react";
import { useState, useEffect } from "react";

function GitnewapiChild(props) {
  const [user, setUser] = useState({});
  const noBio = "Bio not available";

  const callApi = async () => {
    console.log(props.link);
    const data = await fetch(props.link, {
      headers: {
        Authorization: "token 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",
      },
    });
    const response = await data.json();
    console.log(response);
    setUser(response);
  };

  useEffect(() => {
    callApi();
  });

  return (
    <>
      <div
        className="card shadow border-dark m-3"
        style={{ maxWidth: "450px" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={user.avatar_url}
              className="img-fluid rounded-start my-3"
              alt={user.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title fw-bold">
                {user.name} <span className="fw-normal">({user.login})</span>
              </h5>
              <h6 className="card-text my-3">
                <u>Bio:</u>
                <p className="lead">{user.bio === "" ? noBio : user.bio}</p>
              </h6>
              <p className="card-text">
                Profile:
                <small className="text-muted">
                  {" "}
                  <a href={user.html_url} target="_blank">
                    {user.html_url}
                  </a>
                </small>
              </p>
              <p className="card-text">No. of Repo: {user.public_repos}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GitnewapiChild;
