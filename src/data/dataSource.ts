import dayjs from "dayjs";
import { ITableData } from "../interfaces/interfaces";

export const dataSource: ITableData[] = [
  {
    key: "1",
    name: "Игорь Иванович",
    date: dayjs().format("DD.MM.YYYY"),
    numberValue: 564,
  },
  {
    key: "2",
    name: "Антон Игоревич",
    date: dayjs().format("DD.MM.YYYY"),
    numberValue: 285,
  },
];
