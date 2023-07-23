import { Image, StyleSheet, Text, View } from 'react-native';

function Avatar() {
  return (
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source = {{uri:"https://c-ssl.duitang.com/uploads/blog/202209/22/20220922161509_12ec4.jpeg"}} />
    </View>
  )
}

function MyCustomComponent({ children }) {
    return (<View style={{ backgroundColor:'red'}}>{children}
    </View>)
}
function Header({ username }) {
  return (
    <MyCustomComponent style={styles.headerContainer}>
      <Avatar />
      <Text>{username}</Text>
    </MyCustomComponent>
  );
}

export function Post(props) {
    const { username, image } = props;
    return (
        <View style={styles.postContainer}>
        <Header username={username} />
        <Image 
            style={styles.postImage}
            source={{uri: image }}/>
        </View>
    );
}
export default function App() {
  return (
    <View style={styles.container}>
      <Post username="lexi" image="https://c-ssl.duitang.com/uploads/blog/202209/22/20220922161510_c4b05.jpeg"/>
      <Post username="xuehan" image="https://c-ssl.duitang.com/uploads/blog/202209/22/20220922161509_12ec4.jpeg"/>
      <Post username="trytry" image="https://c-ssl.duitang.com/uploads/blog/202211/19/20221119191026_16bbc.jpg"/>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar:{
    width: 32,
    height: 32,
    borderRadius: 100/2,
    marginRight:5,
    borderColor:'red',
    borderWidth:1,
  },
  headerContainer:{
    flexDirection:'row',
    alighItems:'center',
  },
  postContainer:{
    backgroundColor:'grey'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  postImage:{
    width:200,
    height:200,
  }
});
