import * as React from "react";
import { Spinner } from "../shared/spinner/Spinner";

import "./PeriodicTable.scss";

import periodicTableData from "../../data/pt.json";

type ElementRendered = (elementId: number) => React.ReactNode;
interface PeriodicTableProps {
  elementRenderer: ElementRendered;
}

function buildTable(elementRenderer: ElementRendered) {
  const rows: JSX.Element[] = [
    <div key="row-head" className="periodic-table__row">
      <div className="periodic-table__cell periodic-table__cell--label" />
      <div className="periodic-table__cell periodic-table__cell--label">1</div>
      <div className="periodic-table__cell periodic-table__cell--label">2</div>
      <div className="periodic-table__cell periodic-table__cell--label">3</div>
      <div className="periodic-table__cell periodic-table__cell--label">4</div>
      <div className="periodic-table__cell periodic-table__cell--label">5</div>
      <div className="periodic-table__cell periodic-table__cell--label">6</div>
      <div className="periodic-table__cell periodic-table__cell--label">7</div>
      <div className="periodic-table__cell periodic-table__cell--label">8</div>
      <div className="periodic-table__cell periodic-table__cell--label">9</div>
      <div className="periodic-table__cell periodic-table__cell--label">10</div>
      <div className="periodic-table__cell periodic-table__cell--label">11</div>
      <div className="periodic-table__cell periodic-table__cell--label">12</div>
      <div className="periodic-table__cell periodic-table__cell--label">13</div>
      <div className="periodic-table__cell periodic-table__cell--label">14</div>
      <div className="periodic-table__cell periodic-table__cell--label">15</div>
      <div className="periodic-table__cell periodic-table__cell--label">16</div>
      <div className="periodic-table__cell periodic-table__cell--label">17</div>
      <div className="periodic-table__cell periodic-table__cell--label">18</div>
    </div>,
  ];

  for (let i = 0; i < periodicTableData.length; i++) {
    const row = periodicTableData[i];

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

          return (
            <div
              className="periodic-table__cell"
              key={`row-${i}-cell-${index}`}
            >
              {elementRenderer(element)}
            </div>
          );
        })}
      </div>
    );
  }

  return rows;
}

function PeriodicTable({ elementRenderer }: PeriodicTableProps) {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    let requestAnimationFrame: number = window.requestAnimationFrame(
      () =>
        (requestAnimationFrame = window.requestAnimationFrame(() =>
          setRender(true)
        ))
    );
    return () => window.cancelAnimationFrame(requestAnimationFrame);
  }, []);

  if (!render) {
    return (
      <div className="periodic-table--loading" aria-label="loading">
        <Spinner className="periodic-table__spinner" />
      </div>
    );
  }

  return <div className="periodic-table">{buildTable(elementRenderer)}</div>;
}

export default PeriodicTable;
