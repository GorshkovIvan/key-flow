import classNames from 'classnames';
export function Button({
  className,
  isDisabled,
  children,
  ...rest
}: {
  className?: string;
  isDisabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={isDisabled}
      className={classNames(
        `
                flex items-center gap-2 px-4 py-2 rounded-lg
                ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
