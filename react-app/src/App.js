import "./App.css";
import { useState } from "react";

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
      <li key={props.data[i].id}>
        <a
          href={props.data[i].id}
          data-id={props.data[i].id}
          onClick={onClickHandler}
        >
          {props.data[i].title}
        </a>
      </li>
    );
  }
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("READ", Number(evt.target.dataset.id));
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
  const [mode, setMode] = useState("WELCOME");
  let [id, setId] = useState("");

  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  function changeModeHandler(_mode, _id) {
    setMode(_mode);
    setId(_id);
  }
  let articleTag;
  if (mode === "WELCOME") {
    articleTag = <Article title="Welcome" body="Hello, React!" />;
  } else if (mode === "READ") {
    let title = null;
    let body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    articleTag = <Article title={title} body={body} />;
  } else if (mode === "CREATE") {
    articleTag = <Article title="Create" body="Hello,Create" />;
  } else if (mode === "UPDATE") {
    articleTag = <Article title="Update" body="Hello,Update" />;
  }

  return (
    <>
      <Header onChangeMode={changeModeHandler} />
      <Nav data={topics} onChangeMode={changeModeHandler} />
      {articleTag}
      <Control onChangeMode={changeModeHandler} />
    </>
  );
}
function Control(props) {
  function ClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("CREATE");
  }
  function ClickUpdateHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("UPDATE");
  }

  return (
    <ul>
      <li>
        <a href="/create" onClick={ClickHandler}>
          create
        </a>
      </li>
      <li>
        <a href="/update" onClick={ClickUpdateHandler}>
          update
        </a>
      </li>
      <li>
        <a href="/delete">delete</a>
      </li>
    </ul>
  );
}

export default App;
