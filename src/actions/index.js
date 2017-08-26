import * as eventTypes from './EventTypes';
import * as personTypes from './PersonTypes';
import axios from 'axios';


// Event

export const onChangeInputEvent = (e) => {
    const key = e.target.dataset.key;
    let value = e.target.value;

    return {
        type: eventTypes.ON_CHANGE_INPUT_EVENT,
        key: key,
        value: value
    }
};

export const onChangeDateTime = (moment_obj, key) => {
    return {
        type: eventTypes.ON_CHANGE_INPUT_EVENT,
        key: key,
        value: moment_obj.format("YYYY-MM-DD HH:mm")
    }
}

function saveEvent() {
    return {
        type: eventTypes.SAVE_EVENT
    }
}

export const saveEventSuccess = (response) => {
    return {
        type: eventTypes.SAVE_EVENT_SUCCESS,
        new_event: response.data.event
    }
}

export const saveEventFailure = () => {
    return {
        type: eventTypes.SAVE_EVENT_FAILURE
    }
}

export const onClickEventSave = (event_obj, callback) => {

    return (dispatch) => {
        dispatch(saveEvent());
        const form_data = new FormData();
        form_data.append('title', event_obj.title);
        form_data.append('first', event_obj.first);
        form_data.append('second', event_obj.second);
        form_data.append('third', event_obj.third);
        // console.log('action');
        // console.log(JSON.stringify(event_obj.checked_person_list));
        form_data.append('checked_person_list', JSON.stringify(event_obj.checked_person_list));
        return axios.post('http://localhost:8000/api/save_event', form_data).then(
            response => {
                dispatch(saveEventSuccess(response.data));
                dispatch(initPersonAttendance());
                dispatch(getPersonList());
                callback();
            }
        ).catch(
            error => {
                dispatch(saveEventFailure());
            }
        )
    };

};

export const onChangeInputProduct = (e) => {
    const key = e.target.dataset.key;
    let value = e.target.value;

    return {
        type: eventTypes.ON_CHANGE_INPUT_PRODUCT,
        key: key,
        value: value
    }
};

function saveProduct() {
    return {
        type: eventTypes.SAVE_PRODUCT
    }
}

export const saveProductSuccess = (response) => {
    return {
        type: eventTypes.SAVE_PRODUCT_SUCCESS,
        new_product: response.data.product
    }
}

export const saveProductFailure = () => {
    return {
        type: eventTypes.SAVE_PRODUCT_FAILURE
    }
}

export const onClickProductSave = (product_obj) => {

    return (dispatch) => {
        dispatch(saveProduct());
        const form_data = new FormData();
        form_data.append('name', product_obj.name);
        return axios.post('http://localhost:8000/api/save_product', form_data).then(
            response => {
                dispatch(saveProductSuccess(response.data));
            }
        ).catch(
            error => {
                dispatch(saveProductFailure());
            }
        )
    };
};


// Event List Action
export const getEventList = () => {
    
    return (dispatch) => {
        dispatch(eventList());
        return axios.get('http://localhost:8000/api/event_list').then(
            response => {
                dispatch(eventListSuccess(response.data));
            }
        ).catch(
            error => {
                dispatch(eventListFailure());
            }
        )
    };       
}

export const eventList = () => {
    return {
        type: eventTypes.EVENT_LIST
    };
}

export const eventListSuccess = (response) => {
    return {
        type: eventTypes.EVENT_LIST_SUCCESS,
        event_list: response.data.event_list
    };
}

export const eventListFailure = () => {
    return {
        type: eventTypes.EVENT_LIST_FAILURE
    }
}

// Product List Action
export const getProductList = () => {
    
    return (dispatch) => {
        dispatch(productList());
        return axios.get('http://localhost:8000/api/product_list').then(
            response => {
                dispatch(productListSuccess(response.data));
            }
        ).catch(
            error => {
                dispatch(productListFailure());
            }
        )
    };       
}

export const productList = () => {
    return {
        type: eventTypes.PRODUCT_LIST
    };
}

export const productListSuccess = (response) => {
    return {
        type: eventTypes.PRODUCT_LIST_SUCCESS,
        product_list: response.data.product_list
    };
}

export const productListFailure = () => {
    return {
        type: eventTypes.PRODUCT_LIST_FAILURE
    }
}

export const updateProduct = () => {
    return {
        type: eventTypes.UPDATE_PRODUCT
    }
}

export const updateProductSuccess = (response, idx) => {
    return {
        type: eventTypes.UPDATE_PRODUCT_SUCCESS,
        update_product: response.data.product,
        idx: idx
    }
}

export const updateProductFailure = () => {
    return {
        type: eventTypes.UPDATE_PRODUCT_FAILURE
    }
}

