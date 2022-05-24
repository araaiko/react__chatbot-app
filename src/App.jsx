import React from "react";
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import { AnswersList, Chats } from "./components";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset, //外部データベースと接続する場合は{}にしておこう
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        this.displayNextQuestion(nextQuestionId);
        break;
      default: //nextQuestionIdがinit以外の場合
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        }); //answersはdatasetの時点で配列になっているので、push()はいらなかった？

        this.setState({
          chats: chats
        });

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  }
  
  componentDidMount() { //=useEffect & 初回レンダリングのみ
    this.selectAnswer("", this.state.currentId);
  }

  componentDidUpdate() {
    const scrollArea = document.querySelector('#js-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;      
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          {/* {console.log(this.state.chats)} */}
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>      
    )
  }
}
