import autobind from "autobind-decorator";
import * as React from "react";
import { Spinner } from "../shared/spinner/Spinner";

import "./PeriodicTable.scss";

import data from '../../data/pt.json'

export interface IPeriodicTableElement {
  component: React.ComponentClass;
  props?: {
    [key: string]: any;
  };
}

interface IPeriodicTableProps {
  elementRenderer: (elementId: number) => IPeriodicTableElement;
}

interface IPeriodicTableState {
  render: boolean;
}

@autobind
class PeriodicTable extends React.PureComponent<
  IPeriodicTableProps,
  IPeriodicTableState
> {
  public state: IPeriodicTableState = {
    render: false
  };

  private requestAnimationFrame: number;
  private periodicTableData: number[][];

  constructor(props: IPeriodicTableProps) {
    super(props);

    this.periodicTableData = data;
  }

  public componentDidMount() {
    this.requestAnimationFrame = window.requestAnimationFrame(
      () =>
        (this.requestAnimationFrame = window.requestAnimationFrame(() =>
          this.setState({ render: true })
        ))
    );
  }

  public componentWillUnmount() {
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  public render() {
    const { render } = this.state;

    if (!render) {
      return (
        <div className="periodic-table--loading">
          <Spinner className="periodic-table__spinner" />
        </div>
      );
    }

    return <div className="periodic-table">{this.buildTable()}</div>;
  }

  private buildTable() {
    const data = this.periodicTableData;
    const rows: JSX.Element[] = [
      <div key="row-head" className="periodic-table__row">
        <div className="periodic-table__cell periodic-table__cell--label" />
        <div className="periodic-table__cell periodic-table__cell--label">
          1
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          2
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          3
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          4
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          5
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          6
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          7
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          8
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          9
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          10
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          11
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          12
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          13
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          14
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          15
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          16
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          17
        </div>
        <div className="periodic-table__cell periodic-table__cell--label">
          18
        </div>
      </div>
    ];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      rows.push(
        <div className="periodic-table__row" key={`row-${i}`}>
          {i <= 6 ? (
            <div className="periodic-table__cell periodic-table__cell--label">
              {i + 1}
            </div>
          ) : (
            <div className="periodic-table__cell periodic-table__cell--label" />
          )}

          {row.map((element, index) => {
            if (element <= 0) {
              return (
                <div
                  key={`row-${i}-cell-${index}`}
                  className="periodic-table__cell periodic-table__cell--empty"
                />
              );
            }

            const ptElement = this.props.elementRenderer(element);
            const $component = ptElement.component;
            const props = ptElement.props;

            return (
              <div
                className="periodic-table__cell"
                key={`row-${i}-cell-${index}`}
              >
                <$component {...props} />
              </div>
            );
          })}
        </div>
      );
    }

    return rows;
  }
}

export default PeriodicTable;
