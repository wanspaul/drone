import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PanelGroup, Panel} from 'react-bootstrap';
// import EventItem from './EventItem';
import EventDetail from './EventDetail';
import * as actions from '../actions';


const EventList = ({event_list, product_list, onChangeSelect, onDeleteEvent}) => {
    return (
        <PanelGroup defaultActiveKey="0" accordion>
            {event_list.map((event, i) => {
                return (
                    <Panel key={i} header={event.title} eventKey={i.toString()}>
                        <EventDetail 
                            event_idx={i}
                            event={event}
                            product_list={product_list}
                            onChangeSelect={onChangeSelect}
                            onDeleteEvent={onDeleteEvent}
                         />
                    </Panel>
                );
            })}
        </PanelGroup>
    );
};

export default EventList;

