import PropTypes from 'prop-types';

export default function Page({ children, cool }) {
  return (
    <div>
      <h2>I am a page component</h2>
      {children}
      <h2>{cool}</h2>
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};
