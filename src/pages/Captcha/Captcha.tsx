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
import '/src/pages/background.css'

const Captcha: React.FC = () => {
	const captchaOptions = [
		{ text: 'qVpXayk', image: '/images/Captcha.png' },
		{ text: 'AAXUE', image: '/images/Captcha2.png' },
		{ text: 'CAPTCHA', image: '/images/Captcha3.png' },
		{ text: '18+5=', image: '/images/Captcha4.png' },
		{ text: 'orrHaa rmallsal', image: '/images/Captcha5.png' },
	]

	const [selectedCaptcha, setSelectedCaptcha] = useState<
		(typeof captchaOptions)[0] | null
	>(null) // Selected CAPTCHA
	const [userInput, setUserInput] = useState<string>('') // User's input
	const [result, setResult] = useState(false) // Result status
	const [showMessage, setShowMessage] = useState<boolean>(false)
	const [buttonPosition, setButtonPosition] = useState<{
		top: string
		left: string
	} | null>(
		null, // No random position at the start
	)

	const [hoverTimeout, setHoverTimeout] = useState<number | null>(null) // Timer for button teleportation
	const navigate = useNavigate()

	// Function to randomly select a CAPTCHA
	const selectRandomCaptcha = () => {
		const randomCaptcha =
			captchaOptions[Math.floor(Math.random() * captchaOptions.length)]
		setSelectedCaptcha(randomCaptcha)
		// Clear previous results
		setUserInput('')
		setResult(false)
	}

	// Validate the CAPTCHA
	const validateCaptcha = () => {
		if (userInput === selectedCaptcha?.text) {
			setResult(true)
		} else {
			setResult(false)
		}
	}

	// Function to teleport the button
	const teleportButton = () => {
		const randomTop = Math.random() * 80 + '%' // Random position within 80% of the viewport
		const randomLeft = Math.random() * 80 + '%' // Random position within 80% of the viewport
		setButtonPosition({ top: randomTop, left: randomLeft })
	}

	// Start teleport timer
	const startHoverTimeout = () => {
		if (hoverTimeout) clearTimeout(hoverTimeout) // Clear any existing timer
		const timeout = setTimeout(() => {
			teleportButton() // Teleport button after 1000ms
		}, 130)
		setHoverTimeout(timeout as unknown as number)
	}

	// Stop teleport timer
	const stopHoverTimeout = () => {
		if (hoverTimeout) clearTimeout(hoverTimeout)
	}

	const submitBtnLogic = () => {
		setShowMessage(true)
		if (result) {
			setTimeout(() => {
				navigate('/mathproblemgame')
			}, 2000)
			stopHoverTimeout() // Stop teleport timer if clicked
		} else {
			selectRandomCaptcha() // Show a new CAPTCHA if incorrect
		}
	}

	// Initialize CAPTCHA on component load
	useEffect(() => {
		selectRandomCaptcha()
	}, [])

	// Validate input immediately
	useEffect(() => {
		validateCaptcha()
	}, [userInput])

	return (
		<Flex
			height="100vh"
			alignItems="center"
			justifyContent="center"
			p="4"
			position="relative"
		>
			<div className="background-container">
				<div className="shape"></div>
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
			<Flex
				flexDir="column"
				border="2px solid #40376E"
				borderRadius="10px"
				bg="white"
				boxShadow="lg"
				width="350px"
				height="380px" // Fixed height for the entire box
				position="relative"
			>
				<Flex>
					{/* Text with Border */}
					<Box
						height="70px"
						width="100%"
						border="2px solid #2A73E8"
						backgroundColor="#2A73E8"
						color="white"
						borderRadius="8px 8px 0 0"
						padding="8px"
						textAlign="center"
					>
						<Text fontSize="md" fontWeight="bold" marginTop="12px">
							Type the characters shown below
						</Text>
					</Box>
				</Flex>

				{/* CAPTCHA Image Container with Fixed Dimensions */}
				<Flex flexDir="column" padding="20px" alignItems="center">
					{selectedCaptcha && (
						<Box
							textAlign="center"
							width="250px"
							height="120px"
							bg="white"
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

					{/* Result Message */}
					<Text
						fontSize="sm"
						display={result ? 'initial' : 'none'}
						visibility={showMessage ? 'initial' : 'hidden'}
						marginBottom="18px"
						color="green.500"
						fontWeight="bold"
					>
						✅ Guess you can read... but so can a bot
					</Text>
					<Text
						fontSize="sm"
						display={result ? 'none' : 'initial'}
						visibility={showMessage ? 'initial' : 'hidden'}
						marginBottom="18px"
						color="red.500"
						fontWeight="bold"
					>
						❌ Incorrect! Try again.
					</Text>

					{/* Input Field */}
					<Input
						placeholder="Enter result"
						value={userInput}
						onChange={(e) => {
							setShowMessage(false)
							setUserInput(e.target.value)
						}}
						mb="30px"
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
						position="relative"
					>
						<Button
							width="250px"
							zIndex="1"
							border="0"
							colorScheme="blue"
							onClick={() => submitBtnLogic()}
							onMouseEnter={() => {
								if (result) startHoverTimeout()
							}} // Start teleport timer on hover
							onMouseLeave={stopHoverTimeout} // Stop teleport timer if mouse leaves
							position="fixed"
							top={buttonPosition?.top} // Apply random top position if teleported
							left={buttonPosition?.left} // Apply random left position if teleported
							transform={
								buttonPosition
									? 'translate(-50%, -50%)'
									: undefined
							} // Center button after teleporting
						>
							Submit
						</Button>
						<IconButton
							width="50px"
							height="40px"
							right="0px"
							aria-label="Reset CAPTCHA"
							icon={<RepeatIcon />}
							onClick={() => {
								selectRandomCaptcha()
								setShowMessage(false)
							}}
							variant="outline"
							colorScheme="blue"
							size="sm"
							position="absolute"
						/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Captcha
