import Tooltip from "antd/es/tooltip";
import { ContainerTitle, NameTitle, TooltipTitleName } from "./style";

const CharacterDetailTitle = ({ characterName }: { characterName: string }) => {
  return (
    <ContainerTitle>
      <NameTitle level={3}>{characterName}</NameTitle>
      <Tooltip
        title={`Name of ${characterName} in Aurebesh, the most spoken language in the galaxy`}
        color="#BC1E22"
        key="#BC1E22"
      >
        <TooltipTitleName level={5} type="secondary">
          {characterName}
        </TooltipTitleName>
      </Tooltip>
    </ContainerTitle>
  );
};

export default CharacterDetailTitle;
