import React, {useState} from "react";
import { useHistory } from "react-router";

const Signup = (props) => {
  let history = useHistory();
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({name:"", email:"",password:"", cpassword:""})
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials
    // const response = await fetch(`${host}/api/auth/createuser`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({name, email, password})
    // });
    // const json = await response.json();
    // console.log(json);
    // console.log(password)
    // console.log(credentials.cpassword);
    // console.log(password===credentials.cpassword);
    if(password===credentials.cpassword){
      // redirect: Save the authtoken and redirect
      // localStorage.setItem('token',json.authToken)
      const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
    console.log(password)
    console.log(credentials.cpassword);
    console.log(password===credentials.cpassword);
      props.showAlert("Created User successfully", "success")
      history.push("/login")

    }
   else if(password!==credentials.cpassword){
      props.showAlert("Password doesn't match", "danger")
  
    }
    // else{
    //   props.showAlert("Invalid Details", "danger")
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            aria-describedby="emailHelp"
            onChange={onChange}
            // minLength={5}
            required
          />
         </div>
         <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
            // minLength={5}
          />
         </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            minLength={5}
            required
          onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
