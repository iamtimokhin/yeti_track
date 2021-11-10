import React from "react";

export const Loader: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <section className="ld ld--section">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </React.Fragment>
  );
};
