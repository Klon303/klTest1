import { useMemo } from "react";
import { ITableData } from "../interfaces/interfaces";

const useFilteredData = (searchValue: string, data: ITableData[]) => {
  return useMemo(() => {
    const trimmedValue = searchValue.trim().toLowerCase();

    if (!trimmedValue) {
      return data;
    }

    return data.filter((item) =>
      [item.name, item.date, item.numberValue.toString()].some((field) =>
        field?.toString().toLowerCase().includes(trimmedValue)
      )
    );
  }, [searchValue, data]);
};

export default useFilteredData;
