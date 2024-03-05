import { useState, useEffect } from "react";

export default function JuruBoard({ numOfPlayers }: { numOfPlayers: number }) {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const playerColors = [
    "bg-black",
    "bg-white",
    "bg-green-500",
    "bg-yellow-500",
  ];
  const initializePlayers = (num: number) =>
    Array.from({ length: num }, (_, index) => ({
      id: index,
      position: 0,
      color: playerColors[index], // Assign a color to each player
    }));
  const [players, setPlayers] = useState(() => initializePlayers(numOfPlayers));

  useEffect(() => {
    setPlayers(initializePlayers(numOfPlayers));
  }, [numOfPlayers]);

  const handleRollDice = () => {
    setIsButtonDisabled(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === currentPlayer) {
          return {
            ...player,
            position: (player.position + roll) % 36,
          };
        }
        return player;
      })
    );

    setTimeout(() => {
      setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % numOfPlayers);
      setIsButtonDisabled(false);
    }, 1000);
  };

  const renderPlayerMarker = (index: number) => {
    return players
      .filter((player) => player.position === index)
      .map((player) => (
        <div
          key={player.id}
          className={`w-4 h-4 ${player.color} rounded-full`}
        ></div>
      ));
  };

  const boardPositions = Array.from({ length: 36 }, (_, index) => index);

  return (
    <div className="bg-green-600 w-11/12 h-5/6 grid grid-cols-12 grid-rows-8 gap-1 p-1">
      {/* Top Row */}
      <div className="col-span-1 row-span-1 bg-blue-500">
        {boardPositions.slice(0, 1).map((index) => (
          <div key={index} className="flex flex-col justify-center items-center">
            Start
            <div className="flex">{renderPlayerMarker(index)}</div>
          </div>
        ))}
      </div>
      <div className="col-span-10 bg-red-500 flex">
        {boardPositions.slice(1, 11).map((index) => (
          <div
            key={index}
            className="flex-1 border border-black flex justify-center items-center"
          >
            {renderPlayerMarker(index)}
          </div>
        ))}
      </div>
      <div className="col-span-1 row-span-1 bg-blue-500">
        {boardPositions.slice(11, 12).map((index) => (
          <div key={index} className="flex-1 flex justify-center items-center">
            Jail
            {renderPlayerMarker(index)}
          </div>
        ))}
      </div>

      {/* Left Column */}
      <div className="row-span-6 bg-red-500 flex flex-col">
        {boardPositions
          .slice(30, 36)
          .reverse()
          .map((index) => (
            <div
              key={index}
              className="flex-1 border border-black flex justify-center items-center"
            >
              {renderPlayerMarker(index)}
            </div>
          ))}
      </div>

      {/* Center */}
      <div className="col-span-10 row-span-6 bg-white flex justify-center items-center">
        <button
          onClick={handleRollDice}
          disabled={isButtonDisabled}
          className={`p-2 text-white rounded ${
            isButtonDisabled
              ? "cursor-not-allowed bg-gray-500"
              : "cursor-pointer bg-blue-700"
          }`}
        >
          <div>Player {currentPlayer + 1}</div>
          Roll Dice (Roll: {diceRoll})
        </button>
      </div>

      {/* Right Column */}
      <div className="row-span-6 bg-red-500 flex flex-col">
        {boardPositions.slice(12, 18).map((index) => (
          <div
            key={index}
            className="flex-1 border border-black flex justify-center items-center"
          >
            {renderPlayerMarker(index)}
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="col-span-1 row-span-1 bg-blue-500">
        {boardPositions.slice(29, 30).map((index) => (
          <div key={index} className="flex-1 flex justify-center items-center">
            Free Parking
            {renderPlayerMarker(index)}
          </div>
        ))}
      </div>
      <div className="col-span-10 bg-red-500 flex">
        {boardPositions
          .slice(19, 29)
          .reverse()
          .map((index) => (
            <div
              key={index}
              className="flex-1 border border-black flex justify-center items-center"
            >
              {renderPlayerMarker(index)}
            </div>
          ))}
      </div>
      <div className="col-span-1 row-span-1 bg-blue-500">
        {boardPositions.slice(18, 19).map((index) => (
          <div key={index} className="flex-1 flex justify-center items-center">
            Go To Jail
            {renderPlayerMarker(index)}
          </div>
        ))}
      </div>
    </div>
  );
}
