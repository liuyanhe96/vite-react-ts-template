import { Button, Icon, Menu } from "./components";

export default function App() {
  return (
    <main className="semi-always-light">
      <h3>SubMenu组件</h3>
      <Menu
        className={"test"}
        mode="vertical"
        defaultOpenKeys={["33"]}
        onSelect={val => console.log(val)}
      >
        <Menu.Item index={0}>1</Menu.Item>
        <Menu.Item index={1}>2</Menu.Item>
        <Menu.SubMenu title="subTitle" index={33}>
          <Menu.Item index={4}>5</Menu.Item>
          <Menu.Item index={5}>6</Menu.Item>
          <Menu.Item index={6}>7</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index={2} disabled>
          3
        </Menu.Item>
        <Menu.Item index={3}>4</Menu.Item>
      </Menu>
      <h3>Menu 组件</h3>
      <Menu
        className={"test"}
        mode="vertical"
        onSelect={val => console.log(val)}
      >
        <Menu.Item index={0}>1</Menu.Item>
        <Menu.Item index={1}>2</Menu.Item>
        <Menu.Item index={2} disabled>
          3
        </Menu.Item>
        <Menu.Item index={3}>4</Menu.Item>
      </Menu>
      <h3>Icon 组件</h3>
      <Icon type="bs" icon="BsFillBadge8KFill" color="red"></Icon>
      <Icon
        custom
        url="//at.alicdn.com/t/font_1791095_6urvhbxaj73.css"
        icon="qiandao"
        size="44px"
      ></Icon>
      {/*<FaAws className="test" size="44px" color="red"></FaAws>*/}
      <h3>Button组件</h3>
      <Button
        id="app"
        disabled
        onClick={() => {
          console.log("btn click");
        }}
      >
        {" "}
        普通Button{" "}
      </Button>
      <Button size="small">Small Btn</Button>
      <Button size="large">Large Btn</Button>
      <Button type="danger">Danger Btn</Button>
      <Button type="primary" loading>
        Primary Btn
      </Button>
      <Button type="default">Default Btn</Button>
      <Button type="default" loading>
        Default Loading Btn
      </Button>
      <Button href="https://www.baidu.com" target="blank" type="link" disabled>
        disabled 链接Button
      </Button>
    </main>
  );
}
