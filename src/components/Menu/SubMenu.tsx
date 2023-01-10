import classnames from "classnames";
import { Children, cloneElement, useContext, useState } from "react";

import { MenuContext } from "@/components/Menu/index";
import { IMenuItemProps } from "@/components/Menu/MenuItem";

export interface ISubMenuProps {
  index?: string;
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
  // 父index-子index-子子index....
  const classes = classnames("menu-item submenu-item", cls, {
    // 第一个参数是给定基础的类
    open: open,
    // 和先前MenuItem中的active是一样的, 获取当前index
    active: index === current || index.split("-")[0] === current,
    vertical: mode === "vertical",
  });

  // 点击菜单事件处理
  const clickHandle =
    mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(!open);
          },
        }
      : {};

  // 鼠标hover事件处理
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

  const renderChildren = () => {
    // 1. 从父组件 遍历children 以便拿到对应的index  ---> 借助React辅助函数 React.Children.map
    return Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      if (
        // 根据displayName来判断当前加的Menu下面的children组件里面是否有其他不是Menu和SubMenu的组件
        (childElement.type && childElement.type.displayName === "MenuItem") ||
        childElement.type.displayName === "SubMenu"
      ) {
        // 2. 遍历出来的children Item 添加index props ----> 借助React辅助函数 React.cloneElement可以复制出来元素 并且添加对应的props
        return cloneElement(childElement, {
          index: current + "-" + index, // current是从父级菜单传过来的index：current
        });
      } else {
        console.error(
          "Menu Item Must has one MenuItem or SubMenu Component!!!!!!!!!!!"
        );
      }
    });
  };

  return (
    <li className={classes} {...hoverHandle}>
      <div className="submenu-title" {...clickHandle}>
        {title}
      </div>
      {/*<ul className="submenu">{children}</ul>*/}
      <ul className="submenu">{renderChildren()}</ul>
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
