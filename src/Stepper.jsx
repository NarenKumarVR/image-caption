import { useEffect, useState } from "react";

const Stepper = ({ data, handleDataChange, currentPageNo, handleSetCurrentPageNo }) => {
  const [log, setLog] = useState([]);

  const handleNext = () => {
    setCurrentPage(currentPageNo + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPageNo - 1);
  };
  const handleImageSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {og_path: data[currentPageNo].og_path, desc: data[currentPageNo].desc};
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost:8000/get-data-src?file_path=/Users/enkay/Documents/FordMotors/image-caption/images/Archive.zip", requestOptions)
      .then(response => response.json())
      .then(result => setLog([...log, `${data[currentPageNo].img_path} saved in Bigquery Successfully`]))
      .catch(error => console.log('error', error));
  };
  
  return (
    <>
      {data.length ? (
        <div className="Stepper">   
          <div className="carosal">
            <button
              className="btn btn-secondary nav_button"
              disabled={currentPageNo === 0}
              onClick={handlePrevious}
            >
              <i className="bx bx-left-arrow-alt"></i>
            </button>
            
            <img src={`/${data[currentPageNo].img_path}`} alt="img" width="200px" height="200px"/>    
            <button
              className="btn btn-secondary nav_button"
              disabled={currentPageNo === data.length - 1}
              onClick={handleNext}
            >
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
          <textarea
            className="form-control text_area"
            placeholder="Image Description"
            value={data[currentPageNo].desc}
            onChange={(e) => handleDataChange(e.target.value, currentPageNo)}
          />
          <button class="btn btn-primary" onClick={handleImageSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
      <div>
        {log.map((x)=>{
          return <div> {x} </div>
        })}
      </div>
    </>
  );
};
export default Stepper;
