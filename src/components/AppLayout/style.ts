import styled from "styled-components";
import { ThemeMode } from "../../context/ThemeContext";

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

export const ContentWrapper = styled.div`
  padding: 16px;
  min-height: calc(100vh - 64px);
  background: transparent;
`;

export const SpanTitle = styled.span<{ mode?: ThemeMode }>`
  color: ${(props) => (props.mode === "dark" ? "#bc1e22" : "#1a387d")};
  font-size: 24px;
  font-family: "SFDistantGalaxy-Regular";
`;