export const onUpdateProduct = (idx, product_obj) => {
    return (dispatch) => {
        dispatch(updateProduct());
        const form_data = new FormData();
        form_data.append('id', product_obj.product_id);
        form_data.append('active', product_obj.active);
        return axios.post('http://localhost:8000/api/product_update', form_data).then(
            response => {
                dispatch(updateProductSuccess(response.data, idx));
            }
        ).catch(
            error => {
                dispatch(updateProductFailure());
            }
        )
    };
}

// Person

export const onChangeInputPerson = (e) => {
    const key = e.target.dataset.key;
    let value = e.target.value;

    return {
        type: personTypes.ON_CHANGE_INPUT_PERSON,
        key: key,
        value: value
    }
};

export const onChangePersonGroup = (value) => {
    return {
        type: personTypes.ON_CHANGE_PERSON_GROUP,
        key: 'group',
        value: value
    }
}

// Save Person Action
function savePerson() {
    return {
        type: personTypes.SAVE_PERSON
    }
}

export const savePersonSuccess = (response) => {
    return {
        type: personTypes.SAVE_PERSON_SUCCESS,
        new_person: response.data.person
    }
}

export const savePersonFailure = () => {
    return {
        type: personTypes.SAVE_PERSON_FAILURE
    }
}

export const onClickSave = (person_obj) => {

    return (dispatch) => {
        dispatch(savePerson());
        const form_data = new FormData();
        form_data.append('name', person_obj.name);
        form_data.append('phone', person_obj.phone);
        form_data.append('group', person_obj.group);
        return axios.post('http://localhost:8000/api/save_person', form_data).then(
            response => {
                // dispatch(savePersonSuccess(response.data));
                dispatch(getPersonList());
            }
        ).catch(
            error => {
                dispatch(savePersonFailure());
            }
        )
    };
    
};



// Person List Action
export const getPersonList = () => {
    
    return (dispatch) => {
        dispatch(personList());
        return axios.get('http://localhost:8000/api/person_list').then(
            response => {
                dispatch(personListSuccess(response.data));
            }
        ).catch(
            error => {
                dispatch(personListFailure());
            }
        )
    };       
}

export const personInfo = () => {
    return {
        type: personTypes.PERSON_INFO
    }
}

export const personInfoSuccess = (response) => {
    return {
        type: personTypes.PERSON_INFO_SUCCESS,
        person: response.data.person,
        point_use_list: response.data.point_use_list
    }
}

export const personInfoFailure = () => {
    return {
        type: personTypes.PERSON_INFO_FAILURE
    }
}

export const onModalShow = () => {
    return {
        type: personTypes.ON_MODAL_SHOW
    }
}

export const onModalHide = () => {
    return {
        type: personTypes.ON_MODAL_HIDE
    }
}


export const onFocusPointUse = (e) => {
    return {
        type: personTypes.ON_FOCUS_POINT_USE,
        value: ''
    }
}

export const onChangePointUse = (e) => {
    let value = e.target.value;

    return {
        type: personTypes.ON_CHANGE_POINT_USE,
        value: value
    }
}

export const getPersonInfo = (id) => {
    return (dispatch) => {
        dispatch(personInfo());
        return axios.get('http://localhost:8000/api/person_info?id='+id).then(
            response => {
                dispatch(personInfoSuccess(response.data));
                dispatch(onModalShow());
            }
        ).catch(
            error => {
                dispatch(personInfoFailure());
            }
        )
    }
}

export const usePoint = () => {
    return {
        type: personTypes.USE_POINT
    }
}

export const usePointSuccess = (response) => {
    console.log('userPointSuccess');
    console.log(response);
    return {
        type: personTypes.USE_POINT_SUCCESS,
        person: response.data.person,
        point_use_list: response.data.point_use_list
    }
}

export const usePointFailure = () => {
    return {
        type: personTypes.USE_POINT_FAILURE
    }
}

export const onUsePoint = (use_point_obj) => {
    return (dispatch) => {
        dispatch(usePoint());
        const form_data = new FormData();
        form_data.append('id', use_point_obj.person_id);
        form_data.append('use_point', use_point_obj.use_point);
        return axios.post('http://localhost:8000/api/person_use_point', form_data).then(
            response => {
                dispatch(usePointSuccess(response.data));
                dispatch(getPersonList());
            }
        ).catch(
            error => {
                dispatch(usePointFailure());
            }
        )
    }
}

export const signIn = () => {
    return {
        type: eventTypes.SIGN_IN
    }
}

export const signInSuccess = () => {
    return {
        type: eventTypes.SIGN_IN_SUCCESS
    }
}

export const signInFailure = () => {
    return {
        type: eventTypes.SIGN_IN_FAILURE
    }
}

