import React, { useEffect, useState } from "react";
import { Header } from "../components/UI/Header/Header";
import Scroll from "../components/UI/Scroll/Scroll";
import { TicketList } from "../components/UI/Ticket/TicketList";
import { TicketId } from "../components/UI/TicketId/TicketId";
import { initialData } from "../initialData";
import { IArchived, IRequest } from "../type";

const Tickets: React.FunctionComponent = () => {
  // create hooks
  const [application, setApplication] = useState<IRequest[]>(initialData);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [scrollTop, setScrollTop] = useState<number>(0);

  //create remove handler
  const removeRequest = (request: string) => {
    setIsRemoving(true);
    setTimeout(() => {
      setApplication((prev) => prev.filter((item) => item.request !== request));
      setIsRemoving(false);
      setToggle(false);
    }, 1000);
  };

  // create toggle for modal window
  const changeToggle = (e: React.MouseEvent<HTMLElement>) => setToggle(!toggle);

  // create filter list
  const filteredList = application.filter((item) =>
    item.request.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  // create scrolling
  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("application") || "[]");
    setApplication(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("application", JSON.stringify(application));
  }, [application]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Scroll scrollTop={scrollTop} />
      <Header
        setSearch={setSearch}
        search={search}
        application={application}
        setApplication={setApplication}
      />
      <TicketList
        changeToggle={changeToggle}
        toggle={toggle}
        isRemoving={isRemoving}
        removeRequest={removeRequest}
        application={filteredList}
        setApplication={setApplication}
      />
    </React.Fragment>
  );
};

export default Tickets;
