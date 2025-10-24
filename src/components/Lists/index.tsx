import { Button, Card, Flex, List, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { ListsContainer } from "./style";
interface ListsProps {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  loading: boolean;
  error: string;
  linkTo: string;
}
const Lists = ({
  title,
  items,
  renderItem,
  loading,
  error,
  linkTo,
}: ListsProps) => {
  const navigate = useNavigate();
  const handleClick = (item: any) => {
    navigate(`${linkTo}/${item.url.match(/\d+/)?.[0]}`);
  };
  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status="500" title="Error" subTitle={error} />;
  }
  return (
    <ListsContainer title={title} style={{ width: "100%" }}>
      {/* <List
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item onClick={() => handleClick(item)}>
            {renderItem(item)}
          </List.Item>
        )}
      /> */}
      <Flex gap="middle" wrap justify="space-between">
        {items.map((item: any) => (
          <Button key={item.url} onClick={() => handleClick(item)} type="text">
            {item.name}
          </Button>
        ))}
      </Flex>
    </ListsContainer>
  );
};

export default Lists;
