import React from "react";
import Add from "../icons/Add";
import Share from "../icons/Share";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { duration } from "moment";

const Askquestion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const naviate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags } = e.target;
    const question = {
      question: title.value,
      description: description.value,
      tags: tags.value.split(","),
      userId: user._id, // user._id, not sure from where we are getting user id
    };


    const res = await axios.post(
      "https://x6scf9otx8.execute-api.us-east-1.amazonaws.com/spartan-v1/spartan-question-posting",
      question
    );
    if (res.status === 200) {
      toast.success("Question added successfully", (duration = 3000));
      setTimeout(() => {
        naviate("/");
      }, 3000);
    }
  };

  return (
    <div className="h-full md:w-[50%]">
      <Toaster />
      <div
        className="md:mx-12 flex flex-col items-center 
      gap-4 mb-12 border p-4 pb-6 rounded-md bg-[#0055a2]
      dark:bg-[#1E212A]  mt-12"
      >
        <h1
          className="text-2xl font-bold text-center
        text-white 
        "
        >
          Setup an Event for which you want companion
        </h1>

        <form onSubmit={handleSubmit} className="form w-full ">
          <div className="title">
            <label className="text-gray-800 text-start text-white">
              Event
            </label>
            <input
              name="title"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none
                shadow-sm"
              type="text"
            />
          </div>
          <div className="desc mt-3">
            <label className="text-gray-800 text-start text-white">
              Description
            </label>
            <textarea
              name="description"
              className="mt-2 w-full h-24 px-3 py-2 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <div className="tages mt-3">
            <label className="text-gray-800 text-start text-white">
              Event Category
            </label>
            <input
              name="tags"
              placeholder="Enter tags seperated by comma"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-[230px] mx-auto flex items-center gap-2 bg-white rounded-md shadow-sm px-8 py-2 cursor-pointer"
          >
            <Share />
            <span className="text-[#0055a2]">Post on SJSU Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Askquestion;
