import React from "react";
import CheckMark from "react-icons/lib/fa/check";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ToggleBox = styled.div`
  overflow: hidden;
  width: 77px;
  height: 36px;
  display: flex;
  background-color: #eae9e9;
  border: 1px solid #979797;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.20),
    inset 0 1px 5px 0 rgba(0, 0, 0, 0.50);
  border-radius: 3px;
  ${props =>
    props.selected &&
    !props.disabled &&
    css`
      border: 1px solid #ffffff;

      background-color: rgb(94,233,171);
      :hover {
        background-color: rgb(67, 167, 122);
      }
    `} ${props =>
      !props.selected &&
      !props.disabled &&
      css`
      background-color: #EAE9E9;
      :hover {
        background-color: rgb(183, 183, 183);
      }
  `} ${props =>
      props.disabled &&
      css`
        border: none;
      background-color: #EAE9E9;
  `};
  transition: all 0.1s linear 0.1s;
`;

const StyledToggleThumb = styled.div`
  width: 31px;
  height: 34px;
  margin: 1.5px 1px 1px;
  transform: ${props =>
    !props.selected ? "translateX(0px)" : "translateX(44px)"};
  background-color: ${props => (props.disabled ? "#EAE9E9" : "#ffffff")};
  box-shadow: -1px 0 3px 0 rgba(0, 0, 0, 0.19),
    inset 0 -1px 1px 0 rgba(0, 0, 0, 0.50);
  border-radius: 3px;
  transition: ${props =>
    !props.selected ? "transform 0.1s linear 0.1s" : "transform 0.1s linear"};
`;

const StyledToggleCheckMark = styled(CheckMark)`
    margin-top: 5px;
    font-size: 24px;
    transform: ${props =>
      !props.selected ? "translateX(-65px)" : "translateX(-20px)"};
    color: ${props => (!props.disabled ? "#FFFFFF" : "rgb(94,233,171)")};
    letter-spacing: 0;
    transition: ${props =>
      props.selected ? "transform 0.1s linear 0.1s" : "transform 0.1s linear"};
    text-shadow: 0 1px 0 rgba(0,0,0,0.18);
`;

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    if (this.selectedPropExists(props)) {
      this.state = {
        selected: this.parseBool(props.selected)
      };
    } else {
      this.state = {
        selected: false
      };
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.disabled) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (!this.selectedPropExists(this.props)) {
      return this.setState({ selected: !this.state.selected });
    }
  }

  parseBool = value => {
    switch (typeof value) {
      case "boolean":
        return value;
      case "string":
        if (value.toLowerCase() === "true") {
          return true;
        } else if (value.toLowerCase() === "false") {
          return false;
        } else {
          throw new Error("Invalid Input");
        }
      case "number":
        return value ? true : false;
      default:
        throw new Error("Invalid Input");
    }
  };

  selectedPropExists = props => {
    return props.selected !== null && props.selected !== undefined;
  };

  componentWillReceiveProps(nextProps) {
    if (this.selectedPropExists(nextProps)) {
      try {
        const selected = this.parseBool(nextProps.selected);
        this.setState({ selected });
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }

  render() {
    return (
      <ToggleBox
        disabled={this.props.disabled}
        selected={this.state.selected}
        onClick={this.handleClick}
        style={{ ...this.props.style }}
      >
        <StyledToggleThumb
          disabled={this.props.disabled}
          selected={this.state.selected}
        />
        {!this.props.noIcon
          ? <div>
              <StyledToggleCheckMark
                disabled={this.props.disabled}
                selected={this.state.selected}
              />
            </div>
          : null}
        <input
          style={{ visiblilty: "hidden", display: "none" }}
          type="checkbox"
          disabled={this.props.disabled}
          value={this.state.checked}
          selected={this.state.selected}
          checked={this.state.selected}
          ref={this.props.inputRef}
        />
      </ToggleBox>
    );
  }
}

Toggle.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  inputRef: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string
  ])
};

export default Toggle;
