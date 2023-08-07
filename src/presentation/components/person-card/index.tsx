import { Person } from "../../../domain/entities/Person";
import { formatMoney } from "../../../util/money";
import Theme from "../../theme";
import { Column, Row } from "../flex";
import { TextBody2, TextH3 } from "../typography";

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Column
      padding={Theme.spacing.sm}
      gap={Theme.spacing.xs}
      borderRadius={8}
      borderColor={Theme.colors["dark-gray"]}
      borderWidth={1}
    >
      <Row>
        <TextH3>{person.name}</TextH3>
      </Row>
      <Column gap={Theme.spacing.xxs}>
        <Row>
          <TextBody2>{person.phone}</TextBody2>
        </Row>
        <Row>
          <TextBody2>{formatMoney(person.salary)}</TextBody2>
        </Row>
      </Column>
    </Column>
  );
};

export default PersonCard;
