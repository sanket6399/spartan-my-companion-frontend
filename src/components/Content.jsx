import React, { useEffect } from "react";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import Comment from "../icons/Comment";
import UserInfo from "./UserInfo";
import Write from "../icons/Write";
import Send from "../icons/Send";
import { useQuery } from "react-query";
import newRequests from "../utils/newRequest";
import { useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { Toaster } from "react-hot-toast";
import Loading from "./Loading";
import NothingHere from "./NothingHere";
import UpvotePopup from "../icons/UpvotePopUp";

const Content = () => {
  const { topic } = useParams();
  const [openId, setOpenId] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const [popupVisibility, setPopupVisibility] = React.useState({}); // This holds the visibility state for each question

  const [dummy, setDummy] = React.useState(false);

  // Handler to toggle the dummy state
  const toggleDummy = () => {
    setDummy((prev) => !prev); // Toggle the state to force re-render
  };

  const handleUpvoteClick = (questionId) => {
    // Toggle visibility state for the specific question
    setPopupVisibility((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };
  const { isLoading, data } = useQuery("getAllQuestions", () => {
    if (topic) {
      return newRequests
        .get(`http://localhost:8080/find/${topic}`)
        .then((res) => res.data);
    } else {
      return newRequests
        .get(
          "https://x6scf9otx8.execute-api.us-east-1.amazonaws.com/spartan-v1/spartan-get-questions"
        )
        .then((res) => res.data.body);
    }
  });

  if (isLoading) return <Loading />;
  //console.log(data);
  //console.log(data[0].question_id);
  //  console.log(data.map((question) => question._id));
  return (
    <div
      className="md:w-[60%] flex flex-col items-center gap-y-5 
    md:gap-8 my-8 "
    >
      <Toaster />
      {data &&
        data.length > 0 &&
        data.map((question, index) => {
          return (
            <div
              key={question.question_id}
              className="w-[96%] md:w-[80%] mx-12 flex flex-col 
              items-end  p-3 md:p-4 rounded-md bg-[#0055a2]
               dark:bg-slate-400"
            >
              <div
                className="w-full bg-white dark:bg-[#1E212A]
              
              p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
              >
                <div className="left-section space-y-1 text-center">
                  <Arrowup
                    id={question.question_id}
                    toggleDummy={toggleDummy}
                  />
                  <h3
                    className="cursor-pointer text-sm text-[#0055a2] md:text-base"
                    onClick={() => handleUpvoteClick(question.question_id)}
                  >
                    {Array.isArray(question?.upvote)
                      ? question.upvote.length
                      : 0}
                  </h3>
                  {popupVisibility[question.question_id] && (
                    <UpvotePopup
                      upvotes={question?.upvote || []}
                      onClose={() => handleUpvoteClick(question.question_id)}
                    />
                  )}
                  <Arrowdown
                    id={question.question_id}
                    toggleDummy={toggleDummy}
                  />
                </div>
                <div className="right-section w-full">
                  <h1 className="text-base md:text-lg dark:text-white">
                    {question?.question}
                  </h1>
                  <p className="text-sm md:text-base">
                    {question?.description}
                  </p>
                  <hr />
                  <UserInfo
                    openId={openId}
                    index={index + 1}
                    setOpenId={setOpenId}
                    question={question}
                  />
                </div>
              </div>
              {/* nested comment       */}
              {openId.find((ele) => ele === index + 1) && (
                <>
                  {question?.replies?.map((answer, index) => {
                    return (
                      <div key={answer._id} className="flex items-center gap-4">
                        {/* fix this */}
                        <img
                          className="h-4 md:h-6 w-4 md:w-6"
                          src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                          alt=""
                        />
                        <div
                          className="   bg-white dark:bg-[#32353F] dark:text-white
          max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2"
                        >
                          <p className="text-inherit">{answer?.reply}</p>
                          <UserInfo answer={answer} />
                        </div>
                      </div>
                    );
                  })}
                  {/* nested comment       */}
                  <div
                    className="w-full bg-white dark:bg-slate-900 flex items-center gap-4
       px-5 py-2 rounded-lg shadow-md  mt-2"
                  >
                    <Write />
                    <input
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full h-10 border-none outline-none 
          rounded-md py-1 px-2 "
                      type="text"
                      value={answer}
                      placeholder="Write a comment"
                    />
                    <Send
                      questionId={question.question_id}
                      answer={answer}
                      setAnswer={setAnswer}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      {data.length === 0 && <NothingHere />}
    </div>
  );
};

export default Content;
