import React, { Dispatch, SetStateAction, useState } from "react";
import { IRequest } from "../../../type";
import logo from "../../images/logo.png";
import { Form } from "../Form/Form";

type requestList = {
  application: IRequest[];
  setSearch: (value: string) => void;
  search: string;
  setApplication: React.Dispatch<React.SetStateAction<IRequest[]>>;
};

export const Header: React.FunctionComponent<requestList> = ({
  application,
  setSearch,
  search,
  setApplication,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const changeOpenForm = (e: React.MouseEvent<HTMLElement>): void =>
    setOpenForm(!openForm);
  return (
    <React.Fragment>
      <section className="header header--wrapper">
        <div className="media header__media">
          <h1 className="media__brandname">YetiTrack</h1>
        </div>
        <input
          value={search}
          className="header__input"
          placeholder="Enter your search application number..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <span onClick={changeOpenForm} className="add header__add">
          Do you want to add
          <span className="add__application">application ? Click me </span>
        </span>
        {openForm && (
          <Form
            setApplication={setApplication}
            application={application}
            changeOpenForm={changeOpenForm}
          />
        )}
        <span className="quantity header__quantity">
          Quantity of applications:
          <span className="quantity__numbers">{application.length}</span>
        </span>
      </section>
    </React.Fragment>
  );
};
