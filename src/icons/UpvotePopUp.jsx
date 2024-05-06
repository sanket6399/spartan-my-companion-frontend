import React, { useState } from "react";
import axios from "axios";

function UpvotePopup({ upvotes, onClose }) {
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(upvotes);
  const fetchUserNames = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://x6scf9otx8.execute-api.us-east-1.amazonaws.com/spartan-v1/spartan-get-allUsers"
      );
      const users = response.data.body;
      console.log("Fetched users:", users);
      // Filter user names based on upvotes list of IDs
      console.log("Upvotes:", upvotes);
      const fetchedUserNames = upvotes.map((id) => {
        const user = users.find((user) => user._id === id);
        return user ? user.name : "User not found";
      });
      console.log("Fetched user names:", fetchedUserNames);
      setUserNames(fetchedUserNames);
    } catch (error) {
      console.error("Error fetching user names:", error);
      setUserNames([]); // Clear user names on error
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Upvote Details</h2>
        <ul className="list-disc list-inside">
          {!isLoading ? (
            userNames.map((name, index) => (
              <li key={index} className="text-gray-800">
                {name}
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Close
        </button>
        <button
          onClick={fetchUserNames}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
        >
          Show Users
        </button>
      </div>
    </div>
  );
}

export default UpvotePopup;
