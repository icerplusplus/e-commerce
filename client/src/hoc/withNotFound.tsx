interface INotFound {
  isNotFound: boolean;
}

export const withNotFound = <
  T,
  Props extends INotFound
>(
  WrappedComponent: React.FC<T>,
  withNotFoundProps: Props
) => {
  return (props: Readonly<T>) => {
    if (withNotFoundProps?.isNotFound)
      return <>Not found page</>;
    return <WrappedComponent {...props} />;
  };
};
