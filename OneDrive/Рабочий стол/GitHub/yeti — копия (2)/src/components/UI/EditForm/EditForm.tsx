import React, { useState } from "react";
import InputMask from "react-input-mask";
import { IRequest } from "../../../type";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../Modal/Modal";
import Zombie from "./../../assets/woman_zombie.gif";

type formProps = {
  ph: string;
  com: string;
  comm: string;
  car: string;
  cur: any;
  req: string;
  changeOpenFormEdit?: (e: React.MouseEvent<HTMLElement>) => void;
  application: IRequest[];
  setApplication: React.Dispatch<React.SetStateAction<IRequest[]>>;
};
export const EditForm: React.FunctionComponent<formProps> = ({
  changeOpenFormEdit,
  application,
  setApplication,
  req,
  cur,
  ph,
  com,
  comm,
  car,
}) => {
  const [erequest, setErequest] = useState<string>("");
  const [edate, setEdate] = useState<any>();
  const [ecompany, setEcompany] = useState<string>("");
  const [ecarrier, setEcarrier] = useState<string>("");
  const [ephone, setEphone] = useState<string>("");
  const [ecomment, setEcomment] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [select, setSelect] = useState(null);
  //  create toggle for modal
  const modal = (e: React.MouseEvent<HTMLElement>) => setOpenModal(!openModal);
  // create adding handler

  const editingApplication = (
    request: string,
    date: any,
    phone: string,
    comments: string,
    carrier: string,
    company: string
  ) => {
    const updated = application.map((inner) => {
      if (request === inner.request) {
        return {
          ...inner,
          request: uuidv4(),
          date: currentDateAndTime,
          phone: ephone,
          company: ecompany,
          carrier: ecarrier,
          comments: ecomment,
        };
      }
      return inner;
    });
    setApplication(updated);
  };

  // create submit handler
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    editingApplication(erequest, edate, ecarrier, ecompany, ecomment, ephone);
    setEcompany("");
    setEcarrier("");
    setEcomment("");
    setEphone("");
  };

  // create current time and date
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const currentDateAndTime =
    "Date" + " " + currDate + "," + " " + "Time" + " " + currTime;

  // create disabled function
  const disabled =
    ecompany.length <= 0 ||
    ecarrier.length <= 0 ||
    ephone.length <= 0 ||
    ecomment.length <= 0;

  return (
    <React.Fragment>
      <section className="formEdit formEdit--section">
        <div className="formEdit__wrapper">
          <p className="formEdit__title">Form for editing applications</p>
          <div className="formEdit__request">
            Application number:
            <span className="formEdit__value">{req}</span>
          </div>
          <div className="formEdit__request">
            Created application
            <span className="formEdit__value">{cur}</span>
          </div>
          <label htmlFor="company" className="formEdit__label">
            Company name
          </label>
          <input
            value={ecompany}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEcompany(e.target.value)
            }
            name="company"
            className="formEdit__input"
            placeholder={com}
          />
          <label htmlFor="carrier" className="formEdit__label">
            Name of the carrier
          </label>
          <input
            value={ecarrier}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEcarrier(e.target.value)
            }
            name="carrier"
            className="formEdit__input"
            placeholder={car}
          />
          <label htmlFor="phone" className="formEdit__label">
            Phone number
          </label>
          <InputMask
            name="phone"
            mask="+7 (999) 999-99-99"
            value={ephone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEphone(e.target.value)
            }
            className="formEdit__input"
            placeholder={ph}
          />
          <label htmlFor="comment" className="formEdit__label">
            Comment
          </label>
          <textarea
            value={ecomment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setEcomment(e.target.value)
            }
            className="formEdit__textarea"
            placeholder={comm}
          />
          <div className="btn formEdit__btn">
            <button
              className="btn__save"
              onClick={disabled ? modal : handleSubmit}
            >
              Save
            </button>
            <button className="btn__cancel" onClick={changeOpenFormEdit}>
              Cancel
            </button>
          </div>
          {openModal && (
            <Modal>
              <div className="box formEdit__box">
                <img className="box__image" src={Zombie} />
              </div>
              <p className="formEdit__text">
                Fields cannot be empty. Go back and fill in all the fields
              </p>
              <div className="btn formEdit__btn">
                <button className="btn__ok" onClick={modal}>
                  OK
                </button>
              </div>
            </Modal>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};
