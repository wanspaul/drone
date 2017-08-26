import update from 'react-addons-update';
import * as personTypes from '../actions/PersonTypes';

const initialState = {
    input_person: {
        name: '',
        phone: '',
        group: 'g'
    },
    person_list: [],
    person_info: {},
    point_use_list: [],
    point_use: 0,
    modal_show: false
};

function Person(state=initialState, action) {
    switch(action.type) {
        case personTypes.ON_CHANGE_INPUT_PERSON:
            return {
                ...state,
                input_person: {
                    ...state.input_person,
                    [action.key]: action.value
                }
            }
        case personTypes.ON_CHANGE_PERSON_GROUP:
            return {
                ...state,
                input_person: {
                    ...state.input_person,
                    [action.key]: action.value
                }
            }
        case personTypes.SAVE_PERSON_SUCCESS:
            return {
                ...state,
                input_person: {
                    ...state.input_person,
                    name: '',
                    phone: '',
                    group: 'g'
                },
                person_list: update(
                    state.person_list,
                    {
                        $push: [eval(action.new_person)]
                    }
                )  
            }
        case personTypes.PERSON_LIST_SUCCESS:
            // console.log(eval(action.person_list));
            return {
                ...state,
                person_list: eval(action.person_list)
            }
        case personTypes.PERSON_DELETE_SUCCESS:
            return {
                ...state,
                person_list : update(
                    state.person_list, 
                    {
                        $splice: [[action.idx, 1]]
                    }
                )
            }
        case personTypes.ON_CLICK_PERSON:
            return {
                ...state,
                person_list : update(
                    state.person_list,
                    {
                        [action.idx]: 
                        {
                            is_attendance: { $set: action.value }
                        }
                    }
                )
            }
        case personTypes.INIT_PERSON_ATTENDANCE:
            return {
                ...state,
                person_list : state.person_list.map((person, i) => {
                    return {
                        ...person,
                        is_attendance: false
                    }
                })
            }
        case personTypes.PERSON_INFO_SUCCESS:
            return {
                ...state,
                person_info: action.person,
                point_use_list: action.point_use_list
            }
        case personTypes.ON_MODAL_SHOW:
            return {
                ...state,
                modal_show: true
            }
        case personTypes.ON_MODAL_HIDE:
            return {
                ...state,
                modal_show: false
            }
        case personTypes.ON_FOCUS_POINT_USE:
            return {
                ...state,
                point_use: ''
            }
        case personTypes.ON_CHANGE_POINT_USE:
            return {
                ...state,
                point_use: action.value
            }
        case personTypes.USE_POINT_SUCCESS:
            return {
                ...state,
                person_info: action.person,
                point_use_list: action.point_use_list,
                point_use: 0
            }
        default:
            return state;
    }
}

export default Person;

