import React from "react";

type scrollProps = {
  scrollTop: number;
};

const onScroll: React.FunctionComponent<scrollProps> = ({ scrollTop }) => {
  return (
    <>
      <div className="progressMainWrapper">
        <div
          className="progressMainStyle"
          style={{ width: `${scrollTop}%` }}
        ></div>
      </div>
    </>
  );
};

export default onScroll;
