import axios from "axios";
import React from "react";

const Arrowup = ({ id }) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://x6scf9otx8.execute-api.us-east-1.amazonaws.com/spartan-v1/spartan-event-upvote?id=${id}`,
        {
          userId,
        }
      );
      //console.log(res.status);
      if (res.status === 200) {
        alert("Upvoted successfully");
      } else {
        alert("You have already upvoted");
      }
    } catch (err) {
      console.log(err);
      alert("You have already upvoted");
    }
  };

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 md:w-5 md:h-5 cursor-pointer dark:text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
};

export default Arrowup;
