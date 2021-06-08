import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 100,
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};

export default Loader;
