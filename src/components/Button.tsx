import React from 'react';

type Props = {
  children: React.ReactChild;
  onClick: () => void;
  className?: string;
};

const Button = ({
  className,
  children,
  onClick,
}: Props): React.ReactElement => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        className ?? ''
      } flex items-center justify-center py-2 px-6 text-sm leading-normal text-white uppercase bg-blue-300 rounded-lg shadow-md outline-none hover:shadow-xl hover:bg-blue-400 transition-all duration-200 focus:outline-none focus:shadow-none`}
    >
      <span className="pt-px mt-px">{children}</span>
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
};

export default Button;
