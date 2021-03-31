import './App.css';
import {useState, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Services from './services.js';

function App() {
  const [filterList, setFilterList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("");
  const [listDirection, setListDirection] = useState(true);

  function handleSort(mode) {
    if (sortMode === mode) {
      setListDirection(!listDirection);
    } else {
      setSortMode(mode)
    }
  }
  useEffect(() => {
    Services.getContactList(query, sortMode, listDirection).then(
      (res) => {
        setFilterList(res)
      }
    );
  }, [query, sortMode, listDirection])
  

  var contacts = []
  for (var i = 0; i < filterList.length; i++) {
    contacts.push(
      <Link className="search-item" 
          key={filterList[i].id} 
          to={`/${filterList[i].id}`}> 
        {filterList[i].name}
      </Link>
    );
  }
  return (
    <div className="flex-container">
      <section className="border">
      </section>
      <section className="aside">
        <h2>All contacts</h2>
        <div className="search">
          <input value={query} 
                placeholder="Search name, username, email, street, city" 
                onChange={e => setQuery(e.target.value)}
          />
          <div className="sort-dropdown">
           <div className="sort-button">Sort</div>
            <div className="sort-dropdown-content">
              <div className="sort-field" onClick={() => {handleSort("name")}}>
                Name {(sortMode === "name") && "*"}
              </div>
              <div className="sort-field" onClick={() => {handleSort("username")}}>
                Username {(sortMode === "username") && "*"}
              </div>
              <div className="sort-field" onClick={() => {handleSort("email")}}>
                Email {(sortMode === "email") && "*"}
              </div>
              <div className="sort-field" onClick={() => {setListDirection(!listDirection)}}>
                {(listDirection) ? <i className="arrow up"/> : <i className="arrow down"/> }
              </div>
            </div>
          </div>
        </div>
        <br/>
        {contacts}
      </section>
      <section className="main">
        <Switch>
          <Route 
            path={`/:id`}
            children={({match}) => (
              <Contact id={match ? match.params.id : null}/>
            )}

          />
        </Switch>
      </section>
    </div>
  );
}

function Contact({id}) {
  const [contact, setContact] = useState();
  const [onDisplay, setDisplay] = useState(true);
  useEffect(() => {
    Services.getContactByID(id).then(
      (res) => {
        setContact(res)
        setDisplay(true)
      }
    )
  }, [id]);

  return (
    <div>
        {contact && onDisplay && <div className="main-item">
          <div className="main-item-close">
            <div className="close" onClick={() => {setDisplay(false)}}></div>
          </div>
          <h1 className="main-item-header">{contact["id"]}. {contact["name"]}</h1>
          <div className="main-item-text">
            <h4>Username:</h4>
            <p>{contact["username"]}</p>
            <h4>Email:</h4>
            <p><a href={`mailto: ${contact["email"]}`}>{contact["email"]}</a></p>
            <h4>Address:</h4>
            <p>{
              contact["address"].suite + ", " +
              contact["address"].street + ", " +
              contact["address"].city + " " + 
              contact["address"].zipcode
            }</p>
          </div>
        </div>}
    </div>
  );
}

export default App;
