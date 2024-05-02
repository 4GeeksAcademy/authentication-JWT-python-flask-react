import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			{ !store.token ?
			<h2>If you're seeing this, then you're not logged in - try logging in</h2>
			:
			// <h2>If you're seeing this, then you're logged in - this is protected information</h2>
			<>
			<ul className="list-group">
				{store.privated.map((item, index) => {
					return (
						
						
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
						
					);
				})}
			</ul>
			<img className="mx-auto d-block" src="https://dontgetserious.com/wp-content/uploads/2021/08/any-one-there-hello-memes.jpeg"></img>
			</>
}
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
