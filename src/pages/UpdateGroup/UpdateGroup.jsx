import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupUpdateForm from "../../components/GroupUpdateForm/GroupUpdateForm";

const UpdateGroup = (props) => {
  const { id } = useParams();

  return (
    <div className="layout">
      <div>
        <h1>Test</h1>
        <GroupUpdateForm groupId={id}/>
      </div>
    </div>
  );
};

export default UpdateGroup;
