import App from '../components/App';
import * as actions from '../actions';
import {connect} from 'react-redux';


const mapStateToProps = (state) => ({
    is_login : state.Events.is_login,
    person_list : state.Person.person_list,
    modal_show : state.Person.modal_show,
    person_info : state.Person.person_info,
    point_use : state.Person.point_use,
    point_use_list : state.Person.point_use_list
});

const mapDispatchToProps = (dispatch) => ({
    getPersonList : () => {
        dispatch(actions.getPersonList());
    },
    onPersonClick : (id) => {
        dispatch(actions.getPersonInfo(id));    
    },
    onModalHide : () => {
        dispatch(actions.onModalHide());
    },
    onFocusPointUse : () => {
        dispatch(actions.onFocusPointUse());    
    },
    onChangePointUse : (e, max) => {
        if(e.target.value < 0 || e.target.value > max)
            return;
        dispatch(actions.onChangePointUse(e));
    },
    onUsePoint : (person_id, use_point) => {
        if(use_point < 1) {
            window.alert('사용할 포인트를 입력해주세요.');
            return;
        }

        const use_point_obj = {
            person_id: person_id,
            use_point: use_point
        }
        dispatch(actions.onUsePoint(use_point_obj));
    },
    onSignIn : (password) => {
        dispatch(actions.onSignIn(password));
    }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
