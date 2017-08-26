import React, {Component} from 'react';
import EventContainer from '../containers/EventContainer';
import PersonContainer from '../containers/PersonContainer';
import Login from './Login';
import {Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl, Table} from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getPersonList();
    }

    render() {
        const {is_login, person_list, onPersonClick, modal_show, onModalHide} = this.props;
        const {person_info, point_use, point_use_list, onChangePointUse, onFocusPointUse, onUsePoint} = this.props;
        return (
            is_login ? (
            <div>
                <Col xs={12} md={6} lg={6}>
                    <EventContainer 
                        person_list={person_list} 
                        onPersonClick={onPersonClick}
                    />
                </Col>
                <Col xs={12} md={6} lg={6}>
                    <PersonContainer 
                        person_list={person_list} 
                        onPersonClick={onPersonClick}
                    />
                </Col>
                <Modal show={modal_show} onHide={onModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">인원 정보</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{person_info.name}</h4>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalPoint">
                                <Col componentClass={ControlLabel} sm={2}>
                                    보유 포인트
                                </Col>
                                <Col sm={10}>
                                    <span style={{lineHeight:"30px"}}>
                                        {person_info.point}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPointUse">
                                <Col componentClass={ControlLabel} sm={2}>
                                    포인트 사용
                                </Col>
                                <Col sm={10}>
                                    <FormControl 
                                        type="number" 
                                        value={point_use}
                                        style={{width:"60px", display:"inline", marginRight:"4px"}}
                                        onFocus={onFocusPointUse}
                                        onChange={(e) => {onChangePointUse(e, person_info.point)}}
                                    />
                                    <Button
                                        onClick={() => {onUsePoint(person_info._id, point_use)}}
                                    >
                                        사용
                                    </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPointUseTable">
                                <Col componentClass={ControlLabel} sm={2}>
                                    사용 내역
                                </Col>
                                <Col sm={10}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>날짜</th>
                                                <th>사용한 포인트</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {point_use_list.map((point_use, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{point_use.day}</td>
                                                    <td>{point_use.use_point}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onModalHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            ) : <Login onSignIn={this.props.onSignIn} />
        );
    }
}

export default App;
