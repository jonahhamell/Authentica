import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const analyzeImage = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict/",
        formData
      );
      setResult(JSON.stringify(response.data.prediction, null, 2));
    } catch (error) {
      console.error("Error analyzing image", error);
    }
  };

  return (
    <div>
      <h1>Authentica</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={analyzeImage}>Analyze</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
