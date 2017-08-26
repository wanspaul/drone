import update from 'react-addons-update';
import * as eventTypes from '../actions/EventTypes';

const initialState = {
    is_login: false,
    input_event: {
        title: '',
        first: '',
        second: '',
        third: ''
    },
    input_product: {
        name: ''
    },
    event_list: [],
    product_list: []
};

function Events(state=initialState, action) {
    switch(action.type) {
        case eventTypes.ON_CHANGE_INPUT_EVENT:
            return {
                ...state,
                input_event: {
                    ...state.input_event,
                    [action.key]: action.value
                }
            }
        case eventTypes.SAVE_EVENT_SUCCESS:
            return {
                ...state,
                input_event: {
                    ...state.input_event,
                    title: '',
                    first: '',
                    second: '',
                    third: ''
                },
                event_list: update(
                    state.event_list,
                    {
                        $unshift: [eval(action.new_event)]
                    }
                )
            }
        case eventTypes.EVENT_LIST_SUCCESS:
            return {
                ...state,
                event_list: eval(action.event_list)
            }
        case eventTypes.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                product_list: eval(action.product_list)
            }
        case eventTypes.ON_CHANGE_INPUT_PRODUCT:
            return {
                ...state,
                input_product: {
                    ...state.input_event,
                    [action.key]: action.value
                }
            }
        case eventTypes.SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                input_product: {
                    ...state.input_product,
                    name: ''
                },
                product_list: update(
                    state.product_list,
                    {
                        $push: [eval(action.new_product)]
                    }
                )
            }
        case eventTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                product_list : update(
                    state.product_list,
                    {
                        [action.idx]: { $set: action.update_product }
                    }
                )
            }
        case eventTypes.EVENT_ATTENDANCE_UPDATE_SUCCESS:
            return {
                ...state,
                event_list: update(
                    state.event_list,
                    {
                        [action.event_idx]: { $set: action.update_event }
                    }
                )
            }
        case eventTypes.EVENT_DELETE_SUCCESS:
            return {
                ...state,
                event_list : update(
                    state.event_list, 
                    {
                        $splice: [[action.idx, 1]]
                    }
                )
            }
        case eventTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                is_login: true
            }
        default:
            return state;
    }
}

export default Events;

