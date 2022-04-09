import { useState } from "react";
import LevelTwo from "./LevelTwo";
import "./lev.scss";

// types
export type show = {
  show: boolean;
  title: string;
};
export type tablecontent = { title: string; number: number };
export type tableheader = {
  dateEnd: number;
  dateStart: number;
  subTitle: string;
  title: string;
  data: Array<tablecontent>;
};
export type lev2 = {
  title: string;
  items: Array<tableheader>;
};
type lev1 = {
  title: string;
  items: Array<lev2>;
};
type Props = {
  lev1: lev1;
};
// types

const LevelOne: React.FC<Props> = ({ lev1 }) => {
  const [show, setShow] = useState({} as show);

  // toggle
  const toggle = (d: string) => {
    if (lev1.title === d) {
      if (show.show === true) {
        return setShow({ show: false, title: lev1.title });
      }
      return setShow({ show: true, title: lev1.title });
    }
  };
  // toggle

  return (
    <div className="lev1">
      <button onClick={() => toggle(lev1.title)}>{lev1.title}</button>
      {show.show && show.title === lev1.title && (
        <div>
          <span className="lev1__line"></span>
          <span className="lev1__line-hor"></span>
          {lev1.items.map((lev2) => (
            <LevelTwo key={lev2.title} lev2={lev2} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LevelOne;
