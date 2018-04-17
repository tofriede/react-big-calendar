import React from 'react'
import { Manager, Target, Popper } from 'react-popper';
import Paper from 'material-ui/Paper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Collapse from 'material-ui/transitions/Collapse';
import Grow from 'material-ui/transitions/Grow';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import moment from 'moment';
import AccessTime from '@material-ui/icons/AccessTime';
import Event from '@material-ui/icons/Event';
import Person from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeletIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

class EventWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }


  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    if (this.target.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {

    const { open } = this.state;
    const { event } = this.props;
    console.log(event);

    return (
      <Manager>
        <Target style={this.props.style}>
          <div
            ref={node => {
              this.target = node;
            }}
            onClick={this.handleToggle}
            style={{ height: '100%', width: '100% ' }}
          >
            {this.props.children}
          </div>
        </Target>
        <Popper
          placement="right"
          eventsEnabled={open}
          style={{
            zIndex: 3,
            margin: '10px',
            width: '448px'
          }}
        >
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow in={open} id="menu-list-grow">
              <Paper className="event-popper">
                <div className="event-popper-header-wrapper">
                  <div
                    className="event-popper-header-container"
                    style={{ backgroundColor: event.color ? event.color : '#3174ad' }}>
                    <div className="event-popper-icon-bar">
                      <IconButton
                        onClick={this.handleClose}
                        aria-label="Close"
                        color="inherit"
                        className="event-popper-header-icon-button"
                      >
                        <CloseIcon className="event-popper-header-icon" />
                      </IconButton>
                      <IconButton aria-label="Delete" color="inherit" className="event-popper-header-icon-button">
                        <DeletIcon className="event-popper-header-icon" />
                      </IconButton>
                    </div>
                    <div className="event-popper-header-title">
                      <span>{event.title}</span>
                    </div>
                  </div>
                  <div className="event-popper-floating-edit-container">
                    <Button variant="fab" color="primary" aria-label="edit" mini={true}>
                      <EditIcon />
                    </Button>
                  </div>
                </div>
                <List dense={true} className="event-popper-list">
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime style={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={moment(event.start).format('dddd, Do MMM')}
                      secondary={moment(event.start).format('HH:mm') + ' - ' + moment(event.end).format('HH:mm')}
                      classes={{
                        primary: 'event-popper-primary',
                        secondary: 'event-popper-secondary'
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Event style={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Max Mustermann"
                      classes={{ primary: 'event-popper-primary' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person style={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Lischen Müller"
                      classes={{ primary: 'event-popper-primary' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    )
  }
}

export default EventWrapper
