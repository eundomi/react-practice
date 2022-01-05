import "./App.css";

function Header(props) {
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("WELCOME");
  }
  return (
    <header>
      <h1>
        <a href="index.html" onClick={onClickHandler}>
          React
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  let lis = [];

  for (let i = 0; i < props.data.length; i = i + 1) {
    lis.push(
      <li>
        <a href={props.data[i].id} onClick={onClickHandler}>
          {props.data[i].title}
        </a>
      </li>
    );
  }
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("READ");
  }

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </article>
  );
}
function App() {
  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  function changeModeHandler(mode) {
    alert(mode);
  }
  return (
    <>
      <Header onChangeMode={changeModeHandler} />
      <Nav data={topics} onChangeMode={changeModeHandler} />
      <Article title="Welcome" body="Hello,React" />
    </>
  );
}

export default App;
