## [Gardening App](https://gardening-client.herokuapp.com/)


### Tech Stack:
<dl>
  <dt>Node</dt>
  <dd>Backend core for the code</dd>
  <dt>Mongo/Mongoose/Express</dt>
  <dd>Backend database link. Mongo structured the database, mongoose allowed it to interact with node, and express helped to simplify the code</dd>
  <dt>React/Redux</dt>
  <dd>React and redux allowed for a dynamic web page that doesn't have to reload and that integrates with the backend</dd>
</dl>
 
---

_**The screen when you arrive**_
![ScreenShot](src/images/first-screen.png)

_**Either create a new garden, or use "Imus Garden" to see a filled out garden**_
![ScreenShot](src/images/first-screen-garden.png)

_**When you click on a plot widget you will see an expanded view**_
![ScreenShot](src/images/garden-expanded.png)

_**The expanded view of the plot when it is clicked on.  You can click on the plot name to change it**_
![ScreenShot](src/images/plot-expanded.png)

_**When you click on a vegetable widget, a modal will pop up that allows you to edit the vegetable**_
![ScreenShot](src/images/edit-veggie.png)

---

###### The github for the server is [here](https://github.com/imussg/gardening-app-server). The server is structured via its folders with the models structuring the garden, plot, and veggie objects for mongoose, and the routers to handle and organize REST API calls.
###### The client is broken down into its components, actions, and reducers.  The redux store allows all of the state's values to be accessible and mutable throughout the components, the actions handle and delineate the various tasks that happen within the app, and the reducer centralizes how the state will change given various actions that occur.

---

##### Enjoy the app and happy gardening!  feel free to contact me @ imussg@gmail.com
