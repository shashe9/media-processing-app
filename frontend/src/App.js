import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [operation, setOperation] = useState("thumbnail");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "https://media-processing-app-l9fq.onrender.com";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setOutput("");



    try {
      const res = await fetch(`${API_URL}/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url,
          operation
        })
      });

      const data = await res.json();

      if (data.status === "success") {
        console.log("Output URL:", data.output);

        setOutput(data.output);
      } else {
        setError(data.detail || "Error occurred");
      }

    } catch (err) {
      setError("Request failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Media Processing App</h2>

      <input
        type="text"
        placeholder="Enter media URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", marginRight: "10px" }}
      />

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="thumbnail">Thumbnail</option>
        <option value="compress">Compress</option>
        <option value="extract_audio">Extract Audio</option>
      </select>

      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Submit
      </button>

      {loading && <p>Processing...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {output && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>

          {operation === "thumbnail" && (
            <img 
              src={output} 
              alt="thumbnail" 
              width="300"
              onError={() => console.log("Image failed to load:", output)}
            />
          )}

          {operation === "compress" && (
            <video controls width="400">
              <source src={output} type="video/mp4" />
            </video>
          )}

          {operation === "extract_audio" && (
            <audio controls>
              <source src={output} type="audio/mp3" />
            </audio>
          )}
        </div>
      )}
    </div>
  );

  
}

export default App;