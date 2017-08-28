import React, {Component, PropTypes} from 'react';
import {Table} from 'react-bootstrap';
import {Form, FormGroup, Col, ControlLabel, Button} from 'react-bootstrap';

class EventDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {event_idx, event, product_list, onChangeSelect, onDeleteEvent} = this.props;
        // console.log('eventdetail');
        return (
            <Form horizontal>
                {/* <FormGroup>
                    <Col sm={2} className="text-right">
                        <strong>이번시간</strong>
                    </Col>
                    <Col sm={10}>
                        {event.first}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} className="text-right">
                        <strong>다음시간</strong>
                    </Col>
                    <Col sm={10}>
                        {event.second}
                    </Col>
                </FormGroup> */}
                <FormGroup>
                    <Col sm={2} className="text-right">
                        <strong>메모1</strong>
                    </Col>
                    <Col sm={10}>
                        {event.third.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} className="text-right">
                        <strong>메모2</strong>
                    </Col>
                    <Col sm={10}>
                        {event.second.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} className="text-right">
                        <strong>참석정보</strong>
                    </Col>
                    <Col sm={10}>
                        총 {event.attendance_count}명&nbsp;
                        (군 : {event.g_count} / 기 : {event.k_count} / 요 : {event.y_count} / 법 : {event.b_count})     
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} className="text-right">
                        <strong>참석인원</strong>
                    </Col>
                    <Col sm={10}>
                        <Table bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>순번</th>
                                    <th>이름</th>
                                    <th>연락처</th>
                                    <th>당첨정보</th>
                                </tr>
                            </thead>
                            <tbody>
                            {event.checked_person_list.map((person, i) => {
                                return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{person.name}</td>
                                    <td>{person.phone}</td>
                                    <td>
                                         <select
                                            onChange={(e) => { onChangeSelect(e, event_idx, event._id); }}
                                            value={person.product_id}
                                         >
                                            <option 
                                                data-event-attendance-id={person.event_attendance_id}
                                                value=''
                                            >
                                                -
                                            </option>
                                        {product_list.map((product, i) => {
                                            let option = product.active ? 
                                                <option 
                                                    key={i} 
                                                    data-event-attendance-id={person.event_attendance_id}
                                                    value={product._id}
                                                >
                                                    {product.name}
                                                </option>
                                                : null;
                                            return (
                                                option
                                            );
                                        })}     
                                        </select>            
                                    </td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button 
                            type="button"
                            bsSize="small"
                            bsStyle="danger"
                            onClick={
                                () => {
                                    if(!window.confirm("정말 삭제하시겠습니까?")) return false;
                                        onDeleteEvent(event._id, event_idx);
                                }
                            }
                        >
                            삭제
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default EventDetail;
