import moment from "moment";
import { useState } from "react";
import { show, tableheader } from "../../api";
import TableContent, { filterArr } from "../TableContent/TableContent";
import "./table.scss";

type Props = {
  item: tableheader;
};

const Table: React.FC<Props> = ({ item }) => {
  const [show, setShow] = useState({} as show);
  const [arr, setArr] = useState([] as Array<filterArr>);
  const [sortIndex, setSortIndex] = useState(true);
  const [sortNumber, setSortNumber] = useState(false);

  // dates
  let dateEnd = new Date(item.dateEnd);
  let dateStart = new Date(item.dateStart);
  let dEnd = moment(dateEnd).format("DD.MM.YYYY");
  let dStart = moment(dateStart).format("DD.MM.YYYY");
  // end dates

  // sort table
  let sorted: Array<filterArr> = [];
  item.data.map((element, index) => sorted.push({ ...element, index }));
  const handleSortIndex = () => {
    if (!sortIndex) {
      sorted.sort((a: any, b: any) => b.index - a.index);
      setArr(sorted);
      setSortIndex(true);
    } else {
      sorted.sort((a: any, b: any) => a.index - b.index);
      setSortIndex(false);
      setArr(sorted);
    }
  };
  const handleSortNumber = () => {
    if (!sortNumber) {
      sorted.sort((a: any, b: any) => b.number - a.number);
      setArr(sorted);
      setSortNumber(true);
    } else {
      sorted.sort((a: any, b: any) => a.number - b.number);
      setSortNumber(false);
      setArr(sorted);
    }
  };
  // end sort table

  // toggle
  const toggleTable = (d: string) => {
    handleSortIndex();
    if (item.title === d) {
      if (show.show === true) {
        return setShow({ show: false, title: item.title });
      }
      return setShow({ show: true, title: item.title });
    }
  };
  // end toggle

  return (
    <div className="table">
      <div onClick={() => toggleTable(item.title)} className="table__header">
        <div>
          <p className="table__header-title">{item.title}</p>
          <p className="table__header-subtitle">{item.subTitle}</p>
        </div>
        <p className="table__header-date">
          {dStart} - {dEnd}
        </p>
      </div>
      {show.show && item.title === show.title && (
        <TableContent
          arr={arr}
          sortIndex={sortIndex}
          sortNumber={sortNumber}
          handleSortIndex={handleSortIndex}
          handleSortNumber={handleSortNumber}
        />
      )}
    </div>
  );
};

export default Table;
