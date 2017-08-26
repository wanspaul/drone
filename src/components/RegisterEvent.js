import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import {Button, Panel, Form, FormGroup, Col, FormControl, ControlLabel, Table} from 'react-bootstrap';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


class RegisterEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_event_register: false,
            open_product_manage: false,
            keyword: ''
        }
        this.registerNewEvent = this.registerNewEvent.bind(this);
        this.onSaveComplete = this.onSaveComplete.bind(this);
        this.manageProduct = this.manageProduct.bind(this);
        this.onSearchPerson = this.onSearchPerson.bind(this);
    }

    onSearchPerson(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    registerNewEvent() {
        if(!this.state.open_event_register) {
            this.setState({
                open_product_manage: false
            });
        }
        this.setState({
            open_event_register: !this.state.open_event_register
        });
    }

    manageProduct() {
        if(!this.state.open_product_manage) {
            this.setState({
                open_event_register: false
            });
        }
        this.setState({
            open_product_manage: !this.state.open_product_manage
        });
    }

    onSaveComplete() {
        this.setState({
            open_event_register: false
        });
    }

    render() {
        const {input_event, onChangeInputEvent, onChangeDateTime, onClickEventSave, person_list, onClickPerson} = this.props;
        const {input_product, onClickProductSave, product_list, onChangeInputProduct, onClickProduct} = this.props;
        // console.log('registerevent');
        // console.log(product_list);
        return (
            <div>
                <h3>이벤트 관리</h3>
                <Button
                    onClick={this.registerNewEvent}
                >
                    새 이벤트 등록
                </Button>
                <Button
                    className="pull-right"
                    onClick={this.manageProduct}
                >
                    상품 관리
                </Button>
                <p></p>
                <Panel header="상품 관리" collapsible expanded={this.state.open_product_manage} className={this.state.open_product_manage ? '': 'hidden'}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={2}>
                                상품명
                            </Col>
                            <Col sm={10}>
                                <FormControl 
                                    type="text" 
                                    placeholder="이름" 
                                    data-key="name"
                                    value={input_product.name}
                                    onChange={onChangeInputProduct}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button 
                                    type="button"
                                    onClick={
                                        () => onClickProductSave(
                                            input_product.name
                                        )
                                    }
                                >
                                    저장
                                </Button>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                상품목록
                            </Col>
                            <Col sm={10}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>상품명</th>
                                            <th>활성화여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product_list.map((product, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{product.name}</td>
                                                <td>
                                                    <Button
                                                        data-idx={i}
                                                        data-value={!product.active}
                                                        bsSize="xsmall"
                                                        bsStyle={product.active ? 'success': 'default'}
                                                        onClick={
                                                            () => {
                                                                onClickProduct(i, product._id, !product.active);
                                                            }
                                                        }
                                                    >
                                                        {product.active ? '활성': '비활성'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
                <Panel header="새 이벤트 등록" collapsible expanded={this.state.open_event_register} className={this.state.open_event_register ? '': 'hidden'}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalTitle">
                            <Col componentClass={ControlLabel} sm={2}>
                                제목
                            </Col>
                            <Col sm={10}>
                                <FormControl 
                                    type="text" 
                                    placeholder="제목" 
                                    data-key="title"
                                    value={input_event.title}
                                    onChange={onChangeInputEvent}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalFirst">
                            <Col componentClass={ControlLabel} sm={2}>
                                이번시간
                            </Col>
                            <Col sm={10}>
                                <Datetime 
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm"
                                    inputProps={{
                                        placeholder: 'YYYY-MM-DD HH:mm 형식으로만 입력이 가능합니다.'
                                    }}
                                    value={input_event.first}
                                    onChange={(obj) => onChangeDateTime(obj, "first")}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSecond">
                            <Col componentClass={ControlLabel} sm={2}>
                                다음시간
                            </Col>
                            <Col sm={10}>
                                <Datetime 
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm"
                                    inputProps={{
                                        placeholder: 'YYYY-MM-DD HH:mm 형식으로만 입력이 가능합니다.'
                                    }}
                                    value={input_event.second}
                                    onChange={(obj) => onChangeDateTime(obj, "second")}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalFirst">
                            <Col componentClass={ControlLabel} sm={2}>
                                메모
                            </Col>
                            <Col sm={10}>
                                <FormControl 
                                    type="text" 
                                    placeholder="메모" 
                                    data-key="third"
                                    value={input_event.third}
                                    onChange={onChangeInputEvent}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                참석인원
                            </Col>
                            <Col sm={10}>
                                <p>
                                    <FormControl 
                                        type="text" 
                                        placeholder="이름을 검색하세요." 
                                        value={this.state.keyword}
                                        onChange={this.onSearchPerson}
                                        style={{width:"200px"}}
                                    />
                                </p>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>이름</th>
                                            <th>연락처</th>
                                            <th>참석여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {person_list.filter(p => p.name.indexOf(this.state.keyword) !== -1).map((person, i) => {
                                            console.log(person.idx);
                                        return (
                                            <tr key={i}>
                                                <td>{person.name}</td>
                                                <td>{person.phone}</td>
                                                <td>
                                                    <Button
                                                        data-idx={i}
                                                        data-value={!person.is_attendance}
                                                        bsSize="xsmall"
                                                        bsStyle={person.is_attendance ? 'success': 'default'}
                                                        onClick={
                                                            () => {
                                                                onClickPerson(person.idx, !person.is_attendance);
                                                            }
                                                        }
                                                    >
                                                        {person.is_attendance ? '참석': '불참'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button 
                                    type="button"
                                    onClick={
                                        () => onClickEventSave(
                                            input_event.title,
                                            input_event.first,
                                            input_event.second,
                                            input_event.third,
                                            person_list,
                                            this.onSaveComplete
                                        )
                                    }
                                >
                                    저장
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        );
    }
}

RegisterEvent.propTypes = {
    onChangeInputEvent: PropTypes.func,
    onChangeDateTime: PropTypes.func,
    onClickEventSave: PropTypes.func,
    onClickPerson: PropTypes.func,
    onChangeInputProduct: PropTypes.func,
    onClickProduct: PropTypes.func
};

RegisterEvent.defaultProps = {
    onChangeInputEvent: (e) => console.log('onChangeInputEvent not defined.'),
    onChangeDateTime: (obj) => console.log('onChangeDateTime not defined.'),
    onClickEventSave: () => console.log('onClickEventSave not defined.'),    
    onClickPerson: () => console.log('onClickPerson not defined.'),
    onChangeInputProduct: (e) => console.log('onChangeInputProduct not defined.'),
    onClickProduct: () => console.log('onClickProduct not defined.')
};

export default RegisterEvent;