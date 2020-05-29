import {createCustomElement, actionTypes} from '@servicenow/ui-core';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
import {createHttpEffect} from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-card';

const view = (state, {updateState}) => {
	const {todayCases, todayTests} = state.result; 

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
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;

			dispatch('FETCH_COVID_DATA', {
				'country': 'World'
			});
		},
		'FETCH_COVID_DATA': createHttpEffect('api/x_snc_covid_lchh/covid_endpoint', {
			method: 'GET',
			queryParams: ['country'],
			successActionType: 'FETCH_COVID_DATA_SUCCESS'
		}),
		'FETCH_COVID_DATA_SUCCESS': (coeffects) => {

			const { action, updateState } = coeffects;
			const { result } = action.payload;

			updateState({ result });

		}
	},
	renderer: {type: snabbdom},
	view,
	styles
});
