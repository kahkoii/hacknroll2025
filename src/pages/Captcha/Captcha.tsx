import React, { useState, useEffect } from 'react'
import {
	Flex,
	Text,
	Input,
	Button,
	Box,
	Image,
	IconButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RepeatIcon } from '@chakra-ui/icons'

const Captcha: React.FC = () => {
	const captchaOptions = [
		{ text: 'qVpXayk', image: '/images/Captcha.png' },
		{ text: 'AAxUE', image: '/images/Captcha2.png' },
		{ text: 'CAPTCHA', image: '/images/Captcha3.png' },
		{ text: '18 + 5 =', image: '/images/Captcha4.png' },
		{ text: 'orrHaa rmallsal', image: '/images/Captcha5.png' },
	]

	const [selectedCaptcha, setSelectedCaptcha] = useState<
		(typeof captchaOptions)[0] | null
	>(null) // Selected CAPTCHA
	const [userInput, setUserInput] = useState<string>('') // User's input
	const [result, setResult] = useState<string>('') // Result message
	const navigate = useNavigate()

	// Function to randomly select a CAPTCHA
	const selectRandomCaptcha = () => {
		const randomCaptcha =
			captchaOptions[Math.floor(Math.random() * captchaOptions.length)]
		setSelectedCaptcha(randomCaptcha)
		setUserInput('') // Clear previous input
		setResult('') // Clear previous result
	}

	// Validate the CAPTCHA
	const validateCaptcha = () => {
		if (userInput === selectedCaptcha?.text) {
			setResult('( ͠° ͟ʖ ͡°) Correct, but seems a lil sus tho...')
			setTimeout(() => {
				navigate('/coinflip')
			}, 3000)
		} else {
			setResult('❌ Incorrect! Wow.')
			selectRandomCaptcha() // Show a new CAPTCHA if incorrect
		}
	}

	// Initialize CAPTCHA on component load
	useEffect(() => {
		selectRandomCaptcha()
	}, [])

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
				// justify="center"
				padding="3"
				bg="white"
				border="2px solid #40376E"
				borderRadius="10px"
				boxShadow="lg"
				width="300px"
				height="400px" // Fixed height for the entire box
			>
				<Flex>
					{/* Text with Border */}
					<Box
						mb="2" // Reduced margin-bottom
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
						width="250px" // Fixed width for the image container
						height="150px" // Fixed height for the image container
						bg="white"
						borderRadius="md"
						display="flex"
						alignItems="center"
						justifyContent="center"
						overflow="hidden"
					>
						<Image
							src={selectedCaptcha.image} // Dynamically link the image
							alt="CAPTCHA"
							objectFit="contain" // Ensure the image scales proportionally
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
				<Flex
					width="100%"
					justifyContent="space-between"
					alignItems="center"
				>
					<Button
						width="70%"
						colorScheme="blue"
						onClick={validateCaptcha}
						flex="1"
						mr="1"
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

				{result && (
					<Text
						fontSize="sm"
						mt="4"
						fontWeight="bold"
						color={result.includes('✅') ? 'green.500' : 'red.500'}
					>
						{result}
					</Text>
				)}
			</Flex>
		</Flex>
	)
}

export default Captcha
