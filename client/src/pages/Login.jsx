import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
  try {
    const res = await api.post("/users/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    navigate("/dashboard");

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};

  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
  Login
</button>

    </div>
  );
}

export default Login;