import React, { useState, useEffect } from 'react'
import { Flex, Text, Input, Button } from '@chakra-ui/react'
import { derivative, evaluate } from 'mathjs'
import nerdamer from 'nerdamer'
import 'nerdamer/Solve'
import 'nerdamer/Calculus'

const MathProblemGame: React.FC = () => {
	const [problem, setProblem] = useState<string>('') // Math problem
	const [answer, setAnswer] = useState<string>('') // User's input
	const [correctAnswer, setCorrectAnswer] = useState<number>(0) // Correct answer
	const [timeLeft, setTimeLeft] = useState<number>(30) // Changed to 30 seconds
	const [result, setResult] = useState<string>('') // Result message
	const [isRunning, setIsRunning] = useState<boolean>(false) // Is the game running?

	// Generate a random calculus problem
	const generateProblem = () => {
		const problemType = Math.random() < 0.5 ? 'derivative' : 'integral' // Randomly choose derivative or integral

		let problem: string
		let solution: number

		if (problemType === 'derivative') {
			// Generate a random polynomial
			const a = Math.floor(Math.random() * 10) + 1 // Coefficient
			const b = Math.floor(Math.random() * 5) + 1 // Exponent
			const c = Math.floor(Math.random() * 10) - 5 // Constant
			const expression = `${a}x^${b} + ${c}`

			// Calculate the derivative at x = 1
			problem = `Find the derivative of ${expression} at x = 1`
			solution = evaluate(derivative(expression, 'x').toString(), {
				x: 1,
			})
		} else {
			// Generate a random polynomial for integration
			const a = Math.floor(Math.random() * 5) + 1
			const b = Math.floor(Math.random() * 5) + 1
			const expression = `${a}x^${b}`
			const lowerBound = 1
			const upperBound = 2

			// Calculate the definite integral using nerdamer
			const integralExpression = nerdamer
				.integrate(expression, 'x')
				.toString()
			const upperValue = evaluate(integralExpression, { x: upperBound })
			const lowerValue = evaluate(integralExpression, { x: lowerBound })
			solution = upperValue - lowerValue

			problem = `Evaluate the integral of ${expression} from ${lowerBound} to ${upperBound}`
		}

		setProblem(problem)
		setCorrectAnswer(Number(solution.toFixed(2))) // Round the solution to 2 decimal places
		setAnswer('')
		setResult('')
		setTimeLeft(30) // Reset the timer to 30 seconds
	}

	// Start the game
	const startGame = () => {
		generateProblem()
		setIsRunning(true)
		setTimeLeft(30) // Set to 30 seconds
	}

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value)
	}

	// Check the answer
	const checkAnswer = () => {
		if (parseFloat(answer) === correctAnswer) {
			setResult("How did you solve that? You're definitely a bot 🤖")
			setIsRunning(false) // Stop the game
		} else {
			setResult('❌ Incorrect! Try this new question.')
			generateProblem() // Generate a new question
		}
	}

	// Countdown timer
	useEffect(() => {
		if (isRunning && timeLeft > 0) {
			const timer = setTimeout(() => {
				setTimeLeft(timeLeft - 1)
			}, 1000)
			return () => clearTimeout(timer)
		} else if (timeLeft === 0 && isRunning) {
			setResult(
				"Either you're a really slow bot or really a human... hmmm which is it? 🤔",
			)
			setIsRunning(false) // Stop the game when the timer runs out
		}
	}, [isRunning, timeLeft])

	return (
		<Flex
			height="100vh"
			alignItems="center"
			justifyContent="center"
			bg="white"
		>
			<Flex
				direction="column"
				align="center"
				justify="center"
				p="8"
				border="1px solid #ccc"
				borderRadius="md"
				boxShadow="lg"
				bg="white"
			>
				<Text fontSize="2xl" fontWeight="bold" mb="4">
					Solve the Math Problem
				</Text>

				{!isRunning ? (
					<Button colorScheme="blue" onClick={startGame} mb="4">
						Start Game
					</Button>
				) : (
					<Flex flexDir="column" alignItems="center">
						<Text fontSize="xl" mb="2">
							{problem}
						</Text>
						<Input
							type="number"
							placeholder="Enter your answer"
							value={answer}
							onChange={handleInputChange}
							mb="4"
							width="200px"
							textAlign="center"
						/>
						<Button colorScheme="blue" onClick={checkAnswer} mb="4">
							Submit Answer
						</Button>
						<Text fontSize="lg" mb="2">
							Time Left: {timeLeft}s
						</Text>
					</Flex>
				)}

				{result && (
					<Text
						fontSize="lg"
						fontWeight="bold"
						color={result.includes('🎉') ? 'green.500' : 'red.500'}
						mt="4"
					>
						{result}
					</Text>
				)}
			</Flex>
		</Flex>
	)
}

export default MathProblemGame
