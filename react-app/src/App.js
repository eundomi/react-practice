import "./App.css";
import { useState } from "react";
import {
  Link,
  Routes,
  Route,
  useParams,
  useNavigate,
  Router,
} from "react-router-dom";

function Header(props) {
  return (
    <header>
      <h1>
        <Link to="/">{props.title}</Link>
      </h1>
    </header>
  );
}
function Nav(props) {
  let lis = [];

  for (let i = 0; i < props.data.length; i = i + 1) {
    lis.push(
      <li key={props.data[i].id}>
        <Link to={"/read/" + props.data[i].id}>{props.data[i].title}</Link>
      </li>
    );
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
function Create(props) {
  function submitHandler(evt) {
    evt.preventDefault();
    let title = evt.target.title.value;
    let body = evt.target.body.value;
    props.onSubmit(title, body);
  }
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </article>
  );
}
function Update(props) {
  const params = useParams();
  const id = Number(params.id);
  const topics = props.topics;
  let _title = null;
  let _body = null;
  for (let i = 0; i < topics.length; i++) {
    if (topics[i].id === id) {
      _title = topics[i].title;
      _body = topics[i].body;
    }
  }

  const [title, setTitle] = useState(_title);
  const [body, setBody] = useState(_body);
  function submitHandler(evt) {
    evt.preventDefault();
    let title = evt.target.title.value;
    let body = evt.target.body.value;
    props.onSubmit(id, title, body);
  }
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(evt) => {
              setTitle(evt.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(evt) => {
              setBody(evt.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </article>
  );
}
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState("");
  const [nextId, setNextId] = useState(4);
  const navigate = useNavigate();
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);
  function changeModeHandler(_mode, _id) {
    if (_mode === "DELETE") {
      let newTopics = [];
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].id !== id) {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode("WELCOME");
      return;
    }
    setMode(_mode);
    setId(_id);
  }
  /*
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
    articleTag = (
      <Create
        onSubmit={(_title, _body) => {
          let newTopic = { id: nextId, title: _title, body: _body };
          let newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title = null;
    let body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    console.log("title : ", title);
    articleTag = (
      <Update
        title={title}
        body={body}
        onSubmit={(title, body) => {
          let newTopics = [...topics];
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i].title = title;
              newTopics[i].body = body;
            }
          }
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
        }}
      ></Update>
    );
  }
  */

  return (
    <>
      <Header title="WEB" onChangeMode={changeModeHandler} />
      <Nav data={topics} onChangeMode={changeModeHandler} />
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, React!" />}
        ></Route>
        <Route path="/read/:id" element={<Read topics={topics}></Read>}></Route>
        <Route
          path="/create"
          element={
            <Create
              onSubmit={(_title, _body) => {
                let newTopic = { id: nextId, title: _title, body: _body };
                let newTopics = [...topics];
                newTopics.push(newTopic);
                setTopics(newTopics);
                // setMode("READ");
                // setId(nextId);
                navigate("/read/" + nextId);
                setNextId(nextId + 1);
              }}
            ></Create>
          }
        ></Route>
        <Route
          path="/update/:id"
          element={
            <Update
              topics={topics}
              onSubmit={(id, title, body) => {
                let newTopics = [...topics];
                for (let i = 0; i < newTopics.length; i++) {
                  if (newTopics[i].id === id) {
                    newTopics[i].title = title;
                    newTopics[i].body = body;
                  }
                }
                setTopics(newTopics);
                navigate("/read/" + id);
              }}
            ></Update>
          }
        ></Route>
      </Routes>

      <Routes>
        <Route
          path="/"
          element={<Control onChangeMode={changeModeHandler} />}
        ></Route>
        <Route
          path="/read/:id"
          element={<Control onChangeMode={changeModeHandler} />}
        ></Route>
      </Routes>
    </>
  );
}
function Read(props) {
  const params = useParams();
  const id = Number(params.id);
  const topics = props.topics;
  let title = null;
  let body = null;
  for (let i = 0; i < topics.length; i++) {
    if (topics[i].id === id) {
      title = topics[i].title;
      body = topics[i].body;
    }
  }
  return <Article title={title} body={body} />;
}
function Control(props) {
  const params = useParams();
  const selectedId = Number(params.id);
  let contextUI = null;
  if (selectedId > 0) {
    contextUI = (
      <>
        <li>
          <Link to={"/update/" + selectedId}>update</Link>
        </li>
        <li>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              props.onChangeMode("DELETE");
            }}
          >
            <input type="submit" value="delete" />
          </form>
        </li>
      </>
    );
  }

  return (
    <ul>
      <li>
        <Link to="/create">create</Link>
      </li>
      {contextUI}
    </ul>
  );
}

export default App;
