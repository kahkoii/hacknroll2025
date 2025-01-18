import React, { useState, useEffect } from "react";
import { Flex, Text, Input, Button, Box, Image, IconButton } from "@chakra-ui/react";
// import { RepeatIcon } from "@chakra-ui/icons"; // Temporary icon for the reset button

const Captcha: React.FC = () => {
  const captchaOptions = [
    { text: "qVpXayk", image: "/images/Captcha.png" },
    { text: "AAxUE", image: "/images/Captcha2.png" },
    { text: "CAPTCHA", image: "/images/Captcha3.png" },
    { text: "18 + 5 =", image: "/images/Captcha4.png" },
    { text: "orrHaa rmallsal", image: "/images/Captcha5.png" },
  ];

  const [selectedCaptcha, setSelectedCaptcha] = useState<typeof captchaOptions[0] | null>(null); // Selected CAPTCHA
  const [userInput, setUserInput] = useState<string>(""); // User's input
  const [result, setResult] = useState<string>(""); // Result message

  // Function to randomly select a CAPTCHA
  const selectRandomCaptcha = () => {
    const randomCaptcha = captchaOptions[Math.floor(Math.random() * captchaOptions.length)];
    setSelectedCaptcha(randomCaptcha);
    setUserInput(""); // Clear previous input
    setResult(""); // Clear previous result
  };

  // Validate the CAPTCHA
  const validateCaptcha = () => {
    if (userInput === selectedCaptcha?.text) {
      setResult("✅ Correct! Guess you can read.");
    } else {
      setResult("❌ Incorrect! Wow.");
      selectRandomCaptcha(); // Show a new CAPTCHA if incorrect
    }
  };

  // Initialize CAPTCHA on component load
  useEffect(() => {
    selectRandomCaptcha();
  }, []);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      p="4"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        p="6"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        width="300px"
      >
        <Flex justify="space-between" width="100%" mb="4">
          <Text fontSize="md" color="gray.600" textAlign="center">
            Type the characters shown below
          </Text>
          <IconButton
            aria-label="Reset CAPTCHA"
            // icon={<RepeatIcon />} // Temporary icon
            variant="ghost"
            onClick={selectRandomCaptcha}
          />
        </Flex>

        {/* CAPTCHA Image */}
        {selectedCaptcha && (
          <Box mb="4" textAlign="center">
            <Image
              src={selectedCaptcha.image} // Dynamically link the image
              alt="CAPTCHA"
              width="200px"
            />
          </Box>
        )}

        <Input
          placeholder="Enter result"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          mb="4"
          width="100%"
          textAlign="center"
          borderColor="gray.300"
          focusBorderColor="blue.500"
        />

        <Button
          colorScheme="blue"
          onClick={validateCaptcha}
          width="100%"
        >
          Submit
        </Button>

        {result && (
          <Text
            fontSize="sm"
            mt="4"
            fontWeight="bold"
            color={result.includes("✅") ? "green.500" : "red.500"}
          >
            {result}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Captcha;
