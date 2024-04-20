import React, { useState, useEffect } from 'react';
import './App.css';

const buttonColors = ["red", "blue", "green", "yellow"];

function App() {
  let gamePattern = [];
  let userClickedPattern = [];
  let started = false;
  let level = 0;

  document.addEventListener('keydown', (event) => {
    if (!started && event.key === 'Enter'){
      document.getElementById("level-title").innerText = "Level " + level;
      nextSequence();
      started = true;
    }
  });

  const nextSequence = () => {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").innerText = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateSequence(randomChosenColor);
    playSound(randomChosenColor);
  };

  const handleClick = (chosenColor) => {
    userClickedPattern.push(chosenColor);

    playSound(chosenColor);
    animatePress(chosenColor);

    checkAnswer(userClickedPattern.length-1);
  };

  const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      document.body.classList.add("game-over");
      document.getElementById("level-title").innerText = "Game Over, Press Enter to Restart";
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 200);

      startOver();
    }
  };

  const animatePress = (currentColor) => {
    const element = document.getElementById(currentColor);
    element.classList.add("pressed");
    setTimeout(() => {
      element.classList.remove("pressed");
    }, 100);
  };

  const animateSequence = (currentColor) => {
    const element = document.getElementById(currentColor);
    element.classList.add("glow");
    setTimeout(() => {
      element.classList.remove("glow");
    }, 300);
  };

  const playSound = (name) => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/${name}.mp3`);
    audio.play();
  };

  const startOver = () => {
    level = 0;
    gamePattern= [];
    userClickedPattern = [];
    started = false;
  };

  return (
    <div id="body">
      <h1 id="level-title">Press the Enter Key to Start</h1>
      <div className="container">
        <div className="row">
          {buttonColors.map((color) => (
            <div
              key={color}
              type="button"
              id={color}
              className={`btn ${color}`}
              onClick={() => handleClick(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
