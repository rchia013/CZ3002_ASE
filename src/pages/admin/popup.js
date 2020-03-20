import React from "react";
import "./popup.css";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <button id="btx" onClick={this.props.closePopup}>
          X
        </button>
        <div className="popup\_inner">
          <h1 id="h1x">{this.props.text}</h1>
        </div>
        <div id="space"></div>
      </div>
    );
  }
}

export default Popup;
