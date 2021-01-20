import React, { useEffect } from 'react';

export function HomePageMessage() {
	useEffect(() => {
		console.log('HomePageMessage - useEffect here')
	}, []);

	return (
		<p>A bit here, on the homepage, about the project.</p>
	)
}