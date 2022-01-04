import "./App.css";

function Header() {
  return (
    <header>
      <h1>
        <a href="index.html">React</a>
      </h1>
    </header>
  );
}
function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <a href="1.html">html</a>
        </li>
        <li>
          <a href="2.html">css</a>
        </li>
        <li>
          <a href="3.html">js</a>
        </li>
      </ol>
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
  return (
    <>
      <Header />
      <Nav />
      <Article title="Welcome" body="Hello,React" />
    </>
  );
}

export default App;
