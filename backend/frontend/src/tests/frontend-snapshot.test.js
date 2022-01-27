import React from "react";
import renderer from "react-test-renderer";
import Search from "../components/Search.js";

describe("snapshot for Search component", () => {
	test("frontend snapshot", () => {
		/* converts the code inside of the Search component to a json format 
    and is stored as a snapshot inside the project directory */
		const renderedComponent = renderer.create(<Search />).toJSON();
		/* tests to see if the snapshot stored inside the project directory matches 
		with the snapshot taken during the test */
		expect(renderedComponent).toMatchSnapshot();
	});
});

/* references: 

my own work from level 2 task 15

https://www.youtube.com/watch?v=qOaGoujjc3M&ab_channel=SoftwareTestingHelp
 
*/
