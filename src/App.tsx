import { Button } from "./components";

export default function App() {
  return (
    <main className="semi-always-light">
      <Button
        id="app"
        onClick={() => {
          console.log("btn click");
        }}
      >
        {" "}
        普通Button{" "}
      </Button>
      <Button href="https://www.baidu.com" target="blank" type="link">
        {" "}
        链接Button{" "}
      </Button>
    </main>
  );
}
