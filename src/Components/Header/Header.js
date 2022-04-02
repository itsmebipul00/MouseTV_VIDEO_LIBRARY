import {
	GalaMouse,
	FeSearch,
	UiwLogout,
	RiUser3Fill,
} from '../../assets/logos'
import { isEmptyObject } from '../../utils/isEmptyObject'
import { useUser } from '../../ActionProviders/AuthActions'
import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
	const { userInfo, logoutUser } = useUser()

	const isUserObjEmpty = isEmptyObject(userInfo)

	return (
		<header className='header d-flex'>
			<div className='d-flex'>
				<GalaMouse
					width='3rem'
					height='3rem'
					fill='white'
					stroke='white'
				/>
				<h1 className='brand-name letter-spacing-4 d-inline'>tv</h1>
			</div>
			<div className='d-flex header-side'>
				<label
					className='sr-only input-search-label'
					htmlFor='input-search'
				/>

				<div className='p-relative'>
					<input
						id='input-search'
						className='input-search'
						placeholder='Search for videos...'
					/>

					<FeSearch
						className='search-icon'
						stroke='black'
						width='2rem'
						height='1.5rem'
					/>
				</div>

				{isUserObjEmpty ? (
					<Link to='/login' className='login-link'>
						<UiwLogout
							width='2rem'
							height='1.5rem '
							className='login-icon'
						/>
					</Link>
				) : (
					<>
						<button
							onClick={() => logoutUser()}
							className='logout-button'>
							<UiwLogout
								className='logout-icon'
								width='2rem'
								height='2rem'
							/>
						</button>
						<Link to='/userProfile' className='user-icon-link'>
							<RiUser3Fill
								className='user-icon'
								width='2rem'
								height='2.5rem'
							/>
						</Link>
					</>
				)}
			</div>
		</header>
	)
}