import './PlayListScreen.css'

import { usePlayList } from '../../ActionProviders/PlayListAction'
import { NavLink, Outlet } from 'react-router-dom'

export const PlayListScreen = () => {
	const { playList } = usePlayList()

	return (
		<div className='playlistScreen'>
			<div className='playlist-titles'>
				{playList?.length > 0 &&
					playList?.map(p => (
						<NavLink to={`/playlist/${p._id}`}>{p.title}</NavLink>
					))}
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	)
}
