import { request } from "http";
import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { IArchived, IRequest } from "../../../type";
import { EditForm } from "../EditForm/EditForm";
import { Form } from "../Form/Form";
import { Modal } from "../Modal/Modal";
import Emoji from "./../../assets/face_with_monocle.gif";
import Ghost from "./../../assets/ghost.gif";

type requestList = {
  application: IRequest[];
  removeRequest(request: string): void;
  isRemoving: boolean;
  toggle: boolean;
  changeToggle(e: React.MouseEvent<HTMLElement>): void;
  setApplication: React.Dispatch<React.SetStateAction<IRequest[]>>;
};
export const TicketList: React.FunctionComponent<requestList> = ({
  application,
  removeRequest,
  isRemoving,
  toggle,
  changeToggle,
  setApplication,
}) => {
  const [element, setElement] = useState<number>(2);
  const [load, setLoad] = useState<boolean>(false);
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);

  const changeOpenFormEdit = (e: React.MouseEvent<HTMLElement>): void =>
    setOpenFormEdit(!openFormEdit);

  const router = useHistory();

  const slice = application.slice(0, element);

  const loadMore = () => {
    setLoad(true);
    setTimeout(() => {
      setElement(element + element);
      setLoad(false);
    }, 1000);
  };

  if (application.length === 0) {
    return (
      <div className="application__length">
        <img src={Emoji} />
        <span className="application__notification">
          No applications found, try again
        </span>
      </div>
    );
  }
  return (
    <React.Fragment>
      <section className="ticket ticket--section">
        {slice.map((r, i) => (
          <div key={i} className="ticket__wrapper">
            <div className="ticket__request">
              Application number:
              <span className="ticket__value">{r.request}</span>
            </div>
            <div className="ticket__date">
              Date of application:
              <span className="ticket__value">{r.date}</span>
            </div>
            <div className="ticket__company">
              Company name: <span className="ticket__value">{r.company}</span>
            </div>
            <div className="ticket__carrier">
              Name of the carrier:
              <span className="ticket__value">{r.carrier}</span>
            </div>
            <div className="ticket__phone">
              Phone number:<span className="ticket__value">{r.phone}</span>
            </div>
            <div className="ticket__comments">
              Comment:
              <span className="ticket__label">{r.comments}</span>
            </div>
            <div className="btn ticket__btn">
              <button
                className="btn__open"
                onClick={(e: React.MouseEvent<HTMLElement>): void =>
                  router.push(`/ticket/${r.request}`, { from: "Tickets" })
                }
              >
                Open
              </button>
              <button className="btn__delete" onClick={changeToggle}>
                Delete
              </button>
              <button className="btn__archive" onClick={changeOpenFormEdit}>
                edit
              </button>
            </div>
            {openFormEdit && (
              <EditForm
                ph={r.phone}
                car={r.carrier}
                com={r.company}
                comm={r.comments}
                cur={r.date}
                req={r.request}
                changeOpenFormEdit={changeOpenFormEdit}
                application={application}
                setApplication={setApplication}
              />
            )}
            {toggle && (
              <Modal>
                <div className="emoji ticket__emoji">
                  <img className="emoji__image" src={Ghost} />
                </div>
                <p className="ticket__text">
                  Do you really want to delete the application numbered:{" "}
                  <span className="ticket__value">{r.request}</span> ?
                </p>
                <div className="btn ticket__btn">
                  {isRemoving ? (
                    <button className="btn__open">Deleting</button>
                  ) : (
                    <button
                      className="btn__open"
                      onClick={() => removeRequest(r.request)}
                    >
                      Yes
                    </button>
                  )}

                  <button className="btn__delete" onClick={changeToggle}>
                    No
                  </button>
                </div>
              </Modal>
            )}
          </div>
        ))}

        {element < application.length && (
          <button className="ticket__loadMore" onClick={() => loadMore()}>
            {load ? <span>Loading...</span> : <span>Load More</span>}
          </button>
        )}
      </section>
    </React.Fragment>
  );
};
