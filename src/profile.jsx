import Button from "./button";
import twitter from "./assets/twitter.png";
import Followers from "./followers";
import Orgs from "./orgs";
import React from "react";
import Repo from "./repo";
import "./repo";

export default function Profile({ data }) {
  if (!data) {
    return <></>;
  }
  return (
    <>
      <article className="infoarticle">
        <div className="userinfo">
          <div className="user">
            <div className="avatar">
              <img src={data.avatar_url} alt="User_img" />
            </div>
            <div className="name">
              <button className="enter" style={{ marginTop: "1em" }}>
                <a href={data.html_url} target="_blank">
                  View Profile
                </a>
              </button>
            </div>
          </div>
          <div className="basics">
            <div className="buttons">
              <Button
                color="red"
                value="Followers : "
                number={data.followers}
              />
              <Button value="Following : " number={data.following} />
              <Button value="Public Gists : " number={data.public_gists} />
              <Button value="Public Repos : " number={data.public_repos} />
            </div>
            <div className="user_name">
              <h1>{data.name}</h1>
              <p>{data.login}</p>
            </div>
            <div className="bio">
              <p>{data.bio}</p>
            </div>
            <div className="about">
              <div>
                <span>Location : </span>
                {data.location || "Not available"}
              </div>
              <div>
                <span>Company : </span>
                {data.company || "Not available"}
              </div>
              <div>
                <span>Website / Blog : </span>
                {data.blog ? (
                  <a href={data.blog} target="_blank">
                    Embrace a moment of discovery!
                  </a>
                ) : (
                  "Not available"
                )}
              </div>
              <div>
                <span>Joined on : </span>
                {new Date(data.created_at).toLocaleDateString()}
              </div>
              <div style={{ marginBottom: "1em" }}>
                <span>Most Used Language : </span>
                {globalThis.lang || "No language available, come on...😮‍💨"}
              </div>
              <div className="social">
                {data.twitter_username && (
                  <a
                    href={`https://twitter.com/${data.twitter_username}`}
                    target="_blank"
                  >
                    <img src={twitter} alt="" /> Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="container">
        <Repo url={data.repos_url} />
        <Orgs orgs={data.organizations_url} />
        <Followers fol={data.followers_url} />
      </div>
    </>
  );
}
