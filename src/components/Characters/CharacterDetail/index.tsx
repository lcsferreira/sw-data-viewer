import { Character } from "../../../api/models/Character";
import { Col, Descriptions, Row, Skeleton } from "antd";
import { BackButton, CharacterDetailCard } from "./style";
import CharacterDetailTitle from "../CharacterDetailTitle";
import useWindowDimensions from "../../../hooks/useWindowDimensios";
import {
  formatBirthYear,
  formatHeight,
  formatMass,
} from "../../../helpers/dataFormatters";
import { capitalizeFirstLetter } from "../../../helpers/StringFormatters";
import { useQuery } from "@tanstack/react-query";
import { getPlanet } from "../../../api/services/planets";
import { useTheme } from "../../../context/ThemeContext";
import { getSpecie } from "../../../api/services/species";
import { Planet } from "../../../api/models/Planet";
import { Specie } from "../../../api/models/Species";

interface CharacterDetailProps {
  character: Character;
  loading?: boolean;
}

const CharacterDetail = ({ character, loading }: CharacterDetailProps) => {
  const { width } = useWindowDimensions();
  const { mode } = useTheme();

  const { data: homeworld, isLoading: homeworldLoading } = useQuery<Planet>({
    queryKey: ["homeworld", character?.homeworld],
    queryFn: () => getPlanet(character?.homeworld.match(/\d+/)?.[0]!),
  });

  const { data: species, isLoading: speciesLoading } = useQuery<Specie[]>({
    queryKey: ["species", character?.species],
    queryFn: () =>
      Promise.all(
        character?.species.map((species) =>
          getSpecie(species.match(/\d+/)?.[0]!)
        )
      ),
  });

  const homeworldName = homeworld?.name;
  const speciesNames = species?.map((species) => species.name).join(", ");
  return (
    <CharacterDetailCard
      title={<CharacterDetailTitle characterName={character?.name} />}
      extra={
        <BackButton to="/characters" mode={mode}>
          Back
        </BackButton>
      }
      loading={loading}
    >
      <Row gutter={[16, 16]}>
        {/*  */}
        <Col span={18} xs={24} sm={24} md={18} lg={18} xl={18}>
          <Descriptions
            bordered
            size="small"
            column={1}
            layout={width > 768 ? "horizontal" : "vertical"}
          >
            <Descriptions.Item label="Birth Year">
              {formatBirthYear(character?.birth_year)}
            </Descriptions.Item>
            <Descriptions.Item label="Homeworld">
              {homeworldLoading ? <Skeleton /> : homeworldName}
            </Descriptions.Item>
            <Descriptions.Item label="Species">
              {speciesLoading ? <Skeleton /> : speciesNames || "Human"}
            </Descriptions.Item>
            <Descriptions.Item label="Height">
              {formatHeight(character?.height)}
            </Descriptions.Item>
            <Descriptions.Item label="Mass">
              {formatMass(character?.mass)}
            </Descriptions.Item>
            <Descriptions.Item label="Eye Color">
              {capitalizeFirstLetter(character?.eye_color)}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {capitalizeFirstLetter(character?.gender)}
            </Descriptions.Item>
            <Descriptions.Item label="Hair Color">
              {capitalizeFirstLetter(character?.hair_color)}
            </Descriptions.Item>
            <Descriptions.Item label="Skin Color">
              {capitalizeFirstLetter(character?.skin_color)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </CharacterDetailCard>
  );
};

export default CharacterDetail;
