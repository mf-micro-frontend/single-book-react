import PropTypes from "prop-types";

const Button = ({ variant = "primary", children, ...props }) => {
  const baseStyles = "px-4 py-2 focus:outline-none";
  const variantStyles =
    variant === "primary"
      ? "bg-purple-500 text-white border-white border"
      : "bg-white border border-purple-500 text-purple-500";

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
