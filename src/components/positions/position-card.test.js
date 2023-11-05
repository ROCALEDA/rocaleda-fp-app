import { render } from "@testing-library/react-native";
import PositionCard from "./position-card";

describe("PositionCard", () => {
  const mockPosition = {
    open_position: {
      candidate_id: 22,
      id: 1,
      is_open: false,
      position_name: "Desarrollador Frontend",
      project_id: 1,
    },
    project: {
      customer_id: 13,
      description: "Descripción Proyecto prueba",
      id: 1,
      is_team_complete: true,
      name: "Proyecto prueba",
    },
    soft_skill_ids: [1, 2],
    technology_ids: [1, 1],
  };

  it("renders the position information correctly", () => {
    const { getByText } = render(<PositionCard position={mockPosition} />);

    expect(getByText(mockPosition.open_position.position_name)).toBeTruthy();
  });
});
