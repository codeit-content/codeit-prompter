const Button = ({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className={`bg-transparent text-neutral-50 px-2 py-1 border-none rounded ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
