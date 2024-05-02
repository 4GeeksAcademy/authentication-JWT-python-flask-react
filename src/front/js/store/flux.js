import SignUp from "../pages/signup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "hello, world",
			token: null,
			privated: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "blue",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application finished loading, synching session storage token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("logging out");
				setStore({ token: null });
			},

			logIn: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})


				}
				try {
					const resp = await fetch('https://friendly-happiness-v9g77rrrg9gcw457-3001.app.github.dev/api/login', options)

					if (resp.status !== 200) {
						alert("An error has occurred, please try again");
						return false;
					}



					const data = await resp.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.log("there has been an error logging in");
				}
			},

			signUp: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password,
						"is_active": true
					})


				}
				try {
					const resp = await fetch('https://friendly-happiness-v9g77rrrg9gcw457-3001.app.github.dev/api/signup', options)

					if (!resp.ok) {
						const errorMessage = await resp.text(); // Get error message from response body
						alert(errorMessage || "An error occurred during registration. Please try again.");
						return false;
					}

					const data = await resp.json();
					console.log("You registered successfully", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.error("Error during registration:", error);
					alert("An error occurred during registration. Please try again.");
					return false;
				}
			},
			resetMessage: () => {
				setStore({ message: "hello, world" });
			},
			getMessage: async () => {
				const store = getStore();
				const options = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}

					// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello", options)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("error loading message from backend", error));
			},
			
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const privated = store.privated.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ privated: privated });
			}
		}
		}
	};


export default getState;
