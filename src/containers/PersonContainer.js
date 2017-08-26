import Person from '../components/Person';
import * as actions from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    input_person : {
        name: state.Person.input_person.name,
        phone: state.Person.input_person.phone,
        group: state.Person.input_person.group
    }
});

const mapDispatchToProps = (dispatch) => ({
    onChangeInputPerson : (e) => {
        dispatch(actions.onChangeInputPerson(e));
    },
    onChangePersonGroup : (value) => {
        dispatch(actions.onChangePersonGroup(value));
    },
    onClickSave : (name, phone, group) => {
        const person_obj = {
            name: name,
            phone: phone,
            group: group
        }
        dispatch(actions.onClickSave(person_obj));
    },
    onDeletePerson : (id, idx) => {
        dispatch(actions.onDeletePerson(id, idx));
    },
    onPersonInitCount: () => {
        if(!window.confirm("초기화 하시겠습니까?"))
            return false;
        dispatch(actions.onPersonInitCount());
    }
});

const PersonContainer = connect(mapStateToProps, mapDispatchToProps)(Person);

export default PersonContainer;
