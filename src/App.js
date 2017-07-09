import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Toggle from "./Toggle";
import styled from "styled-components";

const TogglePropBox = ({ className, toggleProps, children }) => {
  return (
    <div className={className}>
      <Toggle {...toggleProps} />
      {Object.keys(toggleProps).map(key => {
        return (
          <div>
            {key}: {JSON.stringify(toggleProps[key])}
          </div>
        );
      })}
      {children}
    </div>
  );
};

const StyledTogglePropBox = styled(TogglePropBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  padding: 2rem;
  background-color: #bbbbbb;
  > * {
    margin: 1rem 0;
  }
`;

const propEnumeration = [
  {},
  { selected: "true", disabled: true },
  { selected: 1, noIcon: true },
  { disabled: true }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Toggle Tutorial</h2>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <span style={{ color: "red", opacity: "0.55" }}>
            controlledState:
          </span>{" "}
          {JSON.stringify(this.state.selected)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "1rem",
            flexWrap: "wrap"
          }}
        >
          {propEnumeration.map((props, index) => {
            return <StyledTogglePropBox key={index} toggleProps={props} />;
          })}
          {/*Two examples below will throw errors. They represent invalid input.*/}
          {/*<Toggle selected={"cat"} />*/}
          {/*<Toggle selected={{ true: true }} />*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Toggle
              style={{ margin: "1rem 0" }}
              selected={this.state.selected}
              onChange={() => {
                this.setState({ selected: !this.state.selected });
              }}
            />
            <div style={{ margin: "1rem 0" }}>
              selected:{" "}
              <span style={{ color: "red", opacity: "0.55" }}>
                controlledState
              </span>
            </div>
            <div style={{ margin: "1rem 0" }}>onChange: function</div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.setState({ selected: this.checkboxInput.checked });
              }}
            >
              <Toggle
                inputRef={node => {
                  this.checkboxInput = node;
                }}
              />
              <div style={{ margin: "2rem 0" }}>Uncontrolled</div>
              <button style={{ margin: "0rem 0" }}>submit</button>
            </form>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
