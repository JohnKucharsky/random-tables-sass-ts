import { useState } from "react";
import randomData from "./api";
import LevelOne from "./components/Levels/LevelOne";
import "./app.scss";

function App() {
  const [inputOpen, setInputOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);

  // input ui
  const handleShowInput = () => {
    if (optionOpen) {
      setOptionOpen(false);
      setInputOpen(!inputOpen);
    } else {
      setInputOpen(!inputOpen);
    }
  };
  const handleShowOption = () => {
    if (inputOpen) {
      setInputOpen(false);
    } else {
      setOptionOpen(!optionOpen);
    }
  };
  // end input ui

  let newData = randomData();

  // array for options
  const list: Array<string> = [];
  newData.forEach((i) =>
    i.items.forEach((t) => t.items.forEach(({ title }) => list.push(title)))
  );
  // end array for options

  return (
    <div className="app">
      <div className="app__search">
        <div className="app__search-option">
          <span
            onClick={() => handleShowOption()}
            className="app__search-close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="white"
              />
            </svg>
          </span>
          {optionOpen && (
            <select name="" id="">
              {list.map((i: string) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="app__search-input">
          {inputOpen && <input type="text" placeholder="не работает" />}
          <span onClick={() => handleShowInput()} className="app__search-look">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
      </div>
      {newData.map((lev1) => (
        <div key={lev1.title}>
          <LevelOne key={lev1.title} lev1={lev1} />
        </div>
      ))}
    </div>
  );
}

export default App;
