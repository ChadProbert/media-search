const express = require("express");
const helmet = require("helmet");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
// server is now using helmet for security
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const searches = JSON.parse(fs.readFileSync("./config/search-results.json"));

app.get("/search", (req, res) => {
	res.json(searches);
});

app.post("/searches/add", (req, res) => {
	const newSearch = Object.assign(req.body);
	// clears the search results stored inside search-results.json
	searches.length = 0;
	// adding the new search result data to the array inside of search-results.json
	searches.push(newSearch);
	// writes the new array to search-results.json
	// converts searches from an object to json string
	fs.writeFileSync("./config/search-results.json", JSON.stringify(searches));
	res.json(searches);
});

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static('frontend/build'));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

// added a port that can be dynamically bound to the production environment port
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Listening on PORT ${PORT}`);

/* references:

My own work from Level 2 Task 20

https://www.youtube.com/watch?v=nX7jGHgD9t8

https://expressjs.com/

https://helmetjs.github.io/

https://www.youtube.com/watch?v=71wSzpLyW9k&ab_channel=TraversyMedia

*/
