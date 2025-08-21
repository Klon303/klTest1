import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import { Button, Table } from "antd";
import { dataSource } from "./data/dataSource";
import useStore from "./store";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import ModalComponent from "./components/popup/popup.component";
import SearchComponent from "./components/search/search.component";
import { useColumns } from "./Actions/useColumns";
import { ITableData } from "./interfaces/interfaces";

function App() {
  const tableData = useStore((state) => state.tableData);
  const filteredTableData = useStore((state) => state.filteredTableData);

  const [selectedRow, setSelectedRow] = useState<ITableData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [form] = useForm();

  useEffect(() => {
    useStore.getState().getTableData(dataSource);
  }, []);

  useEffect(() => {
    if (selectedRow) {
      form.setFieldsValue({
        ...selectedRow,
        date: dayjs(selectedRow.date, "DD.MM.YYYY"),
      });
    }
  }, [selectedRow]);

  const handleFinish = (values: any) => {
    const formattedDate =
      values.date && dayjs.isDayjs(values.date)
        ? values.date.format("DD.MM.YYYY")
        : dayjs(values.date, "DD.MM.YYYY").format("DD.MM.YYYY");

    if (selectedRow) {
      useStore
        .getState()
        .updateData(
          selectedRow!.key,
          values.name,
          formattedDate,
          values.numberValue
        );
    } else {
      useStore.getState().addDataToTable({
        key: uuidv4(),
        name: values.name,
        date: formattedDate,
        numberValue: values.numberValue,
      });
    }

    form.resetFields();
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="wrapper">
      <SearchComponent
        tableData={tableData}
        searchValue={searchValue}
        onSearchValue={setSearchValue}
      />
      <div className="App__container-button">
        <Button onClick={() => setIsModalOpen((prev) => !prev)}>
          Добавить
        </Button>
        </div>
      </div>
       <ModalComponent
        form={form}
        onFinish={handleFinish}
        onModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <Table
        dataSource={!searchValue ? tableData : filteredTableData}
        columns={useColumns(setIsModalOpen, setSelectedRow, form)}
      />
    </div>
  );
}

export default App;
