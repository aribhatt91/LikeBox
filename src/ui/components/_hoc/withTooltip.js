import React from 'react';

function withTooltip(Component) {
    return class WithToolTip extends React.Component {
        state = {
            showTooltip: false
        }
        onMouseOver = () => this.setState({showTooltip: true});
        onMouseOut = () => this.setState({showTooltip: false});
        render() {
            return (
            <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <Component {...this.props} showTooltip={this.state.showTooltip}/>
            </div>)
        }
    }
}

export default withTooltip;