import React, {Component} from 'react';
import RegisterEvent from './RegisterEvent';
import EventList from './EventList';
import {Col, Pager} from 'react-bootstrap';


class Events extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getEventList();
        this.props.getProductList();
    }

    render() {
        return (
            <div>
                <RegisterEvent
                    input_event={this.props.input_event}
                    input_product={this.props.input_product}
                    person_list={this.props.person_list}
                    product_list={this.props.product_list}
                    onChangeInputEvent={this.props.onChangeInputEvent}
                    onChangeDateTime={this.props.onChangeDateTime}
                    onClickEventSave={this.props.onClickEventSave}
                    onClickProductSave={this.props.onClickProductSave}
                    onChangeInputProduct={this.props.onChangeInputProduct}
                    onClickPerson={this.props.onClickPerson}
                    onClickProduct={this.props.onClickProduct}
                />
                <div>
                    <Col sm={6} style={{lineHeight:"38px"}}>
                        Page : {this.props.page} / {this.props.total_page}
                    </Col>
                    <Col sm={6}>
                        <Pager style={{margin:"4px 0px", float:"right"}}>
                            <Pager.Item onClick={() => this.props.onPreviousPage(this.props.page)}>Previous</Pager.Item>
                            {' '}
                            <Pager.Item onClick={
                                () => { if(this.props.page < this.props.total_page) this.props.onNextPage(this.props.page); }
                                }>Next</Pager.Item>
                        </Pager>
                    </Col>
                </div>
                <EventList
                    event_list={this.props.event_list}
                    product_list={this.props.product_list}
                    onChangeSelect={this.props.onChangeSelect}
                    onDeleteEvent={this.props.onDeleteEvent}
                />
            </div>
        );
    }
}

export default Events;
