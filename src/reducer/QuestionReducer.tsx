import { QuestionInterface } from "../components/FirstPage";

enum Status {
  Loading,
  Error,
  Ready,
  Active,
  Finished,
}

const initialState: {
  questions: [];
  status: number;
  index: number;
  answer: null | number;
  points: number;
  hightscore: number;
} = {
  questions: [],
  status: Status.Loading,
  index: 0,
  answer: null,
  points: 0,
  hightscore: 0,
};

export type ACTIONTYPE =
  | { type: "dataReceived"; payload: [] }
  | {
      type: "dataFailed";
    }
  | {
      type: "gameStart";
    }
  | { type: "newAnswer"; payload: number }
  | {
      type: "nextQuestion";
    }
  | { type: "finish" }
  | { type: "restart" };

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: Status.Ready };
    case "dataFailed":
      return { ...state, status: Status.Error };
    case "gameStart":
      return { ...state, status: Status.Active };
    case "newAnswer":
      const question: QuestionInterface = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question !== undefined && action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index++, answer: null };
    case "finish":
      return {
        ...state,
        status: Status.Finished,
        hightscore:
          state.points > state.hightscore ? state.points : state.hightscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: Status.Active,
        hightscore: state.hightscore,
      };
    default:
      throw new Error("Action unknown");
  }
};

export { initialState, reducer };
