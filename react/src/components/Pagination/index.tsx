import { useMemo, Dispatch, SetStateAction } from "react";
import { ReactComponent as ChevronLeftIcon } from "assets/images/chevron-left.svg";
import "./index.scss";
import { usePagination } from "hooks/usePagination";

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

  const itemList = usePagination({
    count: totalPages,
    page: value,
    siblingCount: 1,
    boundaryCount: 1,
  });


  const renderPages = useMemo(
    () =>
      itemList.map(
        (item: string | number) => (
          item === 'start-ellipsis' || item === 'end-ellipsis' ? (
            <div key={item} className="ellipsis">
              ...
            </div>
          ) : (
          <div
            key={item}
            onClick={() => onChange(Number(item))}
            className={item === value ? "active" : ""}
          >
            {item}
          </div>
          )
        )
      ),
    [itemList, value, onChange]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <ChevronLeftIcon
        className={`chevron-left ${value === 1 ? "disabled" : ""}`}
        onClick={() => onChange(value - 1)}
      />
      {renderPages}
      <ChevronLeftIcon
        className={`chevron-right ${
          value === totalPages ? "disabled" : ""
        }`}
        onClick={() => onChange(value < totalPages ? value + 1 : value)}
      />
    </div>
  );
};
