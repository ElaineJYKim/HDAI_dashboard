import React, { Component } from "react";
import { FormattedNumber } from "react-intl";
import { IntlProvider } from "react-intl";

class Number extends Component {
  render() {
    return (
      <IntlProvider>
        <FormattedNumber
          //style="percent"
          value={this.props.value}
          minimumFractionDigits={2}
        />
      </IntlProvider>
    );
  }
}

export default Number;
