const YouWonMessage = ({ turns, shuffleCards }) => {
  return (
    <div className="bg-zinc-900 bg-opacity-50 py-32 mt-20 shadow-2xl rounded-xl">
      <h1 className="text-5xl">
        You won in <span className="font-bold">{turns}</span> turns
      </h1>

      <h4 className="mt-40 mb-10">Try again?</h4>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
};

export default YouWonMessage;
