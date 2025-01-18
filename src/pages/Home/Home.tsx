import { Flex, Checkbox, Text, Image, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import img from '/images/captcha.svg'
import { useState } from 'react'

const Home: React.FC = () => {
	const [clicked, setClicked] = useState(false)
	const navigate = useNavigate()
	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
		>
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
									setClicked(!clicked)
								}, 600)
							}}
						/>
					)}
					<Text marginLeft="14px">Click </Text>
					<Text
						marginLeft="4px"
						onClick={() => navigate('/captcha')}
						_hover={{ cursor: 'pointer' }}
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
		</Flex>
	)
}

export default Home
