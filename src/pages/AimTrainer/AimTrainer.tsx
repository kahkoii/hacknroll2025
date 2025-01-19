import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import '/src/pages/background.css';

const AimTrainer: React.FC = () => {
  const [targetVisible, setTargetVisible] = useState<boolean>(false); // Is the target visible?
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // Target position
  const [startTime, setStartTime] = useState<number>(0); // Time when the target appears
  const [reactionTime, setReactionTime] = useState<number | null>(null); // User's reaction time
  const [attempts, setAttempts] = useState<number>(0); // Number of attempts
  const [averageTime, setAverageTime] = useState<number | null>(null); // Average reaction time

  // Function to generate a random position for the target
  const generateRandomPosition = () => {
    const x = Math.random() * 80 + 10; // Random position (10% to 90% width)
    const y = Math.random() * 80 + 10; // Random position (10% to 90% height)
    return { x, y };
  };

  // Function to show the target
  const showTarget = () => {
    const position = generateRandomPosition();
    setTargetPosition(position);
    setTargetVisible(true);
    setStartTime(performance.now()); // Record the time when the target appears
  };

  // Function to handle target click
  const handleClickTarget = () => {
    const reaction = performance.now() - startTime; // Calculate reaction time
    setReactionTime(reaction);
    setAttempts((prev) => prev + 1);
    setTargetVisible(false);

    // Update average time
    setAverageTime((prev) =>
      prev === null ? reaction : (prev * (attempts) + reaction) / (attempts + 1)
    );

    // Show target again after a delay
    setTimeout(showTarget, Math.random() * 2000 + 1000); // 1-3 seconds delay
  };

  // Function to start the game
  const startGame = () => {
    setReactionTime(null);
    setAttempts(0);
    setAverageTime(null);
    setTimeout(showTarget, 1000); // Start the game after 1 second
  };

  return (
    <Flex
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bg="gray.100"
    >
      <div className="background-container">
				<div className="shape"></div>
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
      {/* Game Info */}
      <Box
        position="absolute"
        top="10px"
        left="10px"
        bg="white"
        p="4"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Attempts: {attempts}
        </Text>
        <Text fontSize="lg">
          Last Reaction Time: {reactionTime ? reactionTime.toFixed(2) + " ms" : "N/A"}
        </Text>
        <Text fontSize="lg">
          Average Reaction Time: {averageTime ? averageTime.toFixed(2) + " ms" : "N/A"}
        </Text>
      </Box>

      {/* Target */}
      {targetVisible && (
        <Box
          position="absolute"
          bg="red.500"
          borderRadius="50%"
          width="40px"
          height="40px"
          style={{
            top: `${targetPosition.y}%`,
            left: `${targetPosition.x}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleClickTarget}
          cursor="pointer"
        />
      )}

      {/* Start Button */}
      {!targetVisible && attempts === 0 && (
        <Button
          colorScheme="blue"
          size="lg"
          onClick={startGame}
        >
          Start Aim Trainer
        </Button>
      )}
    </Flex>
  );
};

export default AimTrainer;
