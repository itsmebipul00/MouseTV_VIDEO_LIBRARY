import { LikesContext } from '../contextCreator'

import { useContext } from 'react'

import { likesReducer } from '../reducers/likesReducer'

import { useReducer } from 'react'

import axios from 'axios'

import { useUser } from './AuthActions'

const LikesProvider = props => {
	const [{ likes, error: errorLikes }, dispatch] = useReducer(
		likesReducer,
		{
			likes: [],
		}
	)

	const { userInfo } = useUser()

	const config = {
		headers: {
			authorization: userInfo?.encodedToken,
		},
	}

	const toogleLikesVideos = async video => {
		const unlikeAction = data => {
			dispatch({
				type: 'REMOVE_FROM_LIKES',
				payload: data,
			})
		}

		const addToLikes = data => {
			dispatch({
				type: 'ADD_TO_LIKES',
				payload: data,
			})
		}

		const errorMessage = error =>
			dispatch({
				type: 'TOGGLE_LIKES_ERROR',
				payload: error,
			})

		const likedVideo =
			likes?.findIndex(x => x._id === video._id) === -1 ? false : true

		if (likedVideo) {
			try {
				const res = await axios.delete(
					`/api/user/likes/${video._id}`,
					config
				)

				const data = await res.data.likes

				unlikeAction(data)
			} catch (error) {
				errorMessage(error.message)
			}
		} else {
			try {
				const res = await axios.post(
					'/api/user/likes',
					{
						video,
					},
					config
				)

				const data = await res.data.likes

				addToLikes(data)
			} catch (error) {
				errorMessage(error.message)
			}
		}
	}

	return (
		<LikesContext.Provider
			value={{
				toogleLikesVideos,
				errorLikes,
				likes,
			}}>
			{props.children}
		</LikesContext.Provider>
	)
}

const useLikes = () => useContext(LikesContext)

export { LikesProvider, useLikes }
