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
    <div style={styles.container}>
    <div style={styles.card}>
      <h1 style={styles.title}>Media Processing Studio</h1>

      <p style={styles.subtitle}>
        Process videos instantly: generate thumbnails, compress, or extract audio.
      </p>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter media URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
        >
          <option value="thumbnail">Thumbnail</option>
          <option value="compress">Compress</option>
          <option value="extract_audio">Extract Audio</option>
        </select>

        <button onClick={handleSubmit} style={styles.button}>
          Process
        </button>
      </div>

      {loading && <p style={styles.loading}>Processing... please wait</p>}
      {error && <p style={styles.error}>{error}</p>}

      {output && (
        <div style={styles.result}>
          <h3>Result</h3>

          {operation === "thumbnail" && (
            <img src={output} alt="thumbnail" style={styles.media} />
          )}

          {operation === "compress" && (
            <video controls style={styles.media}>
              <source src={output} type="video/mp4" />
            </video>
          )}

          {operation === "extract_audio" && (
            <audio controls style={{ width: "100%" }}>
              <source src={output} type="audio/mp3" />
            </audio>
          )}

          <a href={output} target="_blank" rel="noreferrer">
            Open File
          </a>
        </div>
      )}
    </div>
  </div>
  );


  
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "600px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "20px",
    color: "#94a3b8",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
  },
  button: {
    padding: "10px 15px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  loading: {
    color: "#facc15",
  },
  error: {
    color: "#ef4444",
  },
  result: {
    marginTop: "20px",
  },
  media: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default App;