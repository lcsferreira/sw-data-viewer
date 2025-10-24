import styled from "styled-components";
import Card from "antd/es/card/Card";
import { Link } from "react-router-dom";
import { ThemeMode } from "../../../context/ThemeContext";

export const CharacterDetailCard = styled(Card)`
  width: 60%;
`;

export const BackButton = styled(Link)<{ mode: ThemeMode }>`
  color: ${({ mode }) => (mode === "dark" ? "#BC1E22" : "#1a387d")};
`;
