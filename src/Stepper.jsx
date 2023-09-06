import { useEffect, useState } from "react";

const Stepper = ({ data, handleDataChange, currentPageNo, handleSetCurrentPageNo }) => {
  const [log, setLog] = useState([]);

  const handleNext = () => {
    handleSetCurrentPageNo(currentPageNo + 1);
  };
  const handlePrevious = () => {
    handleSetCurrentPageNo(currentPageNo - 1);
  };
  const handleImageSubmit = () => {
    const apiUrl = `http://localhost:8000/save-data?image_name=${data[currentPageNo].og_path}&description=${data[currentPageNo].desc}`;
    const requestData = {
      image_name: data[currentPageNo].og_path,
      description: data[currentPageNo].desc,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setLog([...log, `${data[currentPageNo].img_path} saved in Bigquery Successfully`]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
