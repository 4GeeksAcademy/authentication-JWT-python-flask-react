import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const LogIn = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  console.log("this is your token:", store.token);
  const handleSubmit = () => {
    actions.logIn(email, password).then(() => {
      !store.token ?
      navigate("/login")
      :
      navigate("/private")
  });
  }

  if (store.token && store.token != "" && store.token != undefined) navigate("/");

  return (
    <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
      <div className="container h-100 scale-up-center">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ "borderRadius": "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>
                    {(store.token && store.token != "" && store.token != undefined) ? "You are logged in" :
                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <p className="mb-0">
                            Don't have an account? Sign up {" "}
                            <Link to="/signup">here</Link>
                          </p>
                          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleSubmit}>Log in</button>
                        </div>

                      </form>
                    }
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}

export default LogIn;