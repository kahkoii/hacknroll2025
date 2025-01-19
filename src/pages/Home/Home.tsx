import { Flex, Checkbox, Text, Image, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import img from '/images/captcha.svg'
import { useEffect, useState } from 'react'
import '/src/pages/background.css';


const Home: React.FC = () => {
	const [clicked, setClicked] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [hereColour, setHereColour] = useState('rgb(0, 0, 0)')
	const [blueIndex, setBlueIndex] = useState(0)
	const navigate = useNavigate()

	// Slowly highlight text after checkbox is clicked
	useEffect(() => {
		if (clicked) {
			setTimeout(() => {
				setBlueIndex(blueIndex + 10)
				setHereColour('rgb(0, 0, ' + blueIndex + ')')
				console.log(blueIndex)
			}, 300)
		}
	}, [hereColour])

	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
		>
			<div className="background-container">
				<div className="shape"></div>
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
			<Flex
				flexDir="row"
				width="320px"
				border="2px solid #40376E"
				borderRadius="10px"
				bgColor="white"
				justifyContent="space-between"
				boxShadow="lg"
			>
				<Flex flexDir="row" alignItems="center" margin="30px">
					{clicked ? (
						<Spinner />
					) : (
						<Checkbox
							size="lg"
							checked={clicked}
							onChange={() => {
								setTimeout(() => {
									setHereColour('rgb(0, 0, 1)')
									setClicked(!clicked)
								}, 600)
							}}
						/>
					)}
					<Text marginLeft="14px">Click </Text>
					<Text
						marginLeft="4px"
						onClick={() => {
							setShowMessage(true)
							setTimeout(() => {
								navigate('/captcha')
							}, 3000)
						}}
						_hover={{ cursor: 'pointer' }}
						color={hereColour}
					>
						here
					</Text>{' '}
					<Text marginLeft="4px">to verify</Text>
				</Flex>
				<Flex
					flexDir="column"
					height="100%"
					width="80px"
					bgColor="#40376E"
					borderRadius="0 8px 8px 0"
					alignItems="center"
					justifyContent="center"
					gap="5px"
				>
					<Image src={img} width="32px" />
					<Text color="white" fontSize="2xs">
						SoCaptcha
					</Text>
				</Flex>
			</Flex>
			<Text
				marginTop="20px"
				color="green.500"
				visibility={showMessage ? 'initial' : 'hidden'}
			>
				Looks an awful lot like a bot... more tests required!
			</Text>
		</Flex>
	)
}

export default Home
