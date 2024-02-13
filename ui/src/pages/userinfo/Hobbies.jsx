import React, { useState } from "react";

const Hobbies = ({ hobbies, addHobby, removeHobby, updateHobby }) => {
  const labelStyle = "flex gap-4 my-1";
  const labelTextStyle = "my-1 w-40";
  const inputStyle = "h-10 rounded-lg p-1";
  return (
    <div>
      {hobbies?.map((hobby, index) => (
        <div key={index}>
          <input
            className={inputStyle}
            type="text"
            value={hobby}
            onChange={(e) => updateHobby(index, e.target.value)}
          />

          <button
            className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
            type="button"
            onClick={() => removeHobby(index)}
          >
            Remove Hobby
          </button>
        </div>
      ))}
      <button
        className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
        type="button"
        onClick={addHobby}
      >
        Add Hobby
      </button>
    </div>
  );
};

export default Hobbies;
