import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GeneratedDataPage = () => {
  const [generatedData, setGeneratedData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.data);

    setGeneratedData(location.state.data.resume);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Tailored Bullet Points</h2>
      <div className="card">
        <div className="card-body">
          {generatedData ? (
            <div>
              {/* <h5 className="card-title">Summary</h5> */}
              <p className="card-text">{generatedData}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedDataPage;
