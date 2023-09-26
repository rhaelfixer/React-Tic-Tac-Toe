import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Row, Col} from "react-bootstrap";
import "./App.css";


function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [player1, setPlayer1] = useState({
    name: "",
    isSet: false,
  });
  const [player2, setPlayer2] = useState({
    name: "",
    isSet: false,
  });
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [player2Turn, setPlayer2Turn] = useState(false);
  const [player1Win, setPlayer1Win] = useState(false);
  const [player2Win, setPlayer2Win] = useState(false);
  const [p1Counter, setP1Counter] = useState(0);
  const [p2Counter, setP2Counter] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleSetPlayer1Name = () => {
    const playerNameInput = document.getElementById("player-1-name");
    setPlayer1({
      name: playerNameInput.value,
      isSet: true,
    });
  };

  const handleSetPlayer2Name = () => {
    const playerNameInput = document.getElementById("player-2-name");
    setPlayer2({
      name: playerNameInput.value,
      isSet: true,
    });
  };

  const handleClick = (row, col) => {
    if (!board[row][col] && !gameOver) {
      const newBoard = [...board];
      newBoard[row][col] = player1Turn ? "X" : "O";
      setBoard(newBoard);
      checkWinner();

      // Disable further clicks if the game is over
      if (!gameOver) {
        switchTurns();
      }
    }
  };

  const checkWinner = () => {
    const winningCombos = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        if (player1Turn) {
          setPlayer1Win(true);
          setP1Counter(p1Counter + 1);
        } else {
          setPlayer2Win(true);
          setP2Counter(p2Counter + 1);
        }
        // Set the game as over
        setGameOver(true);
        return;
      }
    }

    if (!gameOver && board.flat().every((cell) => cell !== "")) {
      setIsDraw(true);
      setGameOver(true);
    }
  };

  const switchTurns = () => {
    if (!gameOver) {
      setPlayer1Turn(!player1Turn);
      setPlayer2Turn(!player2Turn);
    }
  };

  const newGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayer1({name: "", isSet: false});
    setPlayer2({name: "", isSet: false});
    setPlayer1Turn(true);
    setPlayer2Turn(false);
    setPlayer1Win(false);
    setPlayer2Win(false);
    setP1Counter(0);
    setP2Counter(0);
    setIsDraw(false);
    setGameOver(false);
  };

  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayer1Win(false);
    setPlayer2Win(false);
    setIsDraw(false);
    setGameOver(false);
  };

  return (
    <>
      <div className="container-fluid container-CSS">
        <h1 className="title-CSS">Tic Tac Toe</h1>
        <h2 className="result-CSS">
          Score:{" "}
          {(player1Win || player2Win) ? (
            player1Win
              ? `${ player1.name || "Player 1" } wins!`
              : `${ player2.name || "Player 2" } wins!`
          ) : isDraw && (
            "It's a draw!"
          )}
        </h2>
      </div>
      <br />
      <div className="new-reset-CSS">
        <button className="new-CSS" onClick={newGame}>
          New Game
        </button>
        {gameOver || isDraw ? (
          <button className="reset-CSS" onClick={resetGame}>
            Reset Game
          </button>
        ) : null}
      </div>

      <div className="container-fluid section1-CSS">
        <Row className="d-flex justify-content-center player-info-CSS">
          <Col md="auto">
            <h3>{player1.isSet ? player1.name : "Player 1"} - "X"</h3>
            <h3>Win: {p1Counter}</h3>
            {!player1.isSet && (
              <>
                <input
                  className="input-name-CSS"
                  type="text"
                  name="player-1-name"
                  id="player-1-name"
                  placeholder="Enter Player 1 Name"
                  required
                />
                <button className="start-button-CSS" onClick={handleSetPlayer1Name}>
                  START
                </button>
              </>
            )}
          </Col>
          <Col md="auto">
            <h3>{player2.isSet ? player2.name : "Player 2"} - "O"</h3>
            <h3>Win: {p2Counter}</h3>
            {!player2.isSet && (
              <>
                <input
                  className="input-name-CSS"
                  type="text"
                  name="player-2-name"
                  id="player-2-name"
                  placeholder="Enter Player 2 Name"
                  required
                />
                <button className="start-button-CSS" onClick={handleSetPlayer2Name}>
                  START
                </button>
              </>
            )}
          </Col>
        </Row>
      </div>

      <div className="container-fluid section2-CSS">
        <div className="grid-CSS">
          {board.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div
                  className="grid-box-CSS"
                  key={colIndex}
                  id={`box-${ rowIndex + 1 }-${ colIndex + 1 }`}
                  data-box=""
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="section3-CSS">
        <p className="p-copyright-CSS">
          Copyright &#169; {new Date().getFullYear()} Rhael Fixer
        </p>
      </div>
    </>
  );
}

export default App;
