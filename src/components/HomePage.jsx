import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const globalLanguage = useSelector((state) => state.globalLanguage);
  const gameLanguage = useSelector((state) => state.language);
  const difficulty = useSelector((state) => state.difficulty);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    console.log(selectedLanguage);
    dispatch({ type: "SET_GLOBAL_LANGUAGE", payload: selectedLanguage });
  };

  useEffect(() => {}, []);

  return (
    <Container
      transition-style="in:circle:top-right"
      className="bg-white text-black rounded-5 mt-5 pb-4 mb-4"
    >
      <Row className="flex-column">
        <Col className="d-flex align-items-center justify-content-center mt-5">
          <h2 className="text-center me-2">
            {globalLanguage === "EN"
              ? "Welcome to Hangman game"
              : "Benvenuto su Hangman Game"}
          </h2>
          <Form.Select
            style={{ width: "20%" }}
            value={globalLanguage}
            onChange={(e) => {
              handleLanguageChange(e);
            }}
          >
            <option value="IT">🇮🇹</option>
            <option value="EN">🇬🇧</option>
          </Form.Select>
        </Col>

        <Col className="text-center mt-5">
          <p>
            {globalLanguage === "EN"
              ? "Please select language and difficulty"
              : "Per favore seleziona la lingua e la difficoltà"}
          </p>
        </Col>
        <Col className=" d-flex flex-column align-items-center">
          <Form.Label className="mt-5">
            {globalLanguage === "EN" ? "Language" : "Lingua"}
          </Form.Label>
          <Form.Select
            style={{ width: "30%" }}
            value={gameLanguage}
            onChange={(e) => {
              dispatch({
                type: "SET_LANGUAGE",
                payload: e.target.value,
              });
            }}
          >
            <option value="IT">🇮🇹</option>
            <option value="EN">🇬🇧</option>
          </Form.Select>
          <Form.Label className="mt-5">
            {globalLanguage === "EN" ? "Difficulty" : "Difficoltà"}
          </Form.Label>
          <Form.Select
            style={{ width: "30%" }}
            value={difficulty}
            onChange={(e) => {
              dispatch({
                type: "SET_DIFFICULTY",
                payload: parseInt(e.target.value),
              });
            }}
          >
            <option value="1">
              {globalLanguage === "EN" ? "Easy" : "Facile"}
            </option>
            <option value="2">
              {" "}
              {globalLanguage === "EN" ? "Medium" : "Medio"}
            </option>
            <option value="3">
              {" "}
              {globalLanguage === "EN" ? "Hard" : "Difficile"}
            </option>
          </Form.Select>
          <Button
            className="btn-success mt-4 rounded-4"
            onClick={() => {
              navigate("/main");
            }}
          >
            {" "}
            {globalLanguage === "EN" ? "Play" : "Gioca"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
