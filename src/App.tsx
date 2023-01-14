import { AutoComplete, Button, Icon, Input, Menu } from "./components";

export default function App() {
  return (
    <main className="semi-always-light">
      <h3>SubMenu组件</h3>
      <div style={{ width: "260px" }}>
        <Menu
          className={"test"}
          defaultIndex="2-0"
          mode="vertical"
          defaultOpenKeys={["2"]}
          onSelect={val => console.log(val)}
        >
          <Menu.Item>首页</Menu.Item>
          <Menu.Item disabled>禁止菜单</Menu.Item>
          <Menu.SubMenu title="子菜单标题">
            <Menu.Item>选项一</Menu.Item>
            <Menu.Item>选项二</Menu.Item>
            <Menu.Item>选项三</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>关于页面</Menu.Item>
          <Menu.Item>菜单子项</Menu.Item>
        </Menu>
      </div>

      {/*<h3>Menu 组件</h3>*/}
      {/*<Menu*/}
      {/*  className={"test"}*/}
      {/*  mode="vertical"*/}
      {/*  onSelect={val => console.log(val)}*/}
      {/*>*/}
      {/*  <Menu.Item>1</Menu.Item>*/}
      {/*  <Menu.Item>2</Menu.Item>*/}
      {/*  <Menu.Item disabled>3</Menu.Item>*/}
      {/*  <Menu.Item>4</Menu.Item>*/}
      {/*</Menu>*/}

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
      <hr />
      <h3>Input组件示例</h3>
      <Input placeholder="test input"></Input>
      <h3>Input Size示例</h3>
      <Input placeholder="default input" size="default"></Input>
      <Input placeholder="large input" size="large"></Input>
      <Input placeholder="small input" size="small"></Input>
      <h3>Input Addon 示例</h3>
      <Input
        addonBefore="http://"
        addonAfter=".com"
        placeholder="请输入网址域名"
      ></Input>
      <Input addonBefore="http://" placeholder="请输入网址域名"></Input>
      <Input addonAfter=".com" placeholder="请输入网址域名"></Input>
      <h3>Input prefix suffix</h3>
      <Input
        prefix={<Icon type="bs" icon="BsFillBadge8KFill" color="blue"></Icon>}
        placeholder="prefix"
      ></Input>
      <Input
        suffix={<Icon type="bs" icon="BsFillBadge8KFill" color="red"></Icon>}
        placeholder="suffix"
        allowClear
      ></Input>
      <Input
        prefix={<Icon type="bs" icon="BsFillBadge8KFill" color="blue"></Icon>}
        suffix={<Icon type="bs" icon="BsFillBadge8KFill" color="red"></Icon>}
        placeholder="prefix && suffix"
      ></Input>
      <h3>Input disabled</h3>
      <Input disabled placeholder="disabled"></Input>

      <h3>AutoComplete</h3>
      {/*<AutoComplete*/}
      {/*  options={["ha", "aaa", "hahahah", "abab"]}*/}
      {/*  placeholder="test AutoComplete"*/}
      {/*></AutoComplete>*/}
      <AutoComplete
        options={[
          { label: "aaa", value: "111", id: "1" },
          { label: "bbb", value: "222", id: "2" },
          { label: "ccc", value: "333", id: "3" },
          { label: "abc", value: "123", id: "4" },
          { label: "bec", value: "444", id: "5" },
        ]}
        placeholder="test AutoComplete"
        onSelect={val => console.log(val)}
      ></AutoComplete>
      <AutoComplete
        placeholder="test AutoComplete disabled"
        disabled
      ></AutoComplete>
      <AutoComplete
        placeholder="custom filter"
        options={["1", "2", "3", "4", "5", "6"]}
        filterOptions={(input, options) => options > input}
        autoFocus
      ></AutoComplete>
      <AutoComplete
        placeholder="render test"
        options={["1", "2", "3", "4", "5", "6"]}
        filterOptions={(input, options) => options > input}
        render={item => <h3>{item}</h3>}
      ></AutoComplete>
      <p> ----- </p>
      <p> ----- </p>
      <p> ----- </p>
      <p> ----- </p>
      <p> ----- </p>
      <p> ----- </p>
    </main>
  );
}
