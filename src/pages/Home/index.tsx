import Col from "antd/lib/col";
import Row from "antd/lib/row";
import {
  Container,
  HomeContent,
  HomeFooter,
  HomeTitle,
  SpanTitle,
} from "./style";
import CategoryCard from "../../components/CategoryCard";
import { useTheme } from "../../context/ThemeContext";

export const Home = () => {
  const { mode } = useTheme();
  return (
    <Container>
      <HomeTitle mode={mode}>
        Welcome to the Visual Guide of{" "}
        <SpanTitle mode={mode}>Star Wars</SpanTitle>
      </HomeTitle>
      <HomeContent>
        <Row gutter={[16, 16]} wrap={true}>
          <Col span={6} xs={24} sm={12} md={6} lg={6} xl={6}>
            {/* <div>Personagens</div> */}
            <CategoryCard
              title="Characters"
              link="/characters"
              cover_img="https://images.unsplash.com/photo-1547700055-b61cacebece9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              description="Discover the characters of Star Wars."
            />
          </Col>
          <Col span={6} xs={24} sm={12} md={6} lg={6} xl={6}>
            {/* <div>Filmes</div> */}
          </Col>
          <Col span={6} xs={24} sm={12} md={6} lg={6} xl={6}>
            {/* <div>Planetas</div> */}
          </Col>
          <Col span={6} xs={24} sm={12} md={6} lg={6} xl={6}>
            {/* <div>Naves</div> */}
          </Col>
        </Row>
      </HomeContent>
      <HomeFooter mode={mode}>
        Developed by Lucas Ferreira ©2025. Star wars and all characters are of
        Disney and Lucasfilm. The images were collected freely from Wookiepedia
        and Unsplash.
      </HomeFooter>
    </Container>
  );
};
