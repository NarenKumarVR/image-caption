import { useState } from "react";
import Stepper from "./Stepper";
import "./styles.css";

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
    console.log('TESTING>>>', path)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = `${path}`;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`http://localhost:8000/get-data-src?file_path=${path}`, requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error', error));
    setIsListView(true)
  };

  const handleListClick = (index) => {
    setCurrentPageNo(index);
    setIsListView(false);
  };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handlePathSubmit()
    }
  }

  
  return (
    <div className="App">
      <div className="d-flex form-inputs">
        <input
          className="form-control"
          type="text"
          placeholder="Path..."
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i class="bx bx-search" onClick={handlePathSubmit}>
        </i>
      </div>
      {data &&
        isListView &&
        data.map((d, index) => {
          return (
            <div className="gallery" onClick={() => handleListClick(index)}>
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
