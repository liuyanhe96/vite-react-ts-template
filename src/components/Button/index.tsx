// PureComponent or Function Component ?
//  Function Component  ---> hooks 推荐！
// PureComponent  ---> 没有shouldComponent方法； 它的更新主要靠props发生变化去更新
// import './Button.scss'
import classNames from "classnames";

export type ButtonSize = "large" | "small" | "default";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  type?: ButtonType; //BaseHTMLAttributes和AnchorHTMLAttributes里面都有type类型；所需要把它俩中的type排除在外的，否则和这个type冲突
  href?: string;
  children: React.ReactNode;
}
// Object.assign 可以合并多个对象、将多个对象的属性添加到一个对象中并返回
// 拿到原生button上面的类型 传递的是泛型
// &叫做交叉类型、｜叫做联合类型
type NativeButtonProps = Omit<React.BaseHTMLAttributes<HTMLElement>, "type"> & // Omit把type去掉
  IButtonProps; // 实际是与IButtonProps类型的合集！
// 定义a链接
type AnchButtonProps = Omit<React.AnchorHTMLAttributes<HTMLElement>, "type"> &
  IButtonProps;

// 这里使用的button有可能NativeButtonProps也有可能是AnchButtonProps（a链接）；所以需要定义一个新类型
// 但一个btn不可能既有原声button属性又有a链接上的属性；所以需要使用ts中的关键字Partial;
// Partial是代表后面的两个组成出来的ts类型是可选类型 类似于interface中的？ 代表所有类型都是可选的类型
export type ButtonProps = Partial<NativeButtonProps & AnchButtonProps>;

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { className, disabled, loading, size, type, href, children, ...rest } =
    props;

  // 这个库帮助合并不同分类下面的类名；根据传递进来的参数组合出来不同的类名，以便形成出来不同的a链接或btn的样式
  const classes = classNames("btn", className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === "link" && disabled,
    loading: loading, // 设置后div class上就显示loading
  });

  if (type === "link" && href) {
    // type为link的情况下
    return (
      // ...rest是a链接上可以会有些其他的属性；把其他属性放到a链接上来
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  } else {
    // button情况下
    return (
      <button disabled={disabled} className={classes} {...rest}>
        {loading && (
          <span className="pr-1">
            <i className="fas fa-spinner pin"></i>
          </span>
        )}
        {children}
      </button>
    );
  }
};

export default Button;
