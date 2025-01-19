import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const PictureCaptcha: React.FC = () => {
	const [score, setScore] = useState(0)
	const [globalColour, setGlobalColour] = useState('rgb(50,100,100)')
	const [diffColour, setDiffColour] = useState('rgb(50,100,255)')
	const [diffBy, setDiffBy] = useState(150)
	const [diffIndex, setDiffIndex] = useState(1)
	const navigate = useNavigate()

	const generateRandom = (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	const onSelect = (i: number) => {
		if (i == diffIndex) {
			setScore(score + 1)
			changeColor(diffBy)
			setDiffBy(diffBy - 20)
			if (score >= 4) {
				setTimeout(() => {
					navigate('/mathproblemgame')
				}, 3000)
			} else {
				setDiffIndex(generateRandom(1, 16))
			}
		} else {
			setScore(0)
			setDiffBy(150)
			setDiffColour('rgb(50,100,255)')
			setGlobalColour('rgb(50,100,100)')
		}
	}

	const changeColor = (diff: number) => {
		let r = generateRandom(0, 255)
		let g = generateRandom(0, 255)
		let b = generateRandom(0, 255)
		setGlobalColour('rgb(' + r + ',' + g + ',' + b + ')')
		let t = generateRandom(0, diff)
		t > r ? (t += r) : (r -= t)
		diff -= t
		t = generateRandom(0, diff)
		t > g ? (t += g) : (g -= t)
		diff -= t
		t = generateRandom(0, diff)
		t > b ? (t += b) : (b -= t)
		setDiffColour('rgb(' + r + ',' + g + ',' + b + ')')
	}

	useEffect(() => {
		setDiffIndex(generateRandom(1, 16))
	}, [])

	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
		>
			<Flex
				flexDir="column"
				height="500px"
				width="360px"
				border="2px solid #40376E"
				borderRadius="10px"
				bgColor="white"
				boxShadow="lg"
			>
				<Flex
					flexDir="column"
					height="120px"
					bgColor="rgb(34, 173, 255)"
					borderRadius="8px 8px 0 0"
					justifyContent="center"
					color="white"
					paddingLeft="24px"
					gap={0}
				>
					<Text fontSize="md">Select all images with{score}</Text>
					<Text marginTop="-5px" fontSize="2xl" fontWeight="bold">
						different colours
					</Text>
					{score < 5 && (
						<Text marginTop="-5px" fontSize="md">
							score: {score}/5
						</Text>
					)}
					{score == 5 && (
						<Text marginTop="-5px" fontSize="md">
							ok you seem promising, last stage
						</Text>
					)}
				</Flex>
				<Flex height="100%" padding="40px 20px">
					<Grid
						width="100%"
						height="100%"
						templateRows="repeat(4, 1fr)"
						templateColumns="repeat(4, 1fr)"
						gap={1}
					>
						<GridItem
							bgColor={diffIndex == 1 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(1)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 2 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(2)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 3 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(3)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 4 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(4)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 5 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(5)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 6 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(6)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 7 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(7)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 8 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(8)
							}}
						/>
						<GridItem
							bgColor={diffIndex == 9 ? diffColour : globalColour}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(9)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 10 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(10)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 11 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(11)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 12 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(12)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 13 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(13)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 14 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(14)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 15 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(15)
							}}
						/>
						<GridItem
							bgColor={
								diffIndex == 16 ? diffColour : globalColour
							}
							rowSpan={1}
							colSpan={1}
							_hover={{ cursor: 'pointer' }}
							onClick={() => {
								onSelect(16)
							}}
						/>
					</Grid>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default PictureCaptcha
