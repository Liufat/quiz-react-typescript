import { useQuestions } from "../context/QuestionsContext";

const Progress: React.FC<{
  numQuestions: number;
  maxPossiblePoints: number;
}> = ({ numQuestions, maxPossiblePoints }) => {
  const { index, points, answer } = useQuestions();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
