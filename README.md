# dice-task

Run Project

yarn to install dependencies
yarn android to run the server.

##Screenshot
 HomeScreen 
 ![Screenshot (3)](https://user-images.githubusercontent.com/76056109/220143218-2ff7bddf-436e-4713-931a-dbdc11824ec3.png)
 
 #Code Summary
 
 This code is a React Native application that fetches data from the Github API and displays it to the user. The user can search for repositories and sort them by different criteria, such as stars or creation date.

The code starts by importing the necessary React Native components, including FlatList, Image, ScrollView, StyleSheet, Text, TextInput, and View. It also imports the Picker component from the @react-native-picker/picker library.

Next, the code defines a function component named App, which contains the state variables repoList, query, results, and selectedValue. The repoList variable will hold an array of repositories fetched from the Github API, query will hold the user's search query, results will hold the search results, and selectedValue will hold the value of the currently selected sorting criteria.

The fetchData function is then defined, which uses the fetch function to fetch data from the Github API and sets the repoList and results state variables with the data returned from the API.

The useEffect hook is then used to call the fetchData function when the component mounts.

The handleSearch function is defined next, which uses the fetch function to search for repositories based on the user's search query and sets the repoList state variable with the search results. If the user's search query is empty, the fetchData function is called to fetch the top React Native repositories.

The handleDropdown function is defined next, which sorts the repoList state variable based on the selected sorting criteria and sets the selectedValue state variable with the value of the selected sorting criteria.

Finally, the App component returns a ScrollView that contains a Text component with the title of the app, a TextInput component for the user to enter their search query, a Picker component for the user to select a sorting criteria, and a FlatList component that renders each repository as a separate box. Each box displays the repository's name, description, number of stars, and language.
