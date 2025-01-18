import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Treasure from './Treasure/Treasure'
import CoinFlip from './CoinFlip/CoinFlip'
import MathProblemGame from './MathProblemGame/MathProblemGame'
import Captcha from './Captcha/Captcha'
import AimTrainer from './AimTrainer/AimTrainer'

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/*" element={<Home />} />
			<Route path="/CoinFlip" element={<CoinFlip />}/>
			<Route path="/MathProblemGame" element={<MathProblemGame />}/>
			<Route path="/treasure" element={<Treasure />} />
			<Route path="/Captcha" element={<Captcha />} />
			<Route path="/AimTrainer" element={<AimTrainer />} />
		</Routes>
	</Router>
)

export default App
