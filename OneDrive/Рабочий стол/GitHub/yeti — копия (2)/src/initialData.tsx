import { v4 as uuidv4 } from "uuid";
import { IRequest } from "./type";

export const initialData: Array<IRequest> = [
  {
    request: uuidv4(),
    date: "21/02/2020, 04:23:55",
    company: "hello",
    carrier: "bye",
    phone: "79222226242",
    comments:
      "Logistics Plus is unlike any other organization I have witnessed (or heard about).",
  },
];
