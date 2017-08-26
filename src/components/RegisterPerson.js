import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import {Button, Panel, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

const RegisterPerson = ({input_person, onChangeInputPerson, onChangePersonGroup, onClickSave}) => {
    return (
        <div>
            <h3>인원 관리</h3>
            <Panel>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            이름
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="이름"
                                data-key="name"
                                value={input_person.name}
                                onChange={onChangeInputPerson}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            그룹
                        </Col>
                        <Col sm={10}>
                            <ButtonToolbar>
                                <ToggleButtonGroup 
                                    type="radio"
                                    data-key="group" 
                                    name="group" 
                                    value={input_person.group}
                                    onChange={onChangePersonGroup}
                                >
                                    <ToggleButton value={'g'}>군</ToggleButton>
                                    <ToggleButton value={'k'}>기</ToggleButton>
                                    <ToggleButton value={'y'}>요</ToggleButton>
                                    <ToggleButton value={'b'}>법</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            연락처
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="연락처"
                                data-key="phone"
                                value={input_person.phone}
                                onChange={onChangeInputPerson}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button 
                                type="button"
                                onClick={() => onClickSave(input_person.name, input_person.phone, input_person.group)}
                            >
                                저장
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        </div>
    );
};

RegisterPerson.propTypes = {
    onChangeInputPerson: PropTypes.func,
    onClickSave: PropTypes.func
};

RegisterPerson.defaultProps = {
    onChangeInputPerson: (e) => console.log('onChangeInputPerson not defined.'),
    onClickSave: () => console.log('onClickSave not defined.')    
};

export default RegisterPerson;