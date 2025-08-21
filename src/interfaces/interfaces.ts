export interface Column<T> {
  key: string;
  [key: string]: any;
  render?: (text: any, record: T) => React.ReactNode;
}

export interface ITableData {
  key: string;
  name: string;
  date: string;
  numberValue: number;
}

export interface ColumnData {
  title: string;
  dataIndex: string;
  key: string;
}
