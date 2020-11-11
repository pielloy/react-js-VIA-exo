import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, StyleSheet  } from 'react-native';

class ArmorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('https://mhw-db.com/armor/sets')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={{alignSelf: "center", flexDirection: "row"}}>
                <Image
                    style={styles.logo}
                    source={{uri: item.pieces[0].assets.imageMale}}
                />
                <Text>
                  {item.rank}, {item.name}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    logo: {
      width: 66,
      height: 58,
    },
    container: {
      margin: 2,
      backgroundColor: '#D3D3D3',
      borderRadius: 6,
    },
});

export default ArmorDisplay;