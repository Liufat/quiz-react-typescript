import { useQuestions } from "../context/QuestionsContext";
import { QuestionProps } from "./Question";

const Options: React.FC<QuestionProps> = ({ question, answer }) => {
  const hasAnswered = answer !== null;

  const { newAnswer } = useQuestions();
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => newAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
