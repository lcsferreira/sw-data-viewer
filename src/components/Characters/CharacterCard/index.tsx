import Meta from "antd/es/card/Meta";
import { Character } from "../../../api/models/Character";
import { Link } from "react-router-dom";
import {
  CharacterContainer,
  Description,
  InfoGrid,
  InfoLabel,
  InfoValue,
} from "./style";
import { useTheme } from "../../../context/ThemeContext";
import { capitalizeFirstLetter } from "../../../helpers/StringFormatters";
import {
  formatBirthYear,
  formatHeight,
  formatMass,
} from "../../../helpers/dataFormatters";

export interface CharacterCardProps {
  character: Character;
  loading: boolean;
}

const CharacterCard = ({ character, loading }: CharacterCardProps) => {
  const { mode } = useTheme();
  const id = character.url.match(/\d+/)?.[0] ?? "";
  return (
    <Link to={`/characters/${id}`}>
      <CharacterContainer key={character.url} loading={loading} hoverable>
        <Meta
          title={character.name}
          description={
            <Description type="secondary">{character.name}</Description>
          }
        />
        <InfoGrid mode={mode}>
          <InfoLabel>Birth Year</InfoLabel>
          <InfoValue>{formatBirthYear(character.birth_year)}</InfoValue>
          <InfoLabel>Gender</InfoLabel>
          <InfoValue>{capitalizeFirstLetter(character.gender)}</InfoValue>
          <InfoLabel>Height</InfoLabel>
          <InfoValue>{formatHeight(character.height)}</InfoValue>
          <InfoLabel>Mass</InfoLabel>
          <InfoValue>{formatMass(character.mass)}</InfoValue>
          <InfoLabel>Eyes</InfoLabel>
          <InfoValue>{capitalizeFirstLetter(character.eye_color)}</InfoValue>
          <InfoLabel>Hair</InfoLabel>
          <InfoValue>{capitalizeFirstLetter(character.hair_color)}</InfoValue>
        </InfoGrid>
      </CharacterContainer>
    </Link>
  );
};

export default CharacterCard;
