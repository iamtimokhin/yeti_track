import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Tickets from "../../../pages/Tickets";
import { TicketId } from "../TicketId/TicketId";

export const Routers: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/ticket" component={Tickets} />
      <Route exact path="/ticket/:request" component={TicketId} />
      <Redirect to="/ticket" />
    </Switch>
  );
};
