import { VideosContext } from '../contextCreator'
import { videosReducer } from '../reducers/videosReducer'
import { useContext, useReducer } from 'react'
import { categoriesReducer } from '../reducers/categoriesReducer'
import { fVidReducer } from '../reducers/fVidReducer'
import axios from 'axios'

const VideosProvider = props => {
	const [
		{ videos, loading: videosLoading, error: videosError },
		videosDispatcher,
	] = useReducer(videosReducer, {
		videos: [],
	})

	const [{ filteredVideos }, fVidDispatcher] = useReducer(
		fVidReducer,
		{ filteredVideos: [] }
	)

	const successVideos = data =>
		videosDispatcher({
			type: 'VIDEOS_SUCCESS',
			payload: data,
		})

	const setFilteredData = data => {
		fVidDispatcher({
			type: 'VIDEOS_FILTER_DATA',
			payload: data,
		})
	}

	const fetchVideos = async () => {
		try {
			videosDispatcher({ type: 'VIDEOS_LOADING_TRUE' })

			const res = await axios.get('/api/videos')

			setTimeout(() => successVideos(res.data.videos), 1000)

			setTimeout(() => setFilteredData(res.data.videos), 1000)
		} catch (err) {
			videosDispatcher({
				type: 'VIDEOS_ERROR',
				payload: err.message,
			})
		}
	}

	const [
		{
			categories,
			loading: categoriesLoading,
			error: categoriesError,
		},
		categoriesDispatcher,
	] = useReducer(categoriesReducer, {
		categories: [],
	})

	const successCategories = data =>
		categoriesDispatcher({
			type: 'CATEGORIES_SUCCESS',
			payload: data,
		})

	const fetchCategories = async () => {
		try {
			categoriesDispatcher({ type: 'CATEGORIES_LOADING_TRUE' })

			const res = await axios.get('/api/categories')

			setTimeout(() => successCategories(res.data.categories), 1000)
		} catch (err) {
			categoriesDispatcher({
				type: 'CATEGORIES_ERROR',
				payload: err.message,
			})
		}
	}

	return (
		<VideosContext.Provider
			value={{
				videosError,
				fetchCategories,
				fetchVideos,
				videosLoading,
				categories,
				categoriesError,
				categoriesLoading,
				filteredVideos,
				videos,
				setFilteredData,
			}}>
			{props.children}
		</VideosContext.Provider>
	)
}

const useVideos = () => useContext(VideosContext)

export { useVideos, VideosProvider }