import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Toggle from "./Toggle";
import styled from "styled-components";

const DisplayBox = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

const StyledDisplayBox = styled(DisplayBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  padding: 2rem;
  margin: 1rem;
  background-color: #eae9e9;
  box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.25);
  > * {
    margin: 1rem 0;
  }
`;

const propVarieties = [
  {},
  { selected: true, disabled: true },
  { selected: true, noIcon: true },
  { disabled: true }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Toggle Tutorial</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "1rem",
            flexWrap: "wrap"
          }}
        >
          <StyledDisplayBox>
            <Toggle
              selected={this.state.selected}
              onChange={() => {
                this.setState({ selected: !this.state.selected });
              }}
            />
            <div>Controllable</div>
            <div style={{ margin: "1rem 0" }}>Props</div>

            <code>
              selected: (parent)this.state.selected{" "}
              <span style={{ color: "red", opacity: "0.55" }}>
                {JSON.stringify(this.state.selected)}
              </span>
            </code>
            <code>
              onChange: () => this.setState({"{selected: !this.state.selected}"})
            </code>
          </StyledDisplayBox>
          {propVarieties.map((props, index) => {
            return (
              <StyledDisplayBox key={index}>
                <Toggle {...props} />
                <div style={{ margin: "1rem 0" }}>Props</div>
                {Object.keys(props).map((key, index) => {
                  return (
                    <code>
                      {key}: {JSON.stringify(props[key])}
                    </code>
                  );
                })}
              </StyledDisplayBox>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
