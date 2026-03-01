import React, { useState } from "react";
import axios from "axios";

function App() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/demo-login", {
      mobileNumber,
      password
    });

    setResponseMessage(res.data.message);
  };

  return (
    <div style={styles.container}>
      <h2>🔒 Account Verification (Simulation)</h2>

      <p style={{ color: "red", fontSize: "14px" }}>
        This is a cybersecurity training exercise. Do NOT use real credentials.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {responseMessage && (
        <div style={styles.alert}>
          {responseMessage}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px"
  },
  alert: {
    marginTop: "20px",
    padding: "15px",
    background: "#ffeeba",
    borderRadius: "6px"
  }
};

export default App;