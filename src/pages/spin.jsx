import React, { useRef, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { spinnData, prevData, serverTime } from "../stores/spinn/spinnSlice";
import { getSpinnData, getSpinResult } from "../stores/spinn/spinnAction";
import spinBg from "../assets/images/spin-bg.png";
import pointer from "../assets/images/pointer.png";
import backgroundImage from "../assets/images/bg.jpg";
import SpinTable from "../components/spin/spin-table";
import spinLogo from "../assets/images/spinLogo.png";
import kironLogo from "../assets/images/kironLogo.png";
import PlaceBet from "../assets/images/placebet.png";
import Red from "../assets/images/red.png";
import "./app.css";
import centerCircle from "./asset/center-circle.png";
import outerCircle from "./asset/outer-circle.png";
import highlights from "./asset/Highlights.png";
import NoNetworkPage from "../assets/images/waitingPage.png";

const Spin = () => {
  const dispatch = useDispatch();

  // api response states
  const spinData = useSelector(spinnData);
  const prevGames = useSelector(prevData);
  const serverTimeData = useSelector(serverTime);
  const [gameId, setGameId] = useState();
  const [error, setError] = useState(false);

  // main states
  const [currentState, setCurrentState] = useState("pending");

  // timer states
  const [time, setTime] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  let timeDifferenceInSeconds = 0;

  const itemCount = 37;

  const numbers = useMemo(
    () => [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
      24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
    ],
    []
  );
  const reds = [
    30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3, 32, 19, 21, 25, 34, 27, 36,
  ];

  // Your numbers and reds arrays

  const [stripes, setStripes] = useState([]);

  // rotational States
  const wheelRef = useRef(null);
  const [prevSpinResult, setPrevSpinResult] = useState(null);
  const [spinResult, setSpinResult] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(prevSpinResult);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [showPrevSpinResult, setShowPrevSpinResult] = useState(true);

  const [displayWarning, setDisplayWarning] = useState(false);
  const initialRotationDegree = {
    0: 0,
    32: 360 / 37,
    15: (360 / 37) * 2,
    19: (360 / 37) * 3,
    4: (360 / 37) * 4,
    21: (360 / 37) * 5,
    2: (360 / 37) * 6,
    25: (360 / 37) * 7,
    17: (360 / 37) * 8,
    34: (360 / 37) * 9,
    6: (360 / 37) * 10,
    27: (360 / 37) * 11,
    13: (360 / 37) * 12,
    36: (360 / 37) * 13,
    11: (360 / 37) * 14,
    30: (360 / 37) * 15,
    8: (360 / 37) * 16,
    23: (360 / 37) * 17,
    10: (360 / 37) * 18,
    5: (360 / 37) * 19,
    24: (360 / 37) * 20,
    16: (360 / 37) * 21,
    33: (360 / 37) * 22,
    1: (360 / 37) * 23,
    20: (360 / 37) * 24,
    14: (360 / 37) * 25,
    31: (360 / 37) * 26,
    9: (360 / 37) * 27,
    22: (360 / 37) * 28,
    18: (360 / 37) * 29,
    29: (360 / 37) * 30,
    7: (360 / 37) * 31,
    28: (360 / 37) * 32,
    12: (360 / 37) * 33,
    35: (360 / 37) * 34,
    3: (360 / 37) * 35,
    26: (360 / 37) * 36,
  };

  const [initialSpinRotationMap, setInitialSpinRotationMap] = useState(
    initialRotationDegree
  );

  useEffect(() => {
    const generateRandomNumber = () => Math.floor(Math.random() * 11);

    const newRandomNumbers = Array.from({ length: 37 }, () =>
      generateRandomNumber()
    );

    setStripes(newRandomNumbers);
  }, []);

  const classMakerTopBar = (index) => {
    if ([32, 15, 19, 4, 21, 2].includes(index)) {
      return "orange";
    } else if ([25, 17, 34, 6, 27, 13].includes(index)) {
      return "blue";
    } else if ([36, 11, 30, 8, 23, 10].includes(index)) {
      return "purple";
    } else if ([5, 24, 16, 33, 1, 20].includes(index)) {
      return "green";
    } else if ([14, 31, 9, 22, 18, 29].includes(index)) {
      return "yellow";
    } else if ([7, 28, 12, 35, 3, 26].includes(index)) {
      return "white";
    } else {
      return "zero";
    }
  };

  const classMakerSector = (index) => {
    if (numbers[index] === 0) {
      return "zero";
    } else if (reds.includes(numbers[index])) {
      return "red";
    } else {
      return "black";
    }
  };

  const generateBackground = (strips) => {
    const stops = [];

    const intialStop = 49.5;

    for (let i = 0; i < strips; i++) {
      stops.push(`rgba(4, 4, 4, 0) ${i * 4 + intialStop}%`);
      stops.push(`#ecd11f ${i * 4 + intialStop}%`);
      stops.push(`#ecd11f ${i * 4 + 2 + intialStop}%`);
      stops.push(`rgba(4, 4, 4, 0) ${i * 4 + 2 + intialStop}%`);
    }

    return `linear-gradient(90deg, ${stops.join(", ")})`;
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/login";
    }
  }, []);

  // timer functions
  useEffect(() => {
    const fetchSpinResult = async (spinId = spinData._id) => {
      if (!spinId) return;
      console.log(spinData._id, "spinId");
      try {
        const response = await dispatch(getSpinResult(spinId));

        if (response.payload.result[0] && currentState !== "spinning") {
          const spinResult = response.payload.result[0];
          setSpinResult(spinResult);

          if (spinResult) {
            setTimeout(() => {
              setCurrentState("spinning");

              const startingDegree = initialSpinRotationMap[spinResult];

              let nextDeg = startingDegree + 360 * 7;

              wheelRef.current.style.transition = "all 20s ease-out";
              wheelRef.current.style.transform = `rotate(${-nextDeg}deg)`;
            }, 50);
          }
        }
      } catch (error) {
        console.error("Error fetching spin result:", error);
        if (time === -3) {
          handleTransitionEnd();
        }
      }
    };

    const timer = setInterval(() => {
      if (time <= 11 && time > -3 && currentState === "pending") {
        setTime((prevTime) => prevTime - 1);
        setIsBlinking(true);
        fetchSpinResult();
      } else if (time > 0 && currentState === "pending") {
        setTime((prevTime) => prevTime - 1);
      } else if (time === 0 && currentState === "pending") {
        setIsBlinking(false);
        setTime(-1);
      } else if (time === -3 && currentState === "pending") {
        handleTransitionEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, currentState, gameId, dispatch, initialSpinRotationMap, spinData]);

  const formatTime = () => {
    const minutes = time > 0 ? Math.floor(time / 60) : 0;
    const seconds = time > 0 ? time % 60 : 0;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const fetchEndTime = async () => {
    try {
      const response = await dispatch(getSpinnData(gameId));

      if (response.payload.spinnData.endTime && response.payload.serverTime) {
        const endTime = new Date(response.payload.spinnData.endTime).getTime();
        const serverTime = new Date(response.payload.serverTime).getTime();

        timeDifferenceInSeconds = Math.round((endTime - serverTime) / 1000);
        setTime(timeDifferenceInSeconds);
      }
      if (response.payload.prevData) {
        const prevSpinResult = response.payload.prevData[0];
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = `rotate(${-initialSpinRotationMap[
          prevSpinResult
        ]}deg)`;
        setPrevSpinResult(prevSpinResult);
      }
    } catch (e) {
      setError(!error);
      console.error("Error fetching endTime:", e);
    }
  };

  useEffect(() => {
    handleTransitionEnd();
  }, [dispatch, initialSpinRotationMap, error]);

  const handleTransitionEnd = () => {
    if (!wheelRef.current) {
      return; // Exit the function if wheelRef is null
    }

    wheelRef.current.style.transition = "all ease-in";

    const currentTransform = wheelRef.current.style.transform;
    const matches =
      currentTransform && currentTransform.match(/rotate\((.*?)deg\)/);
    const actualDeg = matches && matches[1] ? parseFloat(matches[1]) : 0;

    // wheelRef.current.style.transform = `rotate(${-actualDeg}deg)`;

    setShowPrevSpinResult(true);
    setTimeout(() => {
      setShowPrevSpinResult(false);
    }, 4000);
    setCurrentState("pending");
    fetchEndTime();
    setIsBlinking(false);
  };

  useEffect(() => {
    const updateInterval = 75;

    let intervalId = setInterval(() => {
      if (currentState === "spinning") {
        setCurrentNumber(prevSpinResult === null ? null : prevSpinResult);
        if (sequenceIndex < numbers.length) {
          setCurrentNumber(numbers[sequenceIndex]);
          setSequenceIndex((prevIndex) => prevIndex + 1);
        } else {
          setSequenceIndex(0);
        }
      } else {
        setCurrentNumber(
          prevSpinResult === null
            ? null
            : numbers.find((number) => number === prevSpinResult)
        );
      }
    }, updateInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    sequenceIndex,
    spinResult,
    currentState,
    numbers,
    currentNumber,
    prevSpinResult,
  ]);

  useEffect(() => {
    if (showPrevSpinResult) {
      const timeout = setTimeout(() => {
        setShowPrevSpinResult(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, []);

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  useEffect(() => {
    if (screenWidth !== 1280 && screenHeight !== 720) {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
    }
  }, [screenWidth, screenHeight]);

  return (
    <>
      {displayWarning ? (
        <div className="flex items-center justify-center h-screen bg-gray-600">
          <h1
            className="text-2xl text-white l"
            style={{
              fontSize: "3rem",
            }}
          >
            Please set the screen display to 1280 x 720
          </h1>
        </div>
      ) : (
        <div
          className="grid h-screen grid-cols-8 gap-4 px-4 py-8 overflow-hidden bg-center bg-no-repeat bg-cover filter brightness-30"
          style={{
            backgroundColor: "#634722",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="col-span-5">
            <div className="flex flex-col items-center justify-center h-screen">
              <div
                className="relative"
                style={{
                  background: `url(${spinBg}) no-repeat center center / contain`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full">
                  <img
                    src={kironLogo}
                    alt="spin"
                    style={{
                      width: "30%",
                      height: "auto",
                      position: "absolute",
                      top: "-10%",
                      bottom: "auto",
                      left: "-10%",
                      transform: "translate(-50%, -50%)",
                      zIndex: "1",
                    }}
                  />
                  <img
                    src={spinLogo}
                    alt="spin"
                    style={{
                      width: "30%",
                      height: "auto",
                      position: "absolute",
                      top: "103%",
                      bottom: "auto",
                      left: "-10%",
                      transform: "translate(-50%, -50%)",
                      zIndex: "1",
                    }}
                  />
                </div>

                <img
                  src={pointer}
                  alt="marker"
                  style={{
                    width: "9%",
                    height: "10%",
                    position: "absolute",
                    top: "9%",
                    bottom: "auto",
                    left: "50%",
                    transform: "translate(-50%, -100%)",
                    zIndex: "1000",
                  }}
                />

                <div className="App">
                  <div className="circle-container">
                    <img
                      src={centerCircle}
                      alt={"inner circle"}
                      className="inner-circle-image"
                    />

                    <img
                      src={outerCircle}
                      alt={"outer circle"}
                      className="outer-circle-image"
                    />

                    <img
                      src={highlights}
                      alt={"highlights"}
                      className="highlights-image"
                    />
                    <div
                      className="circle-item-container"
                      ref={wheelRef}
                      onTransitionEnd={handleTransitionEnd}
                    >
                      {[...Array(itemCount).keys()].map((index) => (
                        <div
                          key={index}
                          className="dot"
                          style={{
                            transform: `rotate(${
                              index * (360 / itemCount) - 90
                            }deg) translateX(17.3vw) translateY(1.3vw)`,
                          }}
                        ></div>
                      ))}

                      {[...Array(itemCount).keys()].map((index) => (
                        <div
                          key={index}
                          className="circle-item"
                          style={{
                            transform: `rotate(${
                              index * (360 / itemCount) - 90
                            }deg) translate(50%)`,
                          }}
                        >
                          <div className="circle-item-body">
                            <div
                              className={`circle-item-bg ${classMakerSector(
                                index
                              )}`}
                            ></div>

                            <div className="top-bar-container">
                              <div
                                className={`top-bar-number ${
                                  numbers[index] < 10 ? "less-ten" : ""
                                }`}
                              >
                                {numbers[index]}
                              </div>
                              <div
                                className={`top-bar ${classMakerTopBar(
                                  numbers[index]
                                )}`}
                              ></div>
                            </div>
                            <div className="sector-content">
                              {currentState === "spinning" && (
                                <div
                                  className="bars"
                                  style={{
                                    background: generateBackground(
                                      stripes[index]
                                    ),
                                  }}
                                ></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`circle-center ${
                        classMakerTopBar(currentNumber) === "zero"
                          ? "green"
                          : currentState === "spinning"
                          ? classMakerTopBar(currentNumber)
                          : classMakerTopBar(prevSpinResult)
                      }`}
                      style={{
                        fontSize:
                          currentState === "spinning" ? "5.9rem" : "2.3rem",
                        textAlign: "center",
                      }}
                    >
                      <div className="blurry-bg">
                        {currentState === "spinning" ? (
                          <div
                            style={{
                              margin: "auto",
                            }}
                          >
                            <img
                              src={Red}
                              style={{
                                width: "85%",
                                height: "auto",
                                position: "absolute",
                                top: "50%",
                                bottom: "auto",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: "1",
                              }}
                              alt="red bg"
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: "2",
                                color: "white",
                                fontSize: "6.5vw",
                              }}
                            >
                              {currentNumber}
                            </div>
                          </div>
                        ) : showPrevSpinResult ? (
                          <div
                            style={{
                              margin: "auto",
                            }}
                          >
                            <img
                              src={Red}
                              style={{
                                width: "85%",
                                height: "auto",
                                position: "absolute",
                                top: "50%",
                                bottom: "auto",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: "1",
                              }}
                              alt="place bet"
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: "2",
                                color: "white",
                                fontSize: "6.5vw",
                              }}
                            >
                              {prevSpinResult}
                            </div>
                          </div>
                        ) : (
                          <img
                            src={PlaceBet}
                            style={{
                              width: "85%",
                              height: "auto",
                              position: "absolute",
                              top: "50%",
                              bottom: "auto",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: "1",
                            }}
                            alt="place bet"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-3 lg:col-span-3">
            <SpinTable
              Timer={formatTime()}
              isBlinking={isBlinking}
              isSpinning={
                currentState === "spinning" || currentState === "closed"
                  ? true
                  : false
              }
              gameData={spinData}
              prevGames={prevGames}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Spin;
