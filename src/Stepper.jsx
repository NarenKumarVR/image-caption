import { useEffect, useState } from "react";

const Stepper = ({ data, handleDataChange }) => {
  const [currentPageNo, setCurrentPage] = useState(0);
  
  const [log, setLog] = useState([]);

  const handleNext = () => {
    setCurrentPage(currentPageNo + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPageNo - 1);
  };
  const handleImageSubmit = () => {
    // data[currentPageNo].img_path,
    // data[currentPageNo].desc,
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
        <div>        
            <img src={`/${data[currentPageNo].img_path}`} alt="img" width="200px" height="200px"/>    

          <input
            placeholder="Image Description"
            value={data[currentPageNo].desc}
            onChange={(e) => handleDataChange(e.target.value, currentPageNo)}
          />
          <button disabled={currentPageNo === 0} onClick={handlePrevious}>
            Previous
          </button>
          <button
            disabled={currentPageNo === data.length - 1}
            onClick={handleNext}
          >
            Next
          </button>
          <button onClick={handleImageSubmit}>Submit</button>
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
