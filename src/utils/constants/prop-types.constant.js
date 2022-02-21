import PropTypes from "prop-types";

export const notePropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  isDeleted: PropTypes.bool,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  color: PropTypes.shape({
    lightColor: PropTypes.string,
    darkColor: PropTypes.string,
  }),
});

export const labelPropType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })
);
