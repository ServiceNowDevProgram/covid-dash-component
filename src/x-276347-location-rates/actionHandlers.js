import { createHttpEffect } from '@servicenow/ui-effect-http'; 
import { actionTypes } from '@servicenow/ui-core';

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

import { covidAPIs } from './defaults.js';

export const actionHandlers = {
    [COMPONENT_BOOTSTRAPPED]: (coeffects) => {
        const { dispatch } = coeffects;
        const query = covidAPIs.join(',');

        dispatch('FETCH_COVID_DATA', {
            country: query
        });
    },
    'FETCH_COVID_DATA': createHttpEffect('api/x_snc_covid_lchh/covid_endpoint', {
        method: 'GET',
        queryParams: [
            country
        ],
        successActionType: 'FETCH_COVID_DATA_SUCCEEDED'
    }),
    'FETCH_COVID_DATA_SUCCEEDED': (coeffects) => {
        const { action, updateState } = coeffects;
        const { apiRows } = action.payload;

        updateState({ 
            apiRows            
        })
    }

}