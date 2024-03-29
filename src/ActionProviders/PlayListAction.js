import axios from 'axios'
import { useContext, useReducer } from 'react'
import { PlayListContext } from '../contextCreator'
import { playListReducer } from '../reducers/playListReducer.js'

import { useUser } from './AuthActions'

const PlayListProvider = props => {
	const { userInfo } = useUser()

	const config = {
		headers: {
			authorization: userInfo?.encodedToken,
		},
	}

	const [{ error: errorPlayList, playList }, dispatch] = useReducer(
		playListReducer,
		{ playList: [] }
	)

	const postVideoToPlaylist = data => {
		dispatch({
			type: 'POST_VIDEO_TO_PLAYLIST',
			payload: data,
		})
	}

	const playListError = data => {
		dispatch({
			type: 'PLAYLIST_ERROR',
			payload: data,
		})
	}

	const createPlaylist = async (newPlaylist, video) => {
		try {
			const res = await axios.post(
				'/api/user/playlists',
				{ playlist: { title: newPlaylist } },
				config
			)

			const playLists = await res.data.playlists

			try {
				const response = await axios.post(
					`api/user/playlists/${playLists[playLists.length - 1]._id}`,
					{ video },
					config
				)

				postVideoToPlaylist(response.data.playlist)
			} catch (error) {
				playListError(error.message)
			}
		} catch (error) {
			playListError(error.message)
		}
	}

	const addVideoToPlaylist = async (id, video) => {
		try {
			const res = await axios.post(
				`api/user/playlists/${id}`,
				{ video },
				config
			)

			postVideoToPlaylist(res.data.playlist)
		} catch (error) {
			playListError(error.message)
		}
	}

	const deleteFromPlaylist = async (vid, play) => {
		try {
			const res = await axios.delete(
				`/api/user/playlists/${play._id}/${vid._id}`,
				config
			)

			const data = res.data.playlist

			dispatch({
				type: 'DELETE_VIDEO_FROM_PLAYLIST',
				payload: data,
			})
		} catch (error) {
			playListError(error.message)
		}
	}

	const deletePlaylist = async id => {
		try {
			const res = await axios.delete(
				`/api/user/playlists/${id}`,
				config
			)

			const data = res.data.playlists

			dispatch({
				type: 'DELETE_PLAYLIST',
				payload: data,
			})
		} catch (error) {
			playListError(error.message)
		}
	}

	return (
		<PlayListContext.Provider
			value={{
				createPlaylist,
				playList,
				errorPlayList,
				addVideoToPlaylist,
				deleteFromPlaylist,
				deletePlaylist,
			}}>
			{props.children}
		</PlayListContext.Provider>
	)
}

const usePlayList = () => useContext(PlayListContext)

export { PlayListProvider, usePlayList }
