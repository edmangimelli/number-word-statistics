import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test.each`
  includeL | left  | right | includeR | iMin | iMax  | iOK     | xMin | xMax  | xOK
  ${false} | ${1}  | ${10} | ${false} | ${2} | ${9}  | ${true} | ${1} | ${10} | ${true}
  ${false} | ${1}  | ${10} | ${true}  | ${2} | ${10} | ${true} | ${1} | ${11} | ${true}
  ${true}  | ${1}  | ${10} | ${false} | ${1} | ${9}  | ${true} | ${0} | ${10} | ${true}
  ${true}  | ${1}  | ${10} | ${true}  | ${1} | ${10} | ${true} | ${0} | ${11} | ${true}
  ${false} | ${10} | ${1}  | ${false} | ${2} | ${9}  | ${true} | ${1} | ${10} | ${true}
  ${true}  | ${10} | ${1}  | ${false} | ${2} | ${10} | ${true} | ${1} | ${11} | ${true}
  ${false} | ${10} | ${1}  | ${true}  | ${1} | ${9}  | ${true} | ${0} | ${10} | ${true}
  ${true}  | ${10} | ${1}  | ${true}  | ${1} | ${10} | ${true} | ${0} | ${11} | ${true}
`(
  "inclusiveMinMax, exclusiveMinMax",
  ({ includeL, left, right, includeR, iMin, iMax, iOK, xMin, xMax, xOK }) => {
    const app = new App({
      includeLeft: includeL,
      left,
      right,
      includeRight: includeR,
    });
    expect([app.inclusiveMinMax(), app.exclusiveMinMax()]).toEqual([
      [iMin, iMax, iOK],
      [xMin, xMax, xOK],
    ]);
  }
);
