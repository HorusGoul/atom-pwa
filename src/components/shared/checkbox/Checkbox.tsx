import classNames from "classnames";
import * as React from "react";
import "./Checkbox.scss";

export interface CheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  readOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function Checkbox({
  className,
  children,
  onChange,
  readOnly = false,
  value,
}: CheckboxProps) {
  const [internalValue, setInternalValue] = React.useState(() =>
    value === undefined ? false : value
  );

  React.useEffect(() => {
    if (value === undefined) {
      return;
    }

    setInternalValue(value);
  }, [value]);

  function toggleCheck(e: React.FormEvent<HTMLInputElement>) {
    if (readOnly) {
      return;
    }

    const newValue = e.currentTarget.checked;

    setInternalValue(newValue);
    onChange?.(newValue);
  }

  function onClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div className={classNames("checkbox", className)}>
      <label>
        <input
          className="checkbox__input"
          type="checkbox"
          checked={internalValue}
          readOnly={readOnly}
          onChange={toggleCheck}
          onClick={onClick}
        />

        <div className="checkbox__content">
          <svg xmlns="http://www.w3.org/2000/svg" width="8px" height="6px">
            <path
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              d="M0.35,2.48 2.47,4.59 6.71,0.35"
            />
          </svg>
        </div>

        {children && <div className="checkbox__label">{children}</div>}
      </label>
    </div>
  );
}

export default Checkbox;
