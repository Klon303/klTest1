import { Space } from "antd";
import { Input } from "antd";
import { useEffect} from "react";
import { ITableData } from "../../interfaces/interfaces";
import useFilteredData from "../../Actions/useFilteredData";
import useStore from "../../store";

const { Search } = Input;

interface SearchComponentProps {
  tableData: ITableData[];
  onSearchValue: (value: string) => void;
  searchValue: string;
}

const SearchComponent: React.FC<SearchComponentProps> = (props) => {
  const filteredData = useFilteredData(props.searchValue, props.tableData);

  useEffect(() => {
    useStore.getState().getFilteredTableData(filteredData);
  }, [filteredData]);

  return (
    <Space direction="horizontal"  >
      <Search
        placeholder="Поиск"
        value={props.searchValue}
        onChange={(e) => props.onSearchValue(e.target.value)}
        onSearch={() => {}}
      />
    </Space>
  );
};

export default SearchComponent;
