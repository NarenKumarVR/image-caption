import { useState } from "react";
import Stepper from "./Stepper";
import axios from "axios";

function App() {
  const [path, setPath] = useState("");
  const [data, setData] = useState([]);

  const handleDataChange = (description, index) => {
    let clone = [...data];
    clone[index]["desc"] = description;
    setData(clone);
  };

  const handlePathSubmit = () => {
    console.log("TESTING >>> 1", path);
    
  
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

    // // var payload = `file-path: ${path}`;
    // // var data = '"file-path": "/Users/enkay/Documents/FordMotors/image-caption/FastAPI/public/Archive.zip"';
    // // var turl = 'http://127.0.0.1:8000/get-data-src?file_path=' + payload
    // // console.log(turl);
    // // var config = {
    // //   method: "POST",
    // //   url: turl,
    // //   headers: { 
    // //     "Content-Type": "application/json",
    // //     "Access-Control-Allow-Origin" : "*",
    // //     'Access-Control-Max-Age': "10",
    // //     'Content-Type': 'application/json',
    // //     'Access-Control-Allow-Credentials': 'true',
    // //   },
    // //   body : JSON.stringify(payload),    
    // // };
    
    // // axios(config)
    // // .then(function (response) {
    // //   console.log(JSON.stringify(response.data));
    // // })
    // // .catch(function (error) {
    //   console.log(error);
    // });

    // setData([
    //   {
    //     img_path:
    //       "/Users/enkay/Documents/FordMotors/image-caption/ReactJS/image-caption/public/zipped/logo512.png",
    //     desc: ""
    //   },
    //   {
    //     img_path:
    //       "/Users/enkay/Documents/FordMotors/image-caption/ReactJS/image-caption/public/zipped/logo192.png",
    //     desc: ""
    //   }
    // ]);
  };

  return (
    <div className="App">
      <input
        placeholder="Description"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button onClick={handlePathSubmit}>Path Submit</button>

      {data&&<Stepper data={data} handleDataChange={handleDataChange} />}
    </div>
  );
}

export default App;
