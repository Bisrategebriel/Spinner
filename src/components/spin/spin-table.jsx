import React from "react";
import FrequencyCard from "./frequencyCard";
import PreviousGameCard from "./previousGameCard";

const SpinTable = ({ Timer, isBlinking, gameData, prevGames }) => {
  const countOccurrences = (value) => {
    const occurrencesArray =
      Object.keys(prevGames).length !== 0 && // checking prevGame should not be empty can be empty
      prevGames.filter((item) => item === value);
    return occurrencesArray.length;
  };

  // defnition for the color pathern of roulette
  const colorLookup = {
    0: ["green-500", "green-500"],
    1: ["red-700", "green-500"],
    2: ["black", "orange-600"],
    3: ["red-700", "white"],
    4: ["black", "orange-600"],
    5: ["red-700", "green-500"],
    6: ["black", "blue-600"],
    7: ["red-700", "white"],
    8: ["black", "pink-600"],
    9: ["red-700", "yellow-300"],
    10: ["black", "pink-600"],
    11: ["black", "pink-600"],
    12: ["red-700", "white"],
    13: ["black", "blue-600"],
    14: ["red-700", "yellow-300"],
    15: ["black", "orange-600"],
    16: ["red-700", "green-500"],
    17: ["black", "blue-600"],
    18: ["red-700", "yellow-300"],
    19: ["red-700", "orange-600"],
    20: ["black", "green-500"],
    21: ["red-700", "orange-600"],
    22: ["black", "yellow-300"],
    23: ["red-700", "pink-600"],
    24: ["black", "green-500"],
    25: ["red-700", "blue-600"],
    26: ["black", "white"],
    27: ["red-700", "blue-600"],
    28: ["black", "white"],
    29: ["black", "yellow-300"],
    30: ["red-700", "pink-600"],
    31: ["black", "yellow-300"],
    32: ["red-700", "orange-600"],
    33: ["black", "green-500"],
    34: ["red-700", "blue-600"],
    35: ["black", "white"],
    36: ["red-700", "pink-600"],
  };
  // here we created the frequency value for all 36 numbers by calculating
  // their occureance and looking for their respective color of the number.
  const frequencyValues = Array.from({ length: 36 }, (_, index) => ({
    leftText: (index + 1).toString(),
    rightText: countOccurrences(index + 1),
    bgColorLeft: colorLookup[index + 1][0],
  }));

  // ALWAYS CHECK prevGAME NOT TO BE EMPTY STRING FIRST
  const previousGameResults = Array.from({ length: 6 }, (_, index) => ({
    leftText: `# ${gameData.gameId && gameData.gameId - index - 1}`,
    rightText: Object.keys(prevGames).length !== 0 && prevGames[index],
    bgColorLeft:
      Object.keys(prevGames).length !== 0 && colorLookup[prevGames[index]][0],
    bgColorRight:
      Object.keys(prevGames).length !== 0 && colorLookup[prevGames[index]][1],
  }));

  //calculates colors last 200(R,B,G)
  const halfColorCount = (color) => {
    let counter = 0;
    Object.keys(prevGames).length !== 0 &&
      prevGames.forEach((game) => {
        colorLookup[game][0] === color && counter++;
      });

    return counter;
  };

  //calculates colors last 200(O,B,PG,W,W)
  const quarterColorCount = (color) => {
    let counter = 0;
    Object.keys(prevGames).length !== 0 &&
      prevGames.forEach((game) => {
        colorLookup[game][1] === color && counter++;
      });
    return counter;
  };

  //calculates dozens
  const numberInRange = (min, max) => {
    let counter = 0;
    if (Object.keys(prevGames).length !== 0) {
      counter = prevGames.filter(
        (number) => number >= min && number < max
      ).length;
    }
    return counter;
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4  pt-1 align-middle border-2 rounded-md bg-black/50 border-black/60">
        <h1 className="mb-1 text-3xl text-white ">GAME {gameData.gameId}</h1>
        <div
          className={`timer mr-4 text-4xl font-medium text-white  ${
            isBlinking ? "blink" : ""
          }`}
          style={{
            fontSize: "3rem",
          }}
        >
          {Timer !== "BET CLOSED" && Timer !== "-1:0:1" ? (
            <span>{Timer}</span>
          ) : (
            <span
              style={{
                color: "white",
                fontFamily: "Roboto",
                fontWeight: "normal", 
                fontSize: "2rem",
              }}
            >
              BET CLOSED
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 my-2">
        <div className="grid h-full col-span-2 grid-rows-13">
          <h3 className="text- font-[600] bg-stone-100 border-b-2 border-black/60 text-center">
            PAY TABLE
          </h3>
          <div className="flex items-center border-b-2 border-black/60">
            <h3 className="p-1 px-5 py-2 text-xl font-semibold text-white bg-gray-900/50">
              COLOR
            </h3>
            <div className="flex items-center justify-center flex-grow w-1/3 bg-red-700">
              <h3 className="text-xl text-yellow-300 p-[7.5px] font-[600]">
                2
              </h3>
            </div>
            <div className="flex items-center justify-center flex-grow w-1/3 bg-black">
              <h3 className="text-xl text-yellow-300 p-2 font-[600]">2</h3>
            </div>
            <div className="flex items-center justify-center flex-grow w-1/3 bg-green-500">
              <h3 className="text-xl p-2 font-[600]">36</h3>
            </div>
          </div>
          <div className="flex w-full text-center border-b-2 border-black/60">
            <h3 className="bg-orange-700 w-1/6 text-xl py-2 font-[600]  text-yellow-300">
              6
            </h3>
            <h3 className="bg-blue-700 w-1/6 text-xl py-2 font-[600]  text-yellow-300 ">
              6
            </h3>
            <h3 className="bg-pink-600 w-1/6 text-xl py-2 font-[600]  text-yellow-300 ">
              6
            </h3>
            <h3 className="bg-green-500 w-1/6 text-xl py-2 font-[600]">6</h3>
            <h3 className="bg-yellow-400 w-1/6 text-xl py-2 font-[600]">6</h3>
            <h3 className="bg-white w-1/6 text-xl py-2 font-[600]  ">6</h3>
          </div>
          <div className="text-center">
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                NUMBER
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                36
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                DOZENS
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                3
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                ODD / EVEN
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                2
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                HIGH/LOW
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                2
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                SPLIT
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                18
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                3 LINE
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                12
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                CORNER
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                9
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 py-2 text-lg font-semibold text-white bg-gray-900/50">
                FIRST 4 CONNECTED
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                9
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                6 LINE
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                6
              </h2>
            </div>
            <div className="grid grid-cols-5 border-b-2 border-black/60">
              <h3 className="col-span-4 p-[7.5px] text-xl font-semibold text-white bg-gray-900/50">
                COLUMN
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                3
              </h2>
            </div>
            <div className="grid grid-cols-5">
              <h3 className="col-span-4 p-1.5  text-xl font-semibold text-white bg-gray-900/50">
                NEIGHBOURS
              </h3>
              <h2 className="flex items-center justify-center col-span-1 text-xl font-semibold text-yellow-400 bg-blue-500">
                7
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-2 ">
          <div className="bg-pink-300">
            <h3 className="font-[600] bg-stone-100 border-b-2 border-black/60 text-center text-[14px] ">
              PREVIOUS 6 GAMES
            </h3>
            <div className="grid grid-flow-col grid-rows-3">
              {previousGameResults.map((item, index) =>
                item.leftText !== "# undefined" ? (
                  <PreviousGameCard
                    key={index}
                    leftText={item.leftText}
                    rightText={item.rightText}
                    bgColorLeft={item.bgColorLeft}
                    bgColorRight={item.bgColorRight}
                  />
                ) : (
                  <div></div>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="text-[14px] font-[600] bg-stone-100 border-b-2 border-black/60 text-center">
              FREQUENCY (LAST 200 GAMES)
            </h3>
            <div className="grid grid-cols-3">
              <div>
                {frequencyValues.slice(0, 12).map((item, index) => (
                  <FrequencyCard
                    key={index}
                    leftText={item.leftText}
                    rightText={item.rightText}
                    bgColorLeft={item.bgColorLeft}
                    bgColorRight={item.bgColorRight}
                  />
                ))}
              </div>
              <div>
                {frequencyValues.slice(12, 24).map((item, index) => (
                  <FrequencyCard
                    key={index}
                    leftText={item.leftText}
                    rightText={item.rightText}
                    bgColorLeft={item.bgColorLeft}
                    bgColorRight={item.bgColorRight}
                  />
                ))}
              </div>
              <div>
                {frequencyValues.slice(24, 36).map((item, index) => (
                  <FrequencyCard
                    key={index}
                    leftText={item.leftText}
                    rightText={item.rightText}
                    bgColorLeft={item.bgColorLeft}
                    bgColorRight={item.bgColorRight}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[14px] font-[600] bg-stone-100 border-b-2 border-black/60 text-center">
              COLORS (LAST 200 GAMES)
            </h3>
            <div className="">
              <div className="flex text-center">
                <h3 className="w-1/3 h-[25px] font-semibold text-white bg-red-700">
                  {halfColorCount("red-700")}
                </h3>
                <h3 className="w-1/3 h-[25px] font-semibold text-white bg-black ">
                  {halfColorCount("black")}
                </h3>
                <h3 className="w-1/3 h-[25px] font-semibold text-white bg-green-500 ">
                  {halfColorCount("green-500")}
                </h3>
              </div>
              <div className="flex text-center">
                <h3 className="w-1/6 h-[25px] font-semibold text-white bg-orange-600">
                  {quarterColorCount("orange-600")}
                </h3>
                <h3 className="w-1/6 h-[25px] font-semibold text-white bg-blue-600">
                  {quarterColorCount("blue-600")}
                </h3>
                <h3 className="w-1/6 h-[25px] font-semibold text-white bg-pink-600">
                  {quarterColorCount("pink-600")}
                </h3>
                <h3 className="w-1/6 font-semibold text-black bg-green-500">
                  {quarterColorCount("green-500")}
                </h3>
                <h3 className="w-1/6 font-semibold text-black bg-yellow-300 ">
                  {quarterColorCount("yellow-300")}
                </h3>
                <h3 className="w-1/6 font-semibold text-black bg-white ">
                  {quarterColorCount("white")}
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className=" text-[14px] font-[600] bg-stone-100 border-b-2 border-black/60 text-center">
              DOZENS (LAST 200 GAMES)
            </h3>
            <div className="">
              <div className="flex text-center">
                <div className="grid w-1/3 grid-cols-5 font-semibold text-white bg-red-700 ">
                  <h3 className="col-span-3 text-white bg-gray-700 ">1-12</h3>
                  <h3 className="col-span-2 text-white bg-blue-600 ">
                    {" "}
                    {numberInRange(1, 12)}
                  </h3>
                </div>
                <div className="grid w-1/3 grid-cols-5 font-semibold text-white bg-red-700 ">
                  <h3 className="col-span-3 text-white bg-gray-700 ">13-24</h3>
                  <h3 className="col-span-2 text-white bg-blue-600 ">
                    {numberInRange(13, 24)}
                  </h3>
                </div>
                <div className="grid w-1/3 grid-cols-5 font-semibold text-white bg-red-700 ">
                  <h3 className="col-span-3 text-white bg-gray-700 ">25-36</h3>
                  <h3 className="col-span-2 text-white bg-blue-600 ">
                    {numberInRange(25, 36)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[14px] font-[600] bg-stone-100 border-b-2 border-black/60 text-center">
              HOT / COLD (LAST 200 GAMES)
            </h3>
            <div className="">
              <div className="flex items-center border-b-2 border-black/60">
                <h3 className="w-1/4 px-2 font-semibold text-white bg-orange-600">
                  HOT
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-black border-l-2 border-gray-800">
                  13
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-red-700 border-l-2 border-gray-800">
                  19
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-red-400 border-l-2 border-gray-800">
                  27
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-black border-l-2 border-gray-800">
                  22
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-red-700 border-l-2 border-gray-800">
                  9
                </h3>
              </div>
              <div className="flex items-center">
                <h3 className="w-1/4 px-2 font-semibold text-white bg-blue-600">
                  COLD
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-red-700 border-l-2 border-gray-800">
                  1
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-red-700 border-l-2 border-gray-800">
                  21
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-black border-l-2 border-gray-800">
                  17
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-red-700 border-l-2 border-gray-800">
                  5
                </h3>
                <h3 className="w-1/5 font-semibold text-center text-white bg-green-500 border-l-2 border-gray-800">
                  0
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinTable;
