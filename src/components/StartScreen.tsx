import { useQuestions } from "../context/QuestionsContext";

type StartScreenProps = {
  numQuestions: number;
};

const StartScreen: React.FC<StartScreenProps> = ({ numQuestions }) => {
  const { gameStart } = useQuestions();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          gameStart();
        }}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
