import * as React from "react";
import { Spinner } from "@/components/shared/spinner/Spinner";

import "./PeriodicTable.scss";

import periodicTableData from "@/data/pt.json";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type ElementRendered = (elementId: number) => React.ReactNode;
interface PeriodicTableProps {
  elementRenderer: ElementRendered;
}

function EmptyCell() {
  return (
    <div
      className="periodic-table__cell periodic-table__cell--empty"
      aria-hidden={true}
    />
  );
}

function EmptyElement() {
  return (
    <div
      className="periodic-table__cell periodic-table__cell--empty-element"
      aria-hidden={true}
    />
  );
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
          // TODO: localize "Period N"
          <div className="periodic-table__cell periodic-table__cell--label">
            {i + 1}
          </div>
        ) : (
          // TODO: localize and label "Lanthanides" and "Actinides"
          <div className="periodic-table__cell periodic-table__cell--label" />
        )}

        {row.map((element, index) => {
          const key = `row-${i}-cell-${index}`;

          if (element <= 0) {
            return <EmptyCell key={key} />;
          }

          const renderedElement = elementRenderer(element);

          if (!renderedElement) {
            return <EmptyElement key={key} />;
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

  return (
    <TransformWrapper
      minScale={0.2}
      limitToBounds={false}
      doubleClick={{
        disabled: true,
      }}
    >
      <TransformComponent
        contentStyle={{ width: "100%", height: "100%" }}
        wrapperStyle={{ width: "100%", height: "100%" }}
      >
        <div className="periodic-table">{buildTable(elementRenderer)}</div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default PeriodicTable;
