import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
	const mobileNav = [
		{
			text: 'ExploreMobile',
			url: '/search',
			image:
				'https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53d188f7827833bd79ef9b/214746d15b751953f02eb252fb879874/magnifying-glass.png',
		},
		{
			text: 'MyBikesMobile',
			url: '/bikes',
			image:
				'https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53d188f7827833bd79ef9b/ca1db79d00b304cb995a7491f0ce71a0/bike.png',
		},
		{
			text: 'ProfileMobile',
			url: '/user',
			image:
				'https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53d188f7827833bd79ef9b/e60b6c14d78fa03c5a1ae02b95f9cbca/user.png',
		},
	];

	const desktopNav = [
		{ text: 'My Bikes', url: '/bikes', image: '' },
		{ text: 'Explore', url: '/search', image: '' },
		{ text: 'Profile', url: '/user', image: '' },
	];

	return (
		<header className='header'>
			<div className='header__mobile'>
				<img
					className='logo'
					src='https://cdn.discordapp.com/attachments/692420285143711814/693437226146594876/LogoGerili.png'
					alt='logo'
				/>
				<div className='mobile__nav'>
					{mobileNav.map((link) => {
						return (
							<NavLink
								to={link.url}
								key={link.text}
								activeClassName='active--mobile'
							>
								<img
									src={link.image}
									alt={link.text}
									className='nav__item'
								/>
							</NavLink>
						);
					})}
				</div>
				<img
					className='nav__menu'
					src='https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53d188f7827833bd79ef9b/ea9ccf0f7a5fe6c8d066bb89f204f504/open-menu.png'
					alt='menu'
				/>
			</div>

			<div className='header__desktop'>
				<img
					className='logo'
					src='https://cdn.discordapp.com/attachments/692420285143711814/693437226146594876/LogoGerili.png'
					alt='logo'
				/>
				<p className='appName'>bikUP</p>
				<ul className='header__navigation'>
					{desktopNav.map((link) => {
						return (
							<NavLink
								key={link.text}
								className='navigation__item'
								activeClassName='active-desktop'
								to={link.url}
							>
								{link.text}
							</NavLink>
						);
					})}
				</ul>
				<div className='flex-spacer'></div>
				<button className='login__button login__button--header'>
					Log In
				</button>
			</div>
		</header>
	);
}

export default Header;