export const onSignIn = (password) => {
    return (dispatch) => {
        dispatch(signIn());
        const form_data = new FormData();
        form_data.append('password', password);

        return axios.post('http://localhost:8000/api/sign_in', form_data).then(
            response => {
                if(response.data.status == 0) {
                    dispatch(signInSuccess());
                } else {
                    window.alert('패스워드를 확인해주세요.');
                    dispatch(signInFailure());    
                }
            }
        ).catch(
            error => {
                dispatch(signInFailure());
            }
        )
    }    
}

export const personList = () => {
    return {
        type: personTypes.PERSON_LIST
    };
}

export const personListSuccess = (response) => {
    return {
        type: personTypes.PERSON_LIST_SUCCESS,
        person_list: response.data.person_list
    };
}

export const personListFailure = () => {
    return {
        type: personTypes.PERSON_LIST_FAILURE
    }
}

// Person Delete Action

function personDelete() {
    return {
        type: personTypes.PERSON_DELETE
    }
}

export const personDeleteSuccess = (idx) => {
    return {
        type: personTypes.PERSON_DELETE_SUCCESS,
        idx: idx
    }
}

export const personDeleteFailure = () => {
    return {
        type: personTypes.PERSON_DELETE_FAILURE
    }
}

export const onDeletePerson = (id, idx) => {

    return (dispatch) => {
        dispatch(personDelete());
        const form_data = new FormData();
        form_data.append('id', id);
        return axios.post('http://localhost:8000/api/person_delete', form_data).then(
            response => {
                // dispatch(personDeleteSuccess(idx));
                dispatch(getPersonList());
            }
        ).catch(
            error => {
                dispatch(personDeleteFailure());
            }
        )
    }

}

function personInitCount() {
    return {
        type: personTypes.PERSON_INIT_COUNT
    }
}

export const personInitCountFailure = () => {
    return {
        type: personTypes.PERSON_INIT_COUNT_FAILURE
    }
}

export const onPersonInitCount = () => {
    return (dispatch) => {
        dispatch(personInitCount());
        return axios.post('http://localhost:8000/api/person_init_count').then(
            response => {
                // reducer에서 처리할게 없다. 그냥 새로이 person_list만 불러오자.
                dispatch(getPersonList());
            }
        ).catch(
            error => {
                dispatch(personInitCountFailure());
            }
        )    
    }
}

export const onClickPerson = (idx, value) => {
    return {
        type: personTypes.ON_CLICK_PERSON,
        idx,
        value
    }
}


export const initPersonAttendance = () => {
    return {
        type: personTypes.INIT_PERSON_ATTENDANCE
    }
}


function eventAttendanceUpdate() {
    return {
        type: eventTypes.EVENT_ATTENDANCE_UPDATE
    }
}

export const eventAttendanceUpdateSuccess = (response, event_idx) => {
    return {
        type: eventTypes.EVENT_ATTENDANCE_UPDATE_SUCCESS,
        update_event: response.data.event,
        event_idx: event_idx
    }
}

export const eventAttendanceUpdateFailure = () => {
    return {
        type: eventTypes.EVENT_ATTENDANCE_UPDATE_FAILURE
    }
}


export const onChangeSelect = (event_idx, event_attendance_obj) => {
    return (dispatch) => {
        dispatch(eventAttendanceUpdate());
        const form_data = new FormData();
        form_data.append('event_attendance_id', event_attendance_obj.event_attendance_id);
        form_data.append('product_id', event_attendance_obj.product_id);
        form_data.append('event_id', event_attendance_obj.event_id);
        return axios.post('http://localhost:8000/api/event_attendance_update', form_data).then(
            response => {
                if(response.data.status == 0) {
                    dispatch(eventAttendanceUpdateSuccess(response.data, event_idx));
                    dispatch(getPersonList());
                } else {
                    window.alert(response.data.message);
                    dispatch(eventAttendanceUpdateFailure());
                }
            }
        ).catch(
            error => {
                dispatch(eventAttendanceUpdateFailure());
            }
        )
    }
}


function eventDelete() {
    return {
        type: eventTypes.EVENT_DELETE
    }
}

export const eventDeleteSuccess = (idx) => {
    return {
        type: eventTypes.EVENT_DELETE_SUCCESS,
        idx: idx
    }
}

export const eventDeleteFailure = () => {
    return {
        type: eventTypes.EVENT_DELETE_FAILURE
    }
}

export const onDeleteEvent = (id, idx) => {

    return (dispatch) => {
        dispatch(eventDelete());
        const form_data = new FormData();
        form_data.append('id', id);
        return axios.post('http://localhost:8000/api/event_delete', form_data).then(
            response => {
                dispatch(eventDeleteSuccess(idx));
                dispatch(getPersonList());
            }
        ).catch(
            error => {
                dispatch(eventDeleteFailure());
            }
        )
    }

}