import Input from "antd/es/input";
import { Header } from "antd/es/layout/layout";
import Pagination from "antd/es/pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
const { Search } = Input;

export const Container = styled.div`
  padding: 20px;
`;

export const SearchBar = styled(Header)`
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
  gap: 20px;
  background-color: transparent;
`;

export const BackButton = styled(Link)`
  text-decoration: none;
  padding: 0;
`;

export const SearchInput = styled(Search)`
  width: 400;
  display: flex;
  align-items: center;
`;

export const PaginationContainer = styled(Pagination)`
  margin-top: 20px;
  text-align: center;
`;
