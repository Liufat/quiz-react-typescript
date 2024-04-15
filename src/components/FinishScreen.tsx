import { useQuestions } from "../context/QuestionsContext";

const FinishScreen: React.FC<{ maxPossiblePoints: number }> = ({
  maxPossiblePoints,
}) => {
  const { points, hightscore, restart } = useQuestions();
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {hightscore} points)</p>
      <button className="btn btn-ui" onClick={() => restart()}>
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
