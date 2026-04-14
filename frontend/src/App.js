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

        <button
          onClick={handleSubmit}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Process"}
        </button>
      </div>

      {loading && <p style={styles.loading}>Processing... please wait</p>}
      {error && <p style={styles.error}>{error}</p>}

      {output && (
        <div style={styles.result}>
          <h3 style={{ marginBottom: "15px", color: "#FFD700" }}>Result</h3>

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

          <a href={output} target="_blank" rel="noreferrer" style={styles.link}>
            Open File ↗
          </a>
        </div>
      )}
    </div>
  </div>
  );


  
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0a0a0a",
    color: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },

  card: {
    background: "#111111",
    padding: "40px",
    borderRadius: "16px",
    width: "650px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
    border: "1px solid rgba(255,215,0,0.15)",
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#FFD700",
    textAlign: "center",
    letterSpacing: "1px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#bbbbbb",
    fontSize: "14px",
  },

  inputGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
  },

  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
  },

  button: {
    padding: "12px 18px",
    background: "linear-gradient(135deg, #FFD700, #bfa100)",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  },

  loading: {
    textAlign: "center",
    color: "#FFD700",
    marginBottom: "10px",
  },

  error: {
    textAlign: "center",
    color: "#ff4d4d",
    marginBottom: "10px",
  },

  result: {
    marginTop: "25px",
    padding: "20px",
    background: "#0d0d0d",
    borderRadius: "12px",
    border: "1px solid rgba(255,215,0,0.1)",
  },

  media: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
    border: "1px solid #222",
  },

  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#FFD700",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default App;