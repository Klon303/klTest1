import { FormInstance, Space } from "antd";
import useStore from "../store";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Column, ITableData } from "../interfaces/interfaces";

export const useColumns = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedRow: React.Dispatch<React.SetStateAction<ITableData | null>>,
  form: FormInstance<any>
): Column<ITableData>[] => {
  const deleteDate = useStore((state) => state.deleteDate);

  return [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sorter: (a: ITableData, b: ITableData) => a.name.localeCompare(b.name),
    },

    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      sorter: (a: ITableData, b: ITableData) =>
        dayjs(a.date, "DD.MM.YYYY").valueOf() -
        dayjs(b.date, "DD.MM.YYYY").valueOf(),
    },
    {
      title: "Номер",
      dataIndex: "numberValue",
      key: "numberValue",
      sorter: (a: ITableData, b: ITableData) => a.numberValue - b.numberValue,
    },

    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedRow(record);
              setIsModalOpen(true);

              let parsedDate;

              if (dayjs.isDayjs(record.date)) {
                parsedDate = record.date;
              } else if (typeof record.date === "string") {
                parsedDate = dayjs(record.date, "DD.MM.YYYY", true);
              } else {
                parsedDate = null;
              }

              form.setFieldsValue({
                ...record,
                date: parsedDate && parsedDate.isValid() ? parsedDate : null,
              });
              console.log("parsed date", dayjs(record.date, "DD.MM.YYYY"));
            }}
          >
            <EditOutlined />
          </a>

          <a onClick={() => deleteDate(record.key)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
};
