import { useState } from "react";
import toastr from "toastr";

export default function SearchBar() {
  let inputFieldValue;
  const [submitButtonOpacity, setSubmitButtonOpacity] = useState(0.5);
  const handleInputChange = (event) => {
    inputFieldValue = event.target.value;
    if (inputFieldValue === "") {
      setSubmitButtonOpacity(0.5);
    } else {
      setSubmitButtonOpacity(1);
    }
  };
  const submitted = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(
        `https://api.github.com/users/${inputFieldValue}`
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
       
    }
  };

  return (
    <>
      <div className="forum">
        <form onSubmit={submitted}>
          <input
            className="inputfield"
            type="text"
            placeholder="Search-in the Username (i.e luciferlocas)"
            onChange={handleInputChange}
          />
          <button
            style={{ opacity: submitButtonOpacity }}
            className="enter"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
}
