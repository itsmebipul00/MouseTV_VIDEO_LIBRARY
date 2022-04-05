import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import { VideoListingScreen } from './Screens/VideoListingScreen/VideoListingScreen'
import { VideosProvider } from './ActionProviders/VideoActions'
import { VideoScreen } from './Screens/VideoScreen/VideoScreen'
import { UserProvider } from './ActionProviders/AuthActions'
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen'
import { LikesProvider } from './ActionProviders/LikesAction'
import { WatchLaterProvider } from './ActionProviders/WatchLaterActions'
import { PlayListProvider } from './ActionProviders/PlayListAction'

import { LoginScreen } from './Screens/LoginScreen/LoginScreen'

function App() {
	return (
		<UserProvider>
			<VideosProvider>
				<LikesProvider>
					<WatchLaterProvider>
						<PlayListProvider>
							<BrowserRouter>
								<Routes>
									<Route path='/' element={<HomeScreen />} />
									<Route
										path='/videos'
										element={<VideoListingScreen />}
									/>
									<Route
										path='/video/:id'
										element={<VideoScreen />}
									/>
									<Route
										path='/register'
										element={<RegisterScreen />}
									/>
									<Route path='/login' element={<LoginScreen />} />
								</Routes>
							</BrowserRouter>
						</PlayListProvider>
					</WatchLaterProvider>
				</LikesProvider>
			</VideosProvider>
		</UserProvider>
	)
}

export default App
