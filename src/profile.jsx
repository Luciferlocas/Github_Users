export default function Profile({data}) {
  if (!data) {
    return <></>
  }
  return (
    <>
      <article className="userinfo">
        <div className="user">
          <div className="avatar">
            <img src={data.avatar_url} alt="Logo" />
          </div>
          <div className="name">
            <button
              className="enter"
            >
              <a href={data.html_url} target="_blank">View Profile</a>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
