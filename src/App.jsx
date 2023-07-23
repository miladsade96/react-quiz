import Header from "./Header.jsx";
import Main from "./Main.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: "loading",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {...state, questions: action.payload, status: "ready"};
		case "dataFailed":
			return {...state, status: "error"};
		default:
			throw new Error("Unknown Action!");
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then(res => res.json())
			.then(data => dispatch({type: "dataReceived", payload: data}))
			.catch(err => dispatch({type: "dataFailed"}));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				<p>1/15</p>
				<p>Question?</p>
			</Main>
		</div>
	);
}
