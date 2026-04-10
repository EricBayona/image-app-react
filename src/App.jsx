import { useState } from "react";
import { api } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    console.log(res.data);
    localStorage.setItem("token", res.data.access_token);
    alert("login ok");
  };

  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const res = await api.post("/images/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    alert("imagen subida");
  };

  return (
    <>
      <div>
        <h1>Login</h1>

        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
      <h2>Subir imagen</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={uploadImage}>Subir</button>
    </>
  );
}

export default App;
