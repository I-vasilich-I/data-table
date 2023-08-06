import "./CustomSelect.scss";
import { ChangeEvent, useRef, useState, useEffect, memo, useCallback } from "react";
import classnames from "classnames";

interface IProps {
  options: string[];
  selectedOption?: number;
  label: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<IProps> = ({ options, selectedOption = -1, label, onChange }) => {
  const defaultOption = selectedOption === -1 ? options[0] : options[selectedOption];
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultOption);
  const customSelectClassName = classnames("select__custom", {
    "is-active": isActive,
  });
  const nativeSelectRef = useRef<HTMLSelectElement>(null);
  const customSelectRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsActive((prevValue) => !prevValue);
  };

  const handleClick = (option: string) => {
    setSelectedValue(option);
    const nativeSelect = nativeSelectRef.current;

    if (nativeSelect) {
      nativeSelect.value = option;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleOutsideClick = useCallback((e: Event) => {
    const element = e.target as HTMLElement;
    const didClickOutside = customSelectRef.current && !customSelectRef.current.contains(element);
    if (didClickOutside && isActive) {
      setIsActive(false);
    }
  }, [isActive]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [handleOutsideClick, isActive]);

  useEffect(() => {
    onChange(selectedValue);
  }, [onChange, selectedValue]);

  return (
    <div className="select">
      {label ? (
        <div className="select__label">
          {label}
        </div>
      ) : null}
      <div className="select__wrapper">
        <select
          ref={nativeSelectRef}
          className="select__native"
          value={selectedValue}
          onChange={handleChange}
        >
          {options.map((elem) => (
            <option key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        <div
          ref={customSelectRef}
          className={customSelectClassName}
          aria-label="custom-select"
          aria-hidden={isActive}
          onClick={handleOpen}
        >
          <div className="select__custom-trigger">{selectedValue}</div>
          <div className="select__custom-options">
            {options.map((elem) => (
              <div key={elem} className="select__custom-option" data-value={elem} onClick={() => handleClick(elem)}>
                {elem}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomSelect);
