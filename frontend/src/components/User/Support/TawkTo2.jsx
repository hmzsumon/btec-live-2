import React from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

const TawkTo2 = () => {
	const tawkMessengerRef = useRef();

	const handleMinimize = () => {
		tawkMessengerRef.current.minimize();
	};
	console.log('tawkMessengerRef', tawkMessengerRef);
	return (
		<div className='App'>
			<button onClick={handleMinimize}> Minimize the Chat </button>
			<TawkMessengerReact
				propertyId='63d821e547425128791081a3'
				widgetId='default'
				ref={tawkMessengerRef}
			/>
		</div>
	);
};

export default TawkTo2;
