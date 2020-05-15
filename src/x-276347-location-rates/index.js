import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-card';
import {actionHandlers} from './actionHandlers';

const view = (state, {updateState}) => {
	const {
		todayCases,
		todayTests
	} = state.apiRows;
	return (
		<div className="now-card-demo-container">
			
			<div className="now-card-option">
			<h2>Today's Covid Data</h2>
			<now-card style={{paddingLeft: '20px'}}>
				<now-card-header
					tagline={{label: 'Todays Cases'}}
					heading={{label: todayCases, size: 'lg'}}
				/>
			</now-card>
			<br/>
			<now-card style={{paddingLeft: '20px'}}>
				<now-card-header
					tagline={{label: 'Todays Tests'}}
					heading={{label: todayTests, size: 'lg'}}
				/>
			</now-card>
			</div>
			</div>
	);
};

createCustomElement('x-276347-location-rates', {
	renderer: {type: snabbdom},
	view,
	actionHandlers: {
        ...actionHandlers
    },
	styles
});
