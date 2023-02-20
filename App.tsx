import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function App() {
  const [repoList, setRepoList] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedValue, setSelectedValue] = useState('java');

  const fetchData = async () => {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=react-native&sort=stars&order=desc',
    );
    const data = await response.json();
    setRepoList(data.items);
    setResults(data.items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle the search query
  const handleSearch = () => {
    if (query == '') {
      fetchData();
    }else{
      fetch(`https://api.github.com/search/repositories?q=${query}`)
      .then(response => response.json())
      .then(data => setRepoList(data.items))
      .catch(error => console.error(error));

    }
   
  };
  const handleDropdown = (itemValue: any) => {
    console.log('val', itemValue);
    if (itemValue == 'create') {
      const sortValue = repoList;
      sortValue.sort(function (a: any, b: any) {
        var c: any = new Date(a.created_at);
        var d: any = new Date(b.created_at);
        return d - c;
      });
      setRepoList(sortValue);
    } else if (itemValue == 'update') {
      const sortUpdate = repoList;
      sortUpdate.sort(function (a: any, b: any) {
        var c: any = new Date(a.updated_at);
        var d: any = new Date(b.updated_at);
        return d - c;
      });
      setRepoList(sortUpdate);
    } else if (itemValue == 'watch') {
      const sortUpdate = repoList;
      sortUpdate.sort(function (a: any, b: any) {
        var c: any = parseFloat(a.watchers_count);
        var d: any = parseFloat(b.watchers_count);
        return d - c;
      });
      setRepoList(sortUpdate);
    } else if (itemValue == 'stars') {
      const sortUpdate = repoList;
      sortUpdate.sort(function (a: any, b: any) {
        var c: any = parseFloat(a.stargazers_count);
        var d: any = parseFloat(b.stargazers_count);
        return d - c;
      });
      setRepoList(sortUpdate);
    } else if (itemValue == 'score') {
      const sortUpdate = repoList;
      sortUpdate.sort(function (a: any, b: any) {
        var c: any = parseFloat(a.score);
        var d: any = parseFloat(b.score);
        return d - c;
      });
      setRepoList(sortUpdate);
    } else {
      function compare(a: any, b: any) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }

      repoList.sort(compare);
    }
    setSelectedValue(itemValue);
  };

//  console.log('repo', repoList[0].owner?.avatar_url);
  return (
    <ScrollView>
      <View>
        <Text style={{textAlign: 'center', margin: '5%' , color : "black" , fontSize : 20}}>
          Top React Native Repositories
        </Text>
        <View>
          <TextInput
            value={query}
            onChangeText={text => {
              setQuery(text);
              handleSearch();
            }}
            onSubmitEditing={handleSearch}
            placeholder="Search repositories..."
            style={{
              margin: '5%',
              backgroundColor: 'white',
              opacity: 0.8,
              padding: 10,
            }}
          />
        </View>

        <View style={{width: 350, marginLeft: 20, backgroundColor: 'yellow'}}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => handleDropdown(itemValue)}>
            <Picker.Item label="Stars" value="stars" />
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Watchers Count" value="watch" />
            <Picker.Item label="Score" value="score" />
            <Picker.Item label="Created At" value="create" />
            <Picker.Item label="Updated At" value="update" />
          </Picker>
        </View>

        <View>
          {repoList && (
            <FlatList
              data={repoList}
              renderItem={(repo: any) => {
                console.log("repojhkhk" , repo.item.owner.avatar_url);
                return (
                  <View key={repo.id} style={styles.box}>
                   
                      <Image
                      style={styles.img}
                        source={repo.item.owner.avatar_url ? repo.item.owner.avatar_url : 'https://i.postimg.cc/s21L0y1G/planify-icon.png'}
                
                      />
    
                    <Text style={{color: 'red'}}>{repo?.item?.name}</Text>
                    <Text>{repo?.item?.description}</Text>
                    <Text>Stars: {repo?.item?.stargazers_count}</Text>
                    <Text>Language: {repo?.item.language == null ? "NA" : repo?.item.language }</Text>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  box: {
    width: 350,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
    padding: 15,
    textAlign: 'justify',
  },
  img :{
    height : 50 ,
   width : 100
  }
});

export default App;
