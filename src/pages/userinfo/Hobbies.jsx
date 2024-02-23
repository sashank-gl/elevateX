import React, { useState } from "react";

const Hobbies = ({ hobbies, addHobby, removeHobby, updateHobby }) => {
  const inputStyle = "h-10 rounded-lg p-1";
  return (
    <div>
      {hobbies?.map((hobby, index) => (
        <div key={index} className="mb-4 flex gap-4">
          <input
            className={inputStyle}
            type="text"
            value={hobby}
            onChange={(e) => updateHobby(index, e.target.value)}
          />

          <button
            className="rounded-lg bg-button p-2 px-4 font-semibold text-white"
            type="button"
            onClick={() => removeHobby(index)}
          >
            Remove Hobby
          </button>
        </div>
      ))}
      <button
        className="rounded-lg bg-button p-2 px-4 font-semibold text-white"
        type="button"
        onClick={addHobby}
      >
        Add Hobby
      </button>
    </div>
  );
};

export default Hobbies;
