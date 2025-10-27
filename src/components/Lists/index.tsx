import { Button, Flex, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { ListsContainer } from "./style";
interface ListsProps {
  title: string;
  items: any[];
  loading: boolean;
  error: string;
  linkTo: string;
}
const Lists = ({ title, items, loading, error, linkTo }: ListsProps) => {
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
      <Flex gap="middle" wrap justify="space-between">
        {items.map((item: any) => (
          <Button key={item.name} onClick={() => handleClick(item)} type="text">
            {item.name}
          </Button>
        ))}
      </Flex>
    </ListsContainer>
  );
};

export default Lists;
