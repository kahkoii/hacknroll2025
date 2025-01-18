import React, { useState, useEffect } from "react";
import { Flex, Text, Input, Button, Box, Image, IconButton } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

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
  const [buttonPosition, setButtonPosition] = useState<{ top: string; left: string } | null>(
    null // No random position at the start
  );

  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null); // Timer for button teleportation

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
      setResult("❌ Incorrect! Try again.");
      selectRandomCaptcha(); // Show a new CAPTCHA if incorrect
    }
  };

  // Function to teleport the button
  const teleportButton = () => {
    const randomTop = Math.random() * 80 + "%"; // Random position within 80% of the viewport
    const randomLeft = Math.random() * 80 + "%"; // Random position within 80% of the viewport
    setButtonPosition({ top: randomTop, left: randomLeft });
  };

  // Start teleport timer
  const startHoverTimeout = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear any existing timer
    const timeout = setTimeout(() => {
      teleportButton(); // Teleport button after 1000ms
    }, 20);
    setHoverTimeout(timeout as unknown as number);
  };

  // Stop teleport timer
  const stopHoverTimeout = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
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
      position="relative"
    >
      <Flex
        direction="column"
        align="center"
        padding="3"
        bg="white"
        border="2px solid #40376E"
        borderRadius="10px"
        boxShadow="lg"
        width="300px"
        height="400px" // Fixed height for the entire box
        position="relative"
      >
        <Flex>
          {/* Text with Border */}
          <Box
            mb="2"
            textAlign="center"
            width="100%"
            border="2px solid #2A73E8"
            backgroundColor="#2A73E8"
            color="white"
            borderRadius="1px"
            padding="8px"
          >
            <Text fontSize="md" fontWeight="bold">
              Type the characters shown below
            </Text>
          </Box>
        </Flex>

        {/* CAPTCHA Image Container with Fixed Dimensions */}
        {selectedCaptcha && (
          <Box
            mb="4"
            textAlign="center"
            width="250px"
            height="150px"
            bg="white"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Image
              src={selectedCaptcha.image}
              alt="CAPTCHA"
              objectFit="contain"
              maxW="100%"
              maxH="100%"
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

        {/* Submit Button and Refresh Icon */}
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Button
            width="70%"
            colorScheme="blue"
            onClick={() => {
              validateCaptcha();
              stopHoverTimeout(); // Stop teleport timer if clicked
            }}
            onMouseEnter={startHoverTimeout} // Start teleport timer on hover
            onMouseLeave={stopHoverTimeout} // Stop teleport timer if mouse leaves
            position={buttonPosition ? "absolute" : "relative"} // Initially relative for Flexbox alignment
            top={buttonPosition?.top} // Apply random top position if teleported
            left={buttonPosition?.left} // Apply random left position if teleported
            transform={buttonPosition ? "translate(-50%, -50%)" : undefined} // Center button after teleporting
          >
            Submit
          </Button>
          <IconButton
            width="30%"
            height="100%"
            aria-label="Reset CAPTCHA"
            icon={<RepeatIcon />}
            onClick={selectRandomCaptcha}
            variant="outline"
            colorScheme="blue"
            size="sm"
          />
        </Flex>

        {/* Result Message */}
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
