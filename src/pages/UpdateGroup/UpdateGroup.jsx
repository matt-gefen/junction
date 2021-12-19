import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getGroupById } from "../../services/groupService";

const UpdateGroup = (props) => {
  const [group, setGroup] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupById(id);
        console.log("Group Details Data:", groupData);
        setGroup(groupData);
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [id]);

  return (
    <div className="layout">
      <div>
        <h1>Test</h1>
      </div>
    </div>
  );
};

export default UpdateGroup;
