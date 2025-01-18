import React, { useState } from "react";
import { Flex, Text, Input, Button, Box } from "@chakra-ui/react";

const Captcha: React.FC = () => {
  const [captcha, setCaptcha] = useState<string>(""); // Captcha challenge
  const [userInput, setUserInput] = useState<string>(""); // User's input
  const [result, setResult] = useState<string>(""); // Result message

  // Generate a random CAPTCHA string
  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomCaptcha = "";
    for (let i = 0; i < 6; i++) {
      randomCaptcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(randomCaptcha);
    setUserInput(""); // Clear user input
    setResult(""); // Clear previous result
  };

  // Validate the CAPTCHA
  const validateCaptcha = () => {
    if (userInput === captcha) {
      setResult("✅ Correct! You are not a bot.");
    } else {
      setResult("❌ Incorrect! Please try again.");
      generateCaptcha(); // Generate a new CAPTCHA if incorrect
    }
  };

  // Run CAPTCHA generation on load
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="white"
      direction="column"
    >
      <Box
        bg="gray.200"
        p="4"
        mb="4"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold" color="blue.500" letterSpacing="4px">
          {captcha}
        </Text>
      </Box>
      <Input
        placeholder="Enter the CAPTCHA"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        mb="4"
        width="200px"
        textAlign="center"
      />
      <Button colorScheme="blue" onClick={validateCaptcha} mb="4">
        Submit
      </Button>
      {result && (
        <Text fontSize="lg" fontWeight="bold" color={result.includes("✅") ? "green.500" : "red.500"}>
          {result}
        </Text>
      )}
    </Flex>
  );
};

export default Captcha;
