import React, {Component} from 'react';
import RegisterEvent from './RegisterEvent';
import EventList from './EventList'


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
