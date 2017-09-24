import Events from '../components/Events';
import * as actions from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    input_event: {
        title: state.Events.input_event.title,
        first: state.Events.input_event.first,
        second: state.Events.input_event.second,
        third: state.Events.input_event.third
    },
    input_product: {
        name: state.Events.input_product.name
    },
    event_list : state.Events.event_list,
    page : state.Events.page,
    total_page : state.Events.total_page,
    product_list: state.Events.product_list
});

const mapDispatchToProps = (dispatch) => ({
    onChangeInputEvent : (e) => {
        dispatch(actions.onChangeInputEvent(e));
    },
    onChangeDateTime : (moment_obj, key) => {
        if(typeof moment_obj === 'object') {
            // console.log(moment_obj.format("YYYY-MM-DD HH:mm"));
            dispatch(actions.onChangeDateTime(moment_obj, key));
            // 첫번째 시간을 편집할 때, 두번째 시간도 같은 값을 넣어준다.
            if(key == "first") 
                dispatch(actions.onChangeDateTime(moment_obj, "second"));
        }
    },
    onClickEventSave : (title, second, third, person_list, callback) => {
        if(title === '') {
            window.alert('제목을 입력해주세요.');
            return false;
        }
        
        let checked_person_list = person_list.filter(function(obj) {
            return obj.is_attendance;
        });
        
        const event_obj = {
            title: title,
            first: '',
            second: second,
            third: third,
            checked_person_list: checked_person_list
        }
        dispatch(actions.onClickEventSave(event_obj, callback));
    },
    onChangeInputProduct : (e) => {
        dispatch(actions.onChangeInputProduct(e));
    },
    onClickProductSave : (name) => {
        const product_obj = {
            name: name
        }
        dispatch(actions.onClickProductSave(product_obj));
    },
    getEventList : (page = 1) => {
        dispatch(actions.getEventList(page));
    },
    onPreviousPage : (page) => {
        if(page > 1)
            dispatch(actions.getEventList(page - 1));
    },
    onNextPage : (page) => {
        dispatch(actions.getEventList(page + 1));
    },
    getProductList : () => {
        dispatch(actions.getProductList());
    },
    onClickPerson : (idx, value) => {
        dispatch(actions.onClickPerson(idx, value));
    },
    onClickProduct : (idx, product_id, active) => {
        const product_obj = {
            product_id: product_id,
            active: active
        }
        dispatch(actions.onUpdateProduct(idx, product_obj));
    },
    onChangeSelect : (e, event_idx, event_id) => {
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index];
        let event_attendance_id = optionElement.getAttribute('data-event-attendance-id');
        let product_id = e.target.value;
        // console.log(event_attendance_id);
        // console.log(product_id);
        // console.log(original_product_id);
        const event_attendance_obj = {
            event_attendance_id: event_attendance_id,
            product_id: product_id,
            event_id: event_id
        }
        dispatch(actions.onChangeSelect(event_idx, event_attendance_obj))
    },
    onDeleteEvent : (id, idx) => {
        dispatch(actions.onDeleteEvent(id, idx));
    }

});

const EventContainer = connect(mapStateToProps, mapDispatchToProps)(Events);

export default EventContainer;
