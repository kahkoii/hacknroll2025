import { Flex, Checkbox, Text, Box } from '@chakra-ui/react'

const Home: React.FC = () => {
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
			>
				<Flex flexDir="row" alignItems="center" margin="30px">
					<Checkbox size="lg" />
					<Text marginLeft="14px">Click here to verify</Text>
				</Flex>
				<Box
					height="100%"
					width="80px"
					bgColor="#40376E"
					borderRadius="0 8px 8px 0"
				/>
			</Flex>
		</Flex>
	)
}

export default Home
