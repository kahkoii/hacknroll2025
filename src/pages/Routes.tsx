import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Treasure from './Treasure/Treasure'
import CoinFlip from './CoinFlip/CoinFlip'
import MathProblemGame from './MathProblemGame/MathProblemGame'
import Captcha from './Captcha/Captcha'
import AimTrainer from './AimTrainer/AimTrainer'
import PictureCaptcha from './PictureCaptcha/PictureCaptcha'

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/*" element={<Home />} />
			<Route path="/coinflip" element={<CoinFlip />} />
			<Route path="/mathproblemgame" element={<MathProblemGame />} />
			<Route path="/treasure" element={<Treasure />} />
			<Route path="/captcha" element={<Captcha />} />
			<Route path="/aimtrainer" element={<AimTrainer />} />
			<Route path="/picturecaptcha" element={<PictureCaptcha />} />
		</Routes>
	</Router>
)

export default App
