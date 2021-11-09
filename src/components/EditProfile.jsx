import React, { useState } from "react";
import { Link } from "react-router-dom";

// Edit Profile component
const EditProfile = () => {
  // Set and Get profile form values
  const [short_summary, setShortSummary] = useState("");
  
  return (
    <div className="">
      <div className="form-group">
        <label htmlFor="therapist_last_name">Tell us about yourself?</label>
        <textarea
          type="text"
          className="form-control"
          id="therapist_last_name"
          placeholder="Counsellor specialising in Anxiety, Relationship Issues and Trauma and PTSD"
          rows="3"
          onChange={(e) => setShortSummary(e.target.value)}
          value={short_summary}
        />
      </div>
    </div>
  );
};

export default EditProfile;
