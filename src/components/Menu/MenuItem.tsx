export interface IMenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FunctionComponent<IMenuItemProps> = props => {
  const { index, className: cls, style, children } = props;
  return (
    <li className={cls} style={style}>
      {children}
    </li>
  );
};

export default MenuItem;
