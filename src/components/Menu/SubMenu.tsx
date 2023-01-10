import classnames from "classnames";
import { useContext, useState } from "react";

import { MenuContext } from "@/components/Menu/index";

export interface ISubMenuProps {
  index?: number;
  title?: string;
  className?: string;
}

const SubMenu: React.FunctionComponent<ISubMenuProps> = props => {
  const { index: current, title, className: cls, children } = props;
  // classname 鼠标hover---> 展开
  // 鼠标click ----> 展开
  // 点击子元素时 --> 设置自元素的active
  const { index, mode, defaultOpenKeys } = useContext(MenuContext);
  // defaultOpenKeys来判断当前Submenu的index是否存在于defaultOpenKeys里面
  const isOpen = mode === "vertical" && defaultOpenKeys?.includes(current + ""); // 类型转换 否则报错
  const [open, setOpen] = useState(isOpen);
  const classes = classnames("menu-item submenu-item", cls, {
    // 第一个参数是给定基础的类
    open: open,
    active: index === current, // 和先前MenuItem中的active是一样的, 获取当前index
    vertical: mode === "vertical",
  });

  const clickHandle =
    mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(!open);
          },
        }
      : {};

  const hoverHandle =
    mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(false);
          },
        }
      : {};

  return (
    <li className={classes} {...hoverHandle}>
      <div className="submenu-title" {...clickHandle}>
        {title}
      </div>
      <ul className="submenu">{children}</ul>
    </li>
  );
};

export default SubMenu;
