import React, { useState } from "react";
import InputMask from "react-input-mask";
import { IRequest } from "../../../type";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../Modal/Modal";
import Zombie from "./../../assets/woman_zombie.gif";

type formProps = {
  changeOpenForm: (e: React.MouseEvent<HTMLElement>) => void;
  application: IRequest[];
  setApplication: React.Dispatch<React.SetStateAction<IRequest[]>>;
};
export const Form: React.FunctionComponent<formProps> = ({
  changeOpenForm,
  application,
  setApplication,
}) => {
  const [request, setRequest] = useState<string>("");
  const [date, setDate] = useState<any>();
  const [company, setCompany] = useState<string>("");
  const [carrier, setCarrier] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  //  create toggle for modal
  const modal = (e: React.MouseEvent<HTMLElement>) => setOpenModal(!openModal);
  // create adding handler
  const addingApplication = (
    request: string,
    date: any,
    company: string,
    carrier: string,
    phone: string,
    comments: string
  ) => {
    const newApplication = {
      request: uuidv4(),
      date: currentDateAndTime,
      company: company,
      carrier: carrier,
      phone: phone,
      comments: comment,
    };
    setApplication((prev) => [newApplication, ...prev]);
  };

  // create submit handler
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addingApplication(request, date, company, carrier, phone, comment);
    setCompany("");
    setCarrier("");
    setPhone("");
    setComment("");
  };

  // create current time and date
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const currentDateAndTime =
    "Date" + " " + currDate + "," + " " + "Time" + " " + currTime;

  // create disabled function
  const disabled =
    company.length <= 0 ||
    carrier.length <= 0 ||
    phone.length < 9 ||
    comment.length <= 0;

  return (
    <React.Fragment>
      <section className="form form--section">
        <div className="form__wrapper">
          <p className="form__title">Form for adding applications</p>
          <label htmlFor="company" className="form__label">
            Company name
          </label>
          <input
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setCompany(e.target.value)
            }
            name="company"
            className="form__input"
            placeholder="Please, enter company name"
          />
          <label htmlFor="carrier" className="form__label">
            Name of the carrier
          </label>
          <input
            value={carrier}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setCarrier(e.target.value)
            }
            name="carrier"
            className="form__input"
            placeholder="Please, enter name of the carrier"
          />
          <label htmlFor="phone" className="form__label">
            Phone number
          </label>
          <InputMask
            name="phone"
            mask="+7 (999) 999-99-99"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setPhone(e.target.value)
            }
            className="form__input"
            placeholder="Please, enter phone number"
          />
          <label htmlFor="comment" className="form__label">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setComment(e.target.value)
            }
            className="form__textarea"
            placeholder="Please, enter any comment"
          />
          <div className="btn form__btn">
            <button
              className="btn__save"
              onClick={disabled ? modal : handleSubmit}
            >
              Save
            </button>
            <button className="btn__cancel" onClick={changeOpenForm}>
              Cancel
            </button>
          </div>
          {openModal && (
            <Modal>
              <div className="box form__box">
                <img className="box__image" src={Zombie} />
              </div>
              <p className="form__text">
                Fields cannot be empty. Go back and fill in all the fields
              </p>
              <div className="btn form__btn">
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
