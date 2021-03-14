import './App.css';
import {useState} from 'react';
import {Link, Route, Switch, useParams} from 'react-router-dom';

function App() {
  var data = require('./contacts.json');
  const [query, setQuery] = useState("");

  var filterList = data.filter( (item) => {
    var lowerCaseQuery = query.toLowerCase();
    return item.name.toLowerCase().includes(lowerCaseQuery) || 
            item.username.toLowerCase().includes(lowerCaseQuery)
  });

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
                 placeholder="Search name or username" 
                 onChange={e => setQuery(e.target.value)}
          />
        </div>
        {contacts}
      </section>
      <section className="main">
        <Switch>
          <Route path={`/:id`}>
            <Contact />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

function Contact() {
  const match = useParams();
  var data = require('./contacts.json');
  var contact = null;
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == match.id) {
      contact = data[i];
    }
  }
  return (
      <div>
          {(contact) && <div> 
            <h1 className="main-item-header">{contact["id"]}. {contact["name"]}</h1>
            <div className="main-item-text">
              <h4>Username:</h4>
              <p>{contact["username"]}</p>
              <h4>Email:</h4>
              <p>{contact["email"]}</p>
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
