import { ReactNode, createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/QuestionReducer";

interface QuestionInitialState {
  questions: [];
  status: number;
  index: number;
  answer: null | number;
  points: number;
  hightscore: number;
  getData: (data: []) => void;
  getDataFailed: () => void;
  gameStart: () => void;
  newAnswer: (answerNumber: number) => void;
  nextQuestion: () => void;
  finish: () => void;
  restart: () => void;
}

const QuestionsContext = createContext<QuestionInitialState | null>(null);

const QuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ questions, status, index, answer, points, hightscore }, dispatch] =
    useReducer(reducer, initialState);

  const getData = (data: []) => {
    dispatch({ type: "dataReceived", payload: data });
  };

  const getDataFailed = () => {
    dispatch({ type: "dataFailed" });
  };

  const gameStart = () => {
    dispatch({ type: "gameStart" });
  };

  const newAnswer = (answerNumber: number) => {
    dispatch({ type: "newAnswer", payload: answerNumber });
  };

  const nextQuestion = () => {
    dispatch({ type: "nextQuestion" });
  };

  const finish = () => {
    dispatch({ type: "finish" });
  };

  const restart = () => {
    dispatch({ type: "restart" });
  };
  return (
    <QuestionsContext.Provider
      value={{
        questions,
        points,
        status,
        hightscore,
        index,
        answer,
        getData,
        getDataFailed,
        gameStart,
        newAnswer,
        nextQuestion,
        finish,
        restart,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

const useQuestions = () => {
  const currentQuestionContext = useContext(QuestionsContext);

  if (!currentQuestionContext) {
    throw new Error("useQuestionContext should be used within provider");
  }
  return currentQuestionContext;
};

export { QuestionsProvider, useQuestions };
