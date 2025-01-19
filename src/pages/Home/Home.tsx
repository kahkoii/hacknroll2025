import { Flex, Checkbox, Text, Image, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import img from '/images/captcha.svg'
import { useEffect, useState } from 'react'
import '/src/pages/background.css'

const particlesOptions = {
	fpsLimit: 60,
	particles: {
		groups: {
			z5000: {
				number: {
					value: 70,
				},
				zIndex: {
					value: 5000,
				},
			},
			z7500: {
				number: {
					value: 30,
				},
				zIndex: {
					value: 75,
				},
			},
			z2500: {
				number: {
					value: 50,
				},
				zIndex: {
					value: 25,
				},
			},
			z1000: {
				number: {
					value: 40,
				},
				zIndex: {
					value: 10,
				},
			},
		},
		number: {
			value: 200,
			density: {
				enable: false,
				area: 800,
			},
		},
		color: {
			value: '#fff',
		},
		shape: {
			type: 'circle',
		},
		opacity: {
			value: { min: 0.1, max: 1 },
		},
		size: {
			value: 3,
		},
		move: {
			angle: { value: 10, offset: 0 },
			enable: true,
			speed: 5,
			direction: 'right',
			straight: true,
			outModes: 'out',
		},
		zIndex: { value: 5, opacityRate: 0.5 },
	},
	interactivity: {
		events: {
			onClick: { enable: true, mode: 'push' },
			resize: true,
		},
		modes: {
			push: {
				quantity: 4,
				groups: ['z5000', 'z7500', 'z2500', 'z1000'],
			},
		},
	},
	background: {
		color: '#000000',
	},
	emitters: {
		position: { y: 55, x: -30 },
		rate: { delay: 7, quantity: 1 },
		particles: {
			shape: {
				type: 'images',
				options: {
					images: [
						{
							src: 'https://particles.js.org/images/amongus_blue.png',
							width: 205,
							height: 267,
						},
						{
							src: 'https://particles.js.org/images/amongus_cyan.png',
							width: 207,
							height: 265,
						},
						{
							src: 'https://particles.js.org/images/amongus_green.png',
							width: 204,
							height: 266,
						},
						{
							src: 'https://particles.js.org/images/amongus_red.png',
							width: 204,
							height: 267,
						},
					],
				},
			},
			size: { value: 40 },
			move: {
				speed: 10,
				outModes: {
					default: 'destroy',
					left: 'none',
				},
				straight: true,
			},
			rotate: {
				value: { min: 0, max: 360 },
				animation: { enable: true, speed: 10, sync: true },
			},
		},
	},
}

const Home: React.FC = () => {
	const [clicked, setClicked] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [hereColour, setHereColour] = useState('rgb(0, 0, 0)')
	const [blueIndex, setBlueIndex] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		if (clicked) {
			setTimeout(() => {
				setBlueIndex(blueIndex + 10)
				setHereColour('rgb(0, 0, ' + blueIndex + ')')
			}, 300)
		}
	}, [clicked, blueIndex])

	const particlesInit = async (engine: any) => {
		await loadFull(engine) // Load the full tsParticles engine
	}

	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
		>
			{/* Particles Background */}
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={particlesOptions}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: -1, // Ensures particles appear in the background
				}}
			/>

			{/* Main Content */}
			<Flex
				flexDir="row"
				width="320px"
				border="2px solid #40376E"
				borderRadius="10px"
				bgColor="white"
				zIndex={1}
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
					</Text>
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
				zIndex={1}
			>
				Looks an awful lot like a bot... more tests required!
			</Text>
		</Flex>
	)
}

export default Home
