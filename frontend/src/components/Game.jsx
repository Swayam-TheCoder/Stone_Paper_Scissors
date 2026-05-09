import { useEffect, useState } from "react";

import { getMatches, saveMatch, clearMatches } from "../services/matchService";

function Game() {
  const choice = ["stone", "paper", "scissors"];

  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const [playerscore, setPlayerScore] = useState(0);
  const [computerscore, setComputerScore] = useState(0);

  const [history, setHistory] = useState([]);

  const [visibleCount, setVisibleCount] = useState(2);

  // FETCH MATCH HISTORY
  const fetchHistory = async () => {
    try {
      const data = await getMatches();

      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD HISTORY ON PAGE LOAD
  useEffect(() => {
    fetchHistory();
  }, []);

  // PLAY GAME
  const playgame = async (userChoice) => {
    const randomChoice = choice[Math.floor(Math.random() * 3)];

    let gameResult = "";

    if (userChoice === randomChoice) {
      gameResult = "Draw";
    } else if (
      (userChoice === "stone" && randomChoice === "scissors") ||
      (userChoice === "paper" && randomChoice === "stone") ||
      (userChoice === "scissors" && randomChoice === "paper")
    ) {
      gameResult = "You Win!";

      setPlayerScore((prev) => prev + 1);
    } else {
      gameResult = "Computer Wins!";

      setComputerScore((prev) => prev + 1);
    }

    setUserChoice(userChoice);
    setComputerChoice(randomChoice);
    setResult(gameResult);

    // SAVE MATCH
    try {
      await saveMatch({
        userChoice,
        computerChoice: randomChoice,
        result: gameResult,
      });

      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  // RESET GAME
  const resetGame = () => {
    setComputerChoice("");
    setUserChoice("");
    setResult("");

    setPlayerScore(0);
    setComputerScore(0);
  };

  const clearHistory = async () => {
    try {
      await clearMatches();
      setHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-10 text-cyan-400">
        Stone Paper Scissor
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-xl font-semibold transition"
          onClick={() => playgame("stone")}
        >
          Stone
        </button>

        <button
          className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-xl text-xl font-semibold transition"
          onClick={() => playgame("paper")}
        >
          Paper
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl text-xl font-semibold transition"
          onClick={() => playgame("scissors")}
        >
          Scissors
        </button>
      </div>

      {/* RESULT */}
      <div className="mt-10 text-center space-y-4">
        <h2 className="text-2xl">
          You:
          <span className="text-cyan-400 ml-2">{userChoice}</span>
        </h2>

        <h2 className="text-2xl">
          Computer:
          <span className="text-pink-400 ml-2">{computerChoice}</span>
        </h2>

        <h2 className="text-3xl font-bold mt-4">{result}</h2>
      </div>

      {/* SCORE */}
      <div className="flex gap-10 mt-10 text-2xl">
        <h2>
          Player Score:
          <span className="text-cyan-400 ml-2">{playerscore}</span>
        </h2>

        <h2>
          Computer Score:
          <span className="text-pink-400 ml-2">{computerscore}</span>
        </h2>
      </div>

      {/* RESET BUTTON */}
      <div className="mt-5 ">
        <button
          className="mt-10 mr-10 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-xl font-semibold transition"
          onClick={resetGame}
        >
          Reset Game
        </button>

        <button
          className="mt-4 bg-red-500 hover:bg-red-800 px-6 py-3 rounded-xl text-xl font-semibold transition"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      {/* MATCH HISTORY */}
      <div className="mt-10 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Match History</h1>

        <div className="space-y-3">
          {history.slice(0, visibleCount).map((match) => (
            <div key={match._id} className="bg-zinc-800 p-4 rounded-xl">
              <p>
                You:
                <span className="text-cyan-400 ml-2">{match.userChoice}</span>
              </p>

              <p>
                Computer:
                <span className="text-pink-400 ml-2">
                  {match.computerChoice}
                </span>
              </p>

              <p className="font-bold text-green-400">{match.result}</p>
            </div>
          ))}
          {visibleCount < history.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-lg font-semibold transition"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
