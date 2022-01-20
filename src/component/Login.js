import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const host = "http://localhost:5000";
const Login = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  let history=useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credential.email, password: credential. password }),
    });
    const json = await response.json();
    console.log(json);
if(json.success){
    localStorage.setItem('token',json.authtoken)
    history.push("/")
}
else{
    alert("invalid credential")
}



  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credential.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credential.password}
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
