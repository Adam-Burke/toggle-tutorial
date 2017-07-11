import React from "react";
import CheckMark from "react-icons/lib/fa/check";
import styled from "styled-components";

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
    `
      border: 1px solid #ffffff;
      background-color: rgb(94,233,171);
      :hover {
        background-color: rgb(67, 167, 122);
      }
    `} ${props =>
      !props.selected &&
      !props.disabled &&
      `
      background-color: #EAE9E9;
      :hover {
        background-color: rgb(183, 183, 183);
      }
  `} ${props =>
      props.disabled &&
      `
      border: none;
      background-color: #EAE9E9;
  `};
  transition: all 0.1s ease 0.1s;
`;

const ToggleThumb = styled.div`
  width: 31px;
  height: 34px;
  margin: 1.5px 1px 1px;
  transform: ${props =>
    !props.selected ? "translateX(0px)" : "translateX(44px)"};
  background-color: ${props => (props.disabled ? "#EAE9E9" : "#ffffff")};
  box-shadow: -1px 0 3px 0 rgba(0, 0, 0, 0.19),
    inset 0 -1px 1px 0 rgba(0, 0, 0, 0.50);
  border-radius: 3px;
  transition: transform 0.3s ease;
`;

const ToggleCheckMark = styled(CheckMark)`
  margin-top: 5px;
  font-size: 24px;
  transform: ${props =>
    !props.selected ? "translateX(-65px)" : "translateX(-20px)"};
  color: ${props => (!props.disabled ? "#FFFFFF" : "rgb(94,233,171)")};
  letter-spacing: 0;
  transition: ${props =>
    props.selected
      ? "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.125) 0.1s"
      : "transform 0.3s ease"};
  text-shadow: 0 1px 0 rgba(0,0,0,0.18);
`;

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    return (
      <ToggleBox
        disabled={this.props.disabled}
        selected={this.props.selected}
        onClick={this.handleClick}
        style={this.props.style}
      >
        <ToggleThumb
          disabled={this.props.disabled}
          selected={this.props.selected}
        />
        {!this.props.noIcon
          ? <ToggleCheckMark
              disabled={this.props.disabled}
              selected={this.props.selected}
            />
          : null}
      </ToggleBox>
    );
  }
}

export default Toggle;
