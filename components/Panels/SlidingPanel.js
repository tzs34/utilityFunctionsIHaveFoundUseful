import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {cyanA200
    , lightBlue50} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'

const CLOSE_TIMEOUT = 400

const SlidingPanel = (props) => {

    let contentClasses = props.isOpen ? 'slide-pane__content content-open' : 'slide-pane__content content-close'

    return <div className= {props.isOpen ? 'slide-pane isOpen' : 'slide-panel isClosed'}>
        <div className='slide-pane__header'>
            <div className='slide-pane__title-wrapper'>
                <h2 className='slide-pane__title'>{ props.title }</h2>
                <div className='slide-pane__subtitle'>{ props.subtitle }</div>
            </div>

            <div className='slide-pane__icons' >
                < MuiThemeProvider >
                    <IconButton onClick={ props.togglePanel}>
                        { props.isOpen ?
                            <ChevronLeft color={lightBlue50} hoverColor={cyanA200}/>
                            :
                            <ChevronRight color={lightBlue50} hoverColor={cyanA200}/>
                        }
                    </IconButton>
                </MuiThemeProvider>
            </div>
        </div>
        <div className={contentClasses}>
            {/* Render pane content only when pane is visible, hide after close animation */}
            <CSSTransitionGroup
                transitionName='content-appear'
                transitionEnter={ false }
                transitionLeaveTimeout={ CLOSE_TIMEOUT }>
                {
                    props.isOpen && props.children
                }
            </CSSTransitionGroup>
        </div>
    </div>

}



SlidingPanel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.any,
    subtitle: PropTypes.any,
    togglePanel: PropTypes.func,
    onAfterOpen: PropTypes.func,
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default SlidingPanel