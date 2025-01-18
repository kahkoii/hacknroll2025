import React, { useState, useEffect } from "react";
import { Flex, Text, Input, Button } from "@chakra-ui/react";

const MathProblemGame: React.FC = () => {
  const [problem, setProblem] = useState<string>(""); // Math problem
  const [answer, setAnswer] = useState<number | string>(""); // User's input
  const [correctAnswer, setCorrectAnswer] = useState<number>(0); // Correct answer
  const [timeLeft, setTimeLeft] = useState<number>(30); // Time left
  const [result, setResult] = useState<string>(""); // Result message
  const [isRunning, setIsRunning] = useState<boolean>(false); // Is the game running?

  // Generate a random math problem
  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Calculate the correct answer
    let result: number;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      default:
        result = 0;
    }

    setProblem(`${num1} ${operator} ${num2}`);
    setCorrectAnswer(result);
    setAnswer("");
    setResult("");
    setTimeLeft(30);
  };

  // Start the game
  const startGame = () => {
    generateProblem();
    setIsRunning(true);
    setTimeLeft(30);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  // Check the answer
  const checkAnswer = () => {
    if (parseInt(answer as string, 10) === correctAnswer) {
      setResult("🎉 Correct! Great job!");
    } else {
      setResult("❌ Incorrect. Try again!");
    }
    setIsRunning(false); // Stop the game
  };

  // Countdown timer
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isRunning) {
      setResult("⏰ Time's up! Better luck next time.");
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      bgGradient="linear(to-r, #575ce5 50%, #f9fbfc 50%)"
      textAlign="center"
    >
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Solve the Math Problem
      </Text>

      {!isRunning ? (
        <Button colorScheme="blue" onClick={startGame} mb="4">
          Start Game
        </Button>
      ) : (
        <Flex flexDir="column" alignItems="center">
          <Text fontSize="xl" mb="2">
            {problem}
          </Text>
          <Input
            type="number"
            placeholder="Enter your answer"
            value={answer}
            onChange={handleInputChange}
            mb="4"
            width="200px"
            textAlign="center"
          />
          <Button colorScheme="green" onClick={checkAnswer} mb="4">
            Submit Answer
          </Button>
          <Text fontSize="lg" mb="2">
            Time Left: {timeLeft}s
          </Text>
        </Flex>
      )}

      {result && (
        <Text fontSize="lg" fontWeight="bold" color="red.500" mt="4">
          {result}
        </Text>
      )}
    </Flex>
  );
};

export default MathProblemGame;
