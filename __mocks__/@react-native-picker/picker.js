import PropTypes from "prop-types";

const MockPicker = ({ selectedValue, onValueChange, testID, children }) => {
  return (
    <select
      data-testid={testID}
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {React.Children.map(children, (child) => (
        <option value={child.props.value}>{child.props.label}</option>
      ))}
    </select>
  );
};

MockPicker.Item = ({ label, value }) => null; // Mock Picker.Item

MockPicker.propTypes = {
  selectedValue: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  testID: PropTypes.string,
  children: PropTypes.node,
};

export default MockPicker;
