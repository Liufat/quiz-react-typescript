import React, { useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorPage from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { useQuestions } from "../context/QuestionsContext";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const getUrl = "http://localhost:9000/questions";

enum Status {
  Loading,
  Error,
  Ready,
  Active,
  Finished,
}

export interface QuestionInterface {
  question: string;
  options: [];
  correctOption: number;
  points: number;
  id: string;
}

const FirstPage: React.FC = () => {
  const { questions, status, index, answer, getData, getDataFailed } =
    useQuestions();

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev: number, cur: QuestionInterface) => prev + cur.points,
    0
  );

  const getServerData = async () => {
    try {
      const result = await axios.get(getUrl);
      getData(result.data);
    } catch (error) {
      getDataFailed();
    }
  };

  useEffect(() => {
    getServerData();
  }, []);

  return (
    <div className="App">
      <div className="app">
        <Header />
        <Main>
          {status === Status.Loading && <Loader />}
          {status === Status.Error && <ErrorPage />}
          {status === Status.Ready && (
            <StartScreen numQuestions={numQuestions} />
          )}
          {status === Status.Active && (
            <>
              <Progress
                numQuestions={numQuestions}
                maxPossiblePoints={maxPossiblePoints}
              />
              <Question question={questions[index]} answer={answer} />
              <NextButton answer={answer} numQuestions={numQuestions} />
            </>
          )}
          {status === Status.Finished && (
            <FinishScreen maxPossiblePoints={maxPossiblePoints} />
          )}
        </Main>
      </div>
    </div>
  );
};

export default FirstPage;
