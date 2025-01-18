import { useState, useEffect } from 'react'
import "./style.css";
import { Flex, Text, Image, Box, Button, keyframes } from '@chakra-ui/react'


const CoinFlip: React.FC = () => {
    const [heads, setHeads] = useState<number>(0);
    const [tails, setTails] = useState<number>(0);
    const [animation, setAnimation] = useState<string>("none");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [showCongrats, setShowCongrats] = useState<boolean>(false);
    
    useEffect(() => {
        if (heads === 1) {
          // Show an alert when heads reaches 3
          setShowCongrats(true);

      // Hide the congratulations text after a delay (optional)
      setTimeout(() => setShowCongrats(false), 5000); // Hides after 5 seconds
    }
  }, [heads]);
    const flipCoin = () => {
        const isHeads = Math.random() < 0.5;
        setAnimation("none"); // Reset animation before starting a new one
    
        setTimeout(() => {
        setAnimation(isHeads ? "spin-heads 3s forwards" : "spin-tails 3s forwards");
        }, 100);
        setTimeout(() => {
            if (isHeads) {
              setHeads((prev) => prev + 1);
            } else {
              resetStats();
            }
          }, 3100);
    
        setIsDisabled(true);
        setTimeout(() => {
        setIsDisabled(false);
        }, 3000);
    };
    

    const resetStats = () => {
        setAnimation("none");
        setHeads(0);
        setTails(0);
    };
    
    return (
        <Flex
        height="100vh"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, #575ce5 50%, #f9fbfc 50%)"
        >
        <Box bg="white" p="8" borderRadius="md" boxShadow="lg" textAlign="center">
            <Flex justify="space-between" mb="4">
            <Text fontWeight="bold">Heads: {heads}</Text>
            <Text fontWeight="bold">Tails: {tails}</Text>
            </Flex>
            {/* Show congratulatory text if heads reaches 3 */}
            {showCongrats && (
                <Text fontSize="lg" fontWeight="bold" color="green.500" mt="4">
                    🎉 Congratulations! You got 3 heads in a row! 🎉
                </Text>
                )}
            <Box
            className="coin"
            style={{
                animation: animation, // Apply animation dynamically
            }}
            >
            <Box className="heads">
                <Image src="/images/heads.svg" alt="Heads" />
            </Box>
            <Box className="tails">
                <Image src="/images/tails.svg" alt="Tails" />
            </Box>
            </Box>
    
            <Flex mt="4" gap="4">
            <Button
                colorScheme="blue"
                onClick={flipCoin}
                isDisabled={isDisabled}
                flex="1"
            >
                Flip Coin
            </Button>
            <Button
                colorScheme="blue"
                variant="outline"
                onClick={resetStats}
                flex="1"
            >
                Reset
            </Button>
            </Flex>
        </Box>
        </Flex>
    );
}

export default CoinFlip
