import { Button, Col, Container, Row } from "react-bootstrap";

import first from "../assets/img/hangman-0.svg";
import second from "../assets/img/hangman-1.svg";
import third from "../assets/img/hangman-2.svg";
import fourth from "../assets/img/hangman-3.svg";
import fifth from "../assets/img/hangman-4.svg";
import sixth from "../assets/img/hangman-5.svg";
import seventh from "../assets/img/hangman-6.svg";
import youWin from "../assets/img/2024-03-12-You-Win-.gif";
import { useEffect, useState } from "react";
import { selectArrayToUse } from "../arrays/arrays";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfettiExplosion from "react-confetti-explosion";

const MainContent = () => {
  const [errors, setErrors] = useState(0);
  const [wordArray, setWordArray] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const globalLanguage = useSelector((state) => state.globalLanguage);
  const languageToUse = useSelector((state) => state.language);
  const difficulty = useSelector((state) => state.difficulty);
  const [wordToGuess, setWordToGuess] = useState("");
  const navigate = useNavigate();

  const upperCaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const pickWord = () => {
    let randomWord = "";
    let arrayToUse = selectArrayToUse(languageToUse, difficulty);

    for (let i = 0; i < arrayToUse.length; i++) {
      randomWord =
        arrayToUse[Math.floor(Math.random() * arrayToUse.length)].toUpperCase();
    }
    setWordToGuess(randomWord);
    return randomWord.split("");
  };

  const checkLetter = (letter) => {
    if (wordArray.includes(letter)) {
      console.log("c'è");
      let quantity = wordArray.filter((x) => x === letter).length;
      console.log("quante volte c'è?", quantity);
      setGuessedLetters((prevGuessedLetters) => {
        let updatedGuessedLetters = [...prevGuessedLetters];
        for (let i = 0; i < quantity; i++) {
          updatedGuessedLetters.push(letter);
        }
        return updatedGuessedLetters;
      });
    } else {
      console.log("non c'è");
      setUsedLetters([...usedLetters, letter]);
      setErrors((prevErrors) => prevErrors + 1);
    }
  };

  const checkWin = () => {
    if (wordArray.length !== guessedLetters.length) {
      return false;
    }

    return wordArray.every((l) => guessedLetters.includes(l));
  };

  const setDisabled = (value) => {
    if (
      usedLetters.includes(value) ||
      guessedLetters.includes(value) ||
      errors === 7 ||
      checkWin()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkError = () => {
    switch (errors) {
      case 0:
        return first;
      case 1:
        return second;
      case 2:
        return third;
      case 3:
        return fourth;
      case 4:
        return fifth;
      case 5:
        return sixth;
      case 6:
        return seventh;
      case 7:
        console.log("gameover");
        break;
      default:
        return first;
    }
  };

  const setStarsDifficulty = () => {
    let arrayOfStars = [];
    for (let i = 0; i < difficulty; i++) {
      arrayOfStars.push(<i className="bi bi-star-fill text-warning"></i>);
    }
    return arrayOfStars;
  };

  useEffect(() => {
    setWordArray(pickWord());
  }, []);

  return (
    <Container className="p-3" transition-style="in:circle:top-right">
      {checkWin() && (
        <ConfettiExplosion
          duration={5000}
          particleCount={100}
          width={10000}
          className="text-center"
        />
      )}
      <h1 className="text-center">Hangman</h1>
      <h5 className="text-center">
        {globalLanguage === "EN"
          ? "Word's language: "
          : "Lingua della parola: "}{" "}
        {languageToUse}
      </h5>
      <h6 className="text-center">
        {globalLanguage === "EN" ? "Difficulty: " : "Difficoltà: "}{" "}
        {setStarsDifficulty()}
      </h6>
      {checkWin() ? (
        <h5 className="text-center">
          {globalLanguage === "EN" ? "Word to guess was:" : "La parola era"} :{" "}
          {wordToGuess}
        </h5>
      ) : errors === 7 ? (
        <h5 className="text-center">
          {globalLanguage === "EN" ? "Word to guess was:" : "La parola era"}{" "}
          {wordToGuess}
        </h5>
      ) : (
        ""
      )}
      <Row className="border border-2 rounded-5 bg-white shadow text-black py-0 py-md-3">
        {errors === 7 ? (
          <Col className="text-center">
            <img
              src="https://cdn.pixabay.com/animation/2023/11/23/04/15/04-15-08-729_512.gif"
              alt="game-over"
              style={{ width: "80%" }}
            />
          </Col>
        ) : checkWin() ? (
          <Col className="text-center">
            <img src={youWin} alt="game-over" style={{ width: "80%" }} />
          </Col>
        ) : (
          <>
            {" "}
            <Col>
              <img
                src={checkError()}
                alt="banner"
                style={{ width: "100%", height: "350px" }}
              />
            </Col>
            <Col className="align-self-center text-center px-5">
              <p className="fw-bold">
                {globalLanguage === "EN"
                  ? "Word to guess: "
                  : "Parola da indovinare: "}
              </p>
              {wordArray !== "" && (
                <ul className="d-flex list-unstyled justify-content-between mt-4">
                  {wordArray.map((letter, i) => {
                    const delay = i * 0.2 + "s";

                    return (
                      <li
                        key={i}
                        className="expand fw-bold"
                        style={{ animationDelay: delay }}
                      >
                        {guessedLetters.includes(letter) ? letter : "_"}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Col>
          </>
        )}
      </Row>
      <Row className="justify-content-center flex-column align-items-center">
        <h6 className={`text-center mt-3 ${errors === 6 ? "heartbeat" : ""}`}>
          {globalLanguage === "EN" ? "Errors :" : "Errori:"} {errors}/7
        </h6>
        <Col className="text-center">
          <Button
            className="rounded-4 btn-success"
            onClick={() => {
              window.location.reload();
            }}
          >
            {globalLanguage === "EN" ? "Restart" : "Ricomincia"}
          </Button>
        </Col>
        <Col className="col-12 col-md-6  d-flex flex-wrap justify-content-center mt-5">
          {upperCaseLetters.map((letter, i) => {
            return (
              <Button
                variant={
                  guessedLetters.includes(letter)
                    ? "success"
                    : usedLetters.includes(letter)
                    ? "danger"
                    : "primary"
                }
                disabled={setDisabled(letter)}
                key={i}
                className="m-1"
                value={letter}
                onClick={() => {
                  checkLetter(letter);
                }}
              >
                {letter}
              </Button>
            );
          })}
        </Col>
        <Col className="text-center mt-5">
          <Button
            className="btn-warning rounded-4"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
