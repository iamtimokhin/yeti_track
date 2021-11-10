import React from "react";
import { useHistory, useParams } from "react-router-dom";

type routesParams = {
  request: string;
};
export const TicketId: React.FunctionComponent<routesParams> = ({}) => {
  const { request } = useParams<routesParams>();
  const history = useHistory();
  const goBack = (e: React.MouseEvent<HTMLElement>): void => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <section className="ticketId ticketId--section">
        <div className="ticketId__wrapper">
        <div className="ticketId__request">
              Application number:
              <span className="ticketId__value">{request}</span>
            </div>
          <div className="btn ticketId__btn">
            <button className="btn__back" onClick={goBack}>go back</button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
