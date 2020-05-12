import React from "react";
const Like = (props) => {
  const classes = " fa fa-heart";
  return (
    <i
      className={props.liked === true ? classes : classes + "-o"}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
