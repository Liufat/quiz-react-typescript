import Options from "./Options";

export type QuestionProps = {
  question: {
    question: string;
    options: [];
    correctOption: number;
    points: number;
    id: string;
  };
  answer: null | number;
};

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} />
    </div>
  );
};

export default Question;
