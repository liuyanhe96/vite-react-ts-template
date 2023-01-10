// import * as React from "react"; 在vite.config.ts中已经被import
// 导入所以react-icons
import classnames from "classnames";
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

const customCache = new Set<string>();

export interface IIconProps {
  type?: keyof typeof IconTypeMap; // 这里的type不能随便去取；这里它是指定导入react-icons那一个图标库；ex：fa/bs
  color?: string;
  size?: number | string;
  class?: string;
  style?: React.CSSProperties;
  attr?: { [key: string]: string }; // 传递过来的属性
  title?: string;
  icon?: string; // 用户现在要去使用是那个icon
  custom?: boolean; // 此参数是标志位 来判断当前用户是否使用自定义的icon
  url?: string; // 自定义icon的url 代表icon-Font的路径
  prefix?: string; // 用户可能在icon-font那里使用的不是iconFont的class 而是自定义的class
}

function isValidCustomScriptUrl(url: string): boolean {
  return Boolean(url.length && !customCache.has(url));
}

// 加载css func
function loadUrl(url: string): void {
  // 加载url 相当于在页面上添加link
  if (isValidCustomScriptUrl(url)) {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    // 把url添加到本地缓存里面
    customCache.add(url);
    // 把link添加到页面上来
    document.body.appendChild(link);
  }
}

// 不建议下面的定义Icon的写法 因为Icon上面没有任何类型上面的束缚；没有children是可以的 但是有children就不合适了
export default function Icon(props: IIconProps) {
  // 1. 判断custom、URL属性; 注意 url是否满足网址的正则  ----> Icon.propTypes Url
  // 2. 存储url --> 加载link -> 加载对应的css文件  ----> 使用set集合 customCache，为了防止url由不同的icon添加到icon组件里面时产生重复
  // 3. 根据custom 添加返回i标签 -> 再class & prefix & icon 组成整个i标签的属性 ----> loadUrl
  console.log(props);

  const {
    icon,
    type,
    custom,
    url,
    class: cls,
    prefix,
    size,
    color,
    style,
    ...reset
  } = props;

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
    return <Item {...reset}></Item>;
  } else if (custom && url) {
    // 自定义到icon-font
    loadUrl(url);
    const iconCls = classnames(
      "iconfont",
      prefix ? `${prefix}-${icon}` : `iconfont-${icon}`
    );
    // 先判断用户是否设置class属性，设置了就直接使用； 再判断是否用户设置了prefix属性
    const classes = cls ? cls : iconCls;
    // color size, style... 等属性
    const iconProp = {
      style: {
        fontSize: size,
        color,
        ...style,
      },
      ...reset,
    };
    return <i className={classes} {...iconProp}></i>;
  }
  //
  // return <FA.FaApple></FA.FaApple>;
  // 默认return空标签
  return <></>;
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
  url: function (props: IIconProps, propName: string, componentName: string) {
    if (props.url && props.custom) {
      const regUrl =
        // 判断是否是阿里云那边的icon-font的url正则
        /^(\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
      if (!regUrl.test(props.url)) {
        return new Error(
          "Invalid IconFont URL supplied to" +
            " `" +
            componentName +
            "`. Validation failed."
        );
      }
    }
  },
};
