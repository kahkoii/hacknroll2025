import { Flex, Text } from '@chakra-ui/react'

const Treasure: React.FC = () => {
	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			gap="20px"
		>
			<Text>Congratulations!</Text>
		</Flex>
	)
}

export default Treasure
