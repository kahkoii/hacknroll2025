import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import CoinFlip from './CoinFlip/CoinFlip'
import MathProblemGame from './MathProblemGame/MathProblemGame'

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/*" element={<Home />} />
			<Route path="/CoinFlip" element={<CoinFlip />}/>
			<Route path="/MathProblemGame" element={<MathProblemGame />}/>
		</Routes>
	</Router>
)

export default App
