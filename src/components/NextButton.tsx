import { useQuestions } from "../context/QuestionsContext";

const NextButton: React.FC<{ answer: number | null; numQuestions: number }> = ({
  answer,
  numQuestions,
}) => {
  const { nextQuestion, index, finish } = useQuestions();
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={() => nextQuestion()}>
        Next
      </button>
    );
  }
  return (
    <button className="btn btn-ui" onClick={() => finish()}>
      Finish
    </button>
  );
};

export default NextButton;
