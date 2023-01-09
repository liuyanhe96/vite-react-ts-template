// import * as React from "react"; 在vite.config.ts中已经被import
// 导入所以react-icons
import PropTypes from "prop-types";
import * as AI from "react-icons/ai";
import * as BI from "react-icons/bi";
import * as BS from "react-icons/bs";
import * as CG from "react-icons/cg";
import * as DI from "react-icons/di";
import * as FA from "react-icons/fa";
import * as FC from "react-icons/fc";
import * as FI from "react-icons/fi";
import * as GI from "react-icons/gi";
import * as Go from "react-icons/go";
import * as GR from "react-icons/gr";
import * as HI from "react-icons/hi";
import * as IM from "react-icons/im";
import * as IO from "react-icons/io";
import * as IO5 from "react-icons/io5";
import * as MD from "react-icons/md";
import * as RI from "react-icons/ri";
import * as SI from "react-icons/si";
import * as TI from "react-icons/ti";
import * as VSC from "react-icons/vsc";
import * as WI from "react-icons/wi";

const IconTypeMap: { [key: string]: any } = {
  ai: AI,
  bi: BI,
  bs: BS,
  cg: CG,
  di: DI,
  fa: FA,
  fc: FC,
  fi: FI,
  gi: GI,
  go: Go,
  gr: GR,
  hi: HI,
  im: IM,
  io: IO,
  io5: IO5,
  md: MD,
  ri: RI,
  si: SI,
  ti: TI,
  vsc: VSC,
  wi: WI,
};

export interface IIconProps {
  type?: keyof typeof IconTypeMap; // 这里的type不能随便去取；这里它是指定导入react-icons那一个图标库；ex：fa/bs
  color?: string;
  size?: number | string;
  class?: string;
  style?: React.CSSProperties;
  attr?: { [key: string]: string }; // 传递过来的属性
  title?: string;
  icon?: string; // 用户现在要去使用是那个icon
  custom?: boolean;
}

export default function Icon(props: IIconProps) {
  console.log(props);
  const { icon, type, ...reset } = props;
  let Item;
  if (icon && type) {
    // 不能确定传递过来的icon一定满足于特定库支持的参数；数组越界的问题！！
    // 解决：
    // 1. 获取对应type的模块 -> icons; IconTypeMap[type]
    // 2. 判断type，icon是否合法 -> 合法就是能否去取到对应模块下的特定icon
    // if (!Object.keys(IconTypeMap[type]).includes(icon)) {
    //   // 这里模拟的是react中有名的库prop-types；有些不能通过ts静态类型检查方式去查验错误时，就可以通过程序的方式来解决
    //   console.error("传入的参数异常");
    // }
    Item = IconTypeMap[type][icon]; // 还需要给上面IconTypeMap指定ts类型 否则报错
  }
  return <Item {...reset}></Item>;
  //
  // return <FA.FaApple></FA.FaApple>;
}

Icon.propTypes = {
  // 2. 判断type，icon是否合法 -> 合法就是能否去取到对应模块下的特定icon
  icon: function (props: IIconProps, propName: string, componentName: string) {
    let keys = [];
    if (props.type && props.icon) {
      keys = Object.keys(IconTypeMap[props.type]);
      if (!keys.includes(props.icon)) {
        return new Error(
          "Invalid prop `" +
            propName +
            "` supplied to" +
            " `" +
            componentName +
            "`. Validation failed."
        );
      }
    }
  },
};
