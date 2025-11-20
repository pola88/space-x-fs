## React

This app is dockerize, you just need to run `yarn dev`

The exercise consists of building some missing parts on an application to view Spacex’s latest launches, and being able to add them to a “favorite” list to revisit them later. Change the REACT_APP_BASE_URL on the .env file depending on the backend url.

### Tasks

1. Go to `src > api > admin.ts > login` and connect the app with the `/admin/token` endpoint to get a fresh new JWT and save it on the AuthContext with the setToken method. `Under src > pages > Login > index.ts` you will find a gap to call that method. Once you get the token and setToken has been hit successfully the user should be redirected to the Home page.

2. At this point you should be looking at an ugly <Search/> component, let’s complete the .scss file to make it look more than [this](https://www.figma.com/file/QRhWGaLdAzle61hLRUFW3L/SpaceX?node-id=354%3A1542). Use css/scss or any framework you are confortable with.

3. Under `src > containers > LaunchesList > index.tsx` you will find the previous Search component being used, let’s give it a try and complete it with the functionality needed to make the input look for mission_name.

4. The best part of this exercise (? is about the favorite functionality. The start svg is already hitting add and remove favorite endpoints but we are not updating our local launches array. What should be the most efficient way of doing this?

## Notes

- We should update the node version for security reasons
- To improve the performance, we can move the pagination to the backend, the same for the search
