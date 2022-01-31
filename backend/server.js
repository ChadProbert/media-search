const express = require("express");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reverts the origin back to local port 3000
/* the origin had changed to https://media-search-application.herokuapp.com/
after deploying */
let corsConfig = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
	methods: "GET, PUT, POST, DELETE",
};
app.use(cors(corsConfig));

// helmet security added
/* disabled the CSP so that it would allow for inline scripts 
and inline styling */
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

// serves the files for build react app
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

// captures all the data inside of search-results.json
const searches = JSON.parse(fs.readFileSync("./config/search-results.json"));

// serves the the data found in search-results.json to /search route
app.get("/search", (req, res) => {
	res.json(searches);
});

// all other GET requests not handled will return the react app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

app.post("/searches/add", (req, res) => {
	const newSearch = Object.assign(req.body);
	// clears the search results stored inside search-results.json
	searches.length = 0;
	searches.push(newSearch);
	// writes the new array to search-results.json
	fs.writeFileSync("./config/search-results.json", JSON.stringify(searches));
	res.json(searches);
});

// added a port that can be dynamically bound to the production environment port
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Listening on PORT ${PORT}`);

/* references:

My own work from Level 2 Task 20

https://www.youtube.com/watch?v=nX7jGHgD9t8

https://expressjs.com/

https://helmetjs.github.io/

https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

https://github.com/helmetjs/helmet/issues/237

https://stackabuse.com/handling-cors-with-node-js/

*/
