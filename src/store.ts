import { create } from "zustand";
import { ITableData } from "./interfaces/interfaces";

export interface StoreState {
  tableData: ITableData[];
  filteredTableData: ITableData[];

  getTableData: (newTableDate: ITableData[]) => void;
  deleteDate: (id: string) => void;
  addDataToTable: (data: ITableData) => void;
  updateData: (
    key: string,
    nameValue: string,
    dateValue: string,
    numberValue: number
  ) => void;
  getFilteredTableData: (newFilteredTableData: ITableData[]) => void;
}

const useStore = create<StoreState>((set) => ({
  tableData: [],
  filteredTableData: [],

  getTableData: (newTableData) =>
    set(() => ({
      tableData: newTableData,
    })),

  deleteDate: (id) =>
    set((state: StoreState) => ({
      tableData: state.tableData.filter((item) => item.key !== id),
    })),

  addDataToTable: (data) =>
    set((state: StoreState) => ({
      tableData: [...state.tableData, data],
    })),

  updateData: (key, nameValue, dateValue, numberValue) =>
    set((state: StoreState) => ({
      tableData: state.tableData.map((item) =>
        item.key === key
          ? {
              ...item,
              name: nameValue,
              date: dateValue,
              numberValue: numberValue,
            }
          : item
      ),
    })),

  getFilteredTableData: (newFilteredTableData) =>
    set(() => ({
      filteredTableData: newFilteredTableData,
    })),
}));

export default useStore;
