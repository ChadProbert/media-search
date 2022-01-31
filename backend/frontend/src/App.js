import React from "react";

// components
import Menu from "./components/Menu.js";
import Search from "./components/Search.js";
import SearchResults from "./components/SearchResults.js";

// stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// rendering components
function App() {
	return (
		<div className="App">
			<Menu />
			<br />
			<Search />
			<br />
			<SearchResults />
		</div>
	);
}

export default App;
