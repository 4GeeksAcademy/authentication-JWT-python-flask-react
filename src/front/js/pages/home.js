import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		if (store.token) {
			actions.getMessage();
		} else {
			actions.resetMessage();
		}
	}, [store.token]);

	return (
		<section className="vh-100" style={{ backgroundColor: "#eee" }}>
			<div className="container slide-bottom"> {/* Apply the slide-bottom animation */}
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-lg-12 col-xl-11">
						<div className="card text-black" style={{ borderRadius: "25px" }}>
							<div className="card-body p-md-5">
								<div className="row justify-content-center">
									<div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Welcome to my JWT practice</p>
										<div className="alert" style={{ fontFamily: "Roboto", fontSize: "32px", fontWeight: "normal" }}>
											<p>{store.message}</p>
										</div>
										{!store.token ?
											<Link to="/login">
												<button className="btn btn-primary">Log In</button>
											</Link>
											:
											<button onClick={() => actions.logout()} className="btn btn-primary">Log Out</button>
										}
										<div>
											<p>
												Don't have an account? Sign up {" "}
												<Link to="/signup">here</Link>
											</p>
										</div>
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
	);
};
