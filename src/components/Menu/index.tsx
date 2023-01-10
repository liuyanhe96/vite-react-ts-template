// import * as React from "react";
import "./style.scss";

import classnames from "classnames";
// 1. 使用classnames合并menu的公共类名
// 2. 当在Menu上面触发onSelect事件 -> 设置MenuItem的active状态，这个状态是存储在Menu上面的 -> 父子状态传递
// 3. 状态管理： hooks -> useContext；或 简单的状态管理方案
import { Children, cloneElement, createContext, useState } from "react";

import { default as Item, IMenuItemProps } from "./MenuItem"; // 把MenuItem挂到Menu 在其他组件就可以使用<Menu.item>
import { default as SubMenu, ISubMenuProps } from "./SubMenu";

/*   -------------------------------- type & interface ---------------------------------------- */
type MenuMode = "horizontal" | "vertical";

// MenuType是联合类型&
type MenuType = React.FunctionComponent<IMenuProps> & {
  Item: React.FunctionComponent<IMenuItemProps>;
  SubMenu: React.FunctionComponent<ISubMenuProps>;
};
type SelectFunction = (selectedIndex: string) => void;

interface IMenuProps {
  defaultIndex?: string; // 默认被选中菜单项
  className?: string;
  mode?: MenuMode; // 菜单模式是横向还是纵向
  style?: React.CSSProperties;
  defaultOpenKeys?: string[];
  onSelect?: SelectFunction; // 用户选中后执行的回调方法
}

interface IMenuContext {
  index: string;
  onSelect?: SelectFunction;
  // 传递给SubMenu的
  mode?: string;
  defaultOpenKeys?: string[];
}

/*   -------------------------------- Code ---------------------------------------- */

// 去子组件中是useContext来获取对应的value属性，这里要export 才可以在其他组件中拿到！！
export const MenuContext = createContext<IMenuContext>({ index: "0" });

// children是在React.FunctionComponent中定义
const Menu: MenuType = props => {
  const {
    className: cls,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenKeys,
  } = props;

  const classes = classnames("menu", cls, {
    vertical: mode === "vertical",
  });

  const [current, setCurrent] = useState(defaultIndex);
  const handleClick = (index: string) => {
    setCurrent(index);
    if (onSelect) {
      // 如果用户设置了onSelect方法 就需要执行onSelect回调
      onSelect(index); // 把index传递出去
    }
  };
  // 设置要传递的val
  const value: IMenuContext = {
    index: current ? current : "0",
    onSelect: handleClick,
    // 传递给SubMenu的
    mode,
    defaultOpenKeys,
  };

  const renderChildren = () => {
    // 1. 从父组件 遍历children 以便拿到对应的index  ---> 借助React辅助函数 React.Children.map
    return Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      // console.log("childElement", childElement);
      if (
        // 根据displayName来判断当前加的Menu下面的children组件里面是否有其他不是Menu和SubMenu的组件
        (childElement.type && childElement.type.displayName === "MenuItem") ||
        childElement.type.displayName === "SubMenu"
      ) {
        // 2. 遍历出来的children Item 添加index props ----> 借助React辅助函数 React.cloneElement可以复制出来元素 并且添加对应的props
        return cloneElement(childElement, {
          index: index + "",
        });
      } else {
        console.error(
          "Menu Item Must has one MenuItem or SubMenu Component!!!!!!!!!!!"
        );
      }
    });
  };

  return (
    // 需要去掉index属性：1. 不方便手动设置 不方便与defaultOpenKeys string数组进行匹配 2. 可能会重复
    // 考虑树形数据的唯一标识的机制：父index - 子index -子子index....；这样可以非常确切知道当前item属于那个层级
    // 和 确切知道当前子item所处位置！！ ---> 设置子组件的index：string
    // 1. 从父组件 遍历children 以便拿到对应的index  ---> 借助React辅助函数 React.Children.map
    // 2. 遍历出来的children Item 添加index props ----> 借助React辅助函数 React.cloneElement可以复制出来元素 并且添加对应的props
    <div>
      <ul className={classes} style={style}>
        {/*<MenuContext.Provider value={value}>{children}</MenuContext.Provider>*/}
        <MenuContext.Provider value={value}>
          {renderChildren()}
        </MenuContext.Provider>
      </ul>
      <div>current: {current}</div>
    </div>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenKeys: [],
};

// TODO PropType ---> 对设置的defaultIndex 等 进行校验

// 把MenuItem挂到Menu属性上去 在其他组件就可以使用<Menu.item>
Menu.Item = Item; // Item: React.FunctionComponent<IMenuItemProps>;
// SubMenu挂到Menu上去
Menu.SubMenu = SubMenu;

export default Menu;
