import { useState } from "react";
import Stepper from "./Stepper";
import axios from "axios";

function App() {
  const [path, setPath] = useState("");
  const [data, setData] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [isListView, setIsListView] = useState(true);
  
  const handleDataChange = (description, index) => {
    let clone = [...data];
    clone[index]["desc"] = description;
    setData(clone);
  };

  const handlePathSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = `${path}`;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost:8000/get-data-src?file_path=/Users/enkay/Documents/FordMotors/image-caption/images/Archive.zip", requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error', error));
  };

  const handleListClick = (index) => {
    setCurrentPageNo(index);
    setIsListView(false);
  };
  
  return (
    <div className="App">
      <div className="d-flex form-inputs">
        <input
          className="form-control"
          type="text"
          placeholder="Path..."
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <i class="bx bx-search" onClick={handlePathSubmit}></i>
      </div>
      {data &&
        isListView &&
        data.map((d, index) => {
          return (
            <div className="data_list" onClick={() => handleListClick(index)}>
              <img src={d.img_path} alt="img" width="80px" height="80px" />
              <div className="desc">{d.desc}</div>
            </div>
          );
        })
      }
      {!isListView && (
        <Stepper
          data={data}
          handleDataChange={handleDataChange}
          currentPageNo={currentPageNo}
          handleSetCurrentPageNo={setCurrentPageNo}
        />
      )}
    </div>
  );
}

export default App;
