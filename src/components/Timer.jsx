import {useEffect} from "react";
import {useQuiz} from "../context/QuizContext.jsx";

export default function Timer() {
	const {dispatch, secondsRemaining} = useQuiz();
	const mins = Math.floor(secondsRemaining / 60);
	const secs = secondsRemaining % 60;

	useEffect(() => {
		const id = setInterval(() => {
			dispatch({type: "tick"});
		}, 1000);
		return () => clearInterval(id);
	}, [dispatch]);

	return (
		<div className="timer">
			{mins < 10 && "0"}
			{mins}:{secs < 10 && "0"}
			{secs}
		</div>
	);
}
