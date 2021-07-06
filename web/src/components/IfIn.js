const IfIn = ({ set, value, children }) => {
  if (set.includes(value)) {
    return children;
  } else {
    return [];
  }
};

export default IfIn;
