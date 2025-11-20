import { useMemo, Dispatch, SetStateAction } from "react";
import { ReactComponent as ChevronLeftIcon } from "assets/images/chevron-left.svg";
import "./index.scss";

interface PaginationProps {
  itemsCount: number;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export const CARDS_PER_PAGE: number = 10;

export const Pagination = ({
  itemsCount,
  value,
  onChange
}: PaginationProps) => {
  const totalPages = Math.ceil(itemsCount / CARDS_PER_PAGE);
  const renderPages = useMemo(
    () =>
      Array.from(Array(totalPages).keys()).map(
        (_, i) => (
          <div
            key={i}
            onClick={() => onChange(i + 1)}
            className={i + 1 === value ? "active" : ""}
          >
            {i + 1}
          </div>
        )
      ),
    [totalPages, value, onChange]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <ChevronLeftIcon
        className={`chevron-left ${value === 1 ? "disabled" : ""}`}
        onClick={() => onChange(1)}
      />
      {renderPages}
      <ChevronLeftIcon
        className={`chevron-right ${
          value === totalPages ? "disabled" : ""
        }`}
        onClick={() => onChange(value + 1)}
      />
    </div>
  );
};
