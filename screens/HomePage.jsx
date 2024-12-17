import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { fetchPosts } from '../api/restApi';
import { useEffect, useState } from 'react'

export default function HomePage({ navigation }) {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    }

    getPosts();
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  } // kondisi ketika proses memuat response dari backend belum selesai

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  } // ketika mendapatkan response error backend

  const renderItem = ({ item }) =>(
    <View style={styles.transactionsTable}>
      <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", marginRight: 12}}></View>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: item.isPositive ? "#00A899" : "#FF3B30" },
        ]}
      >
        {item.amount}
      </Text>
    </View>

    )

  return (
    <ScrollView>
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Text style={styles.title}>{item.first_name}</Text>
          <Text style={styles.body}>{item.last_name}</Text>
          <Image
            source={{uri: item.avatar}}
            style={{ width: 200, height: 200}}
          ></Image>
        </View>
      )}
    />

      <View style={styles.container}>
        <Image source={require('../assets/pp.jpeg')} style={{width: 46, height: 46, borderRadius: 40, borderWidth: 3, borderColor: 'teal'}}></Image>
        <View style={{ marginLeft: 20}}>
          <Text style={{fontWeight: 900}}>Aneira Shafi</Text>
          <Text >Personal Account</Text>
        </View>
        <View style={{flex: 1}}>

        </View>
        <Image source={require('../assets/logomata.png')}></Image>
    </View>
    <View style={styles.welcomeHeader}>
    <View style={{width: 250}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>Good Morning, Aneira!</Text>
      <Text style={{fontSize: 16}}>Check all your incoming and outgoing transactions here</Text>
    </View>
    <View>
      <Image source={require('../assets/Group.png')}></Image>
    </View>
    </View>
    <View style={styles.accountNum}>
      <Text style={{color: 'white', fontSize: 20}}>Account No.</Text>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>0210202</Text>
    </View>
    <View style={styles.saldo}>
      <View style= {{flex: 1}}>
        <View style={{fontSize: 14, color: '#555', marginBottom: 4}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>Balance</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Rp 100.000.000    </Text>
            <Image source={require('../assets/matasaldo.png')}></Image>
            </View>
        </View>
      </View>
      <View style={{height: '38.65px'}}>
        <TouchableOpacity  onPress={() => navigation.navigate('TopUp')}>
          <Image source={require('../assets/tombolplus.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Transfer')}>
          <Image source={require('../assets/tombolkirim.png')}></Image>
        </TouchableOpacity>
      </View>
    </View>
    <View style={{flex: 1, backgroundColor: '#F9F9F9', padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 12, backgroundColor: 'white', padding: 30}}>
        Transaction History
      </Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 16}}

      ></FlatList>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 40,
    flexDirection: 'row', 
    elevation: 3,
    paddingHorizontal: 20, 
    display: 'flex', 
    height: 80, 
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4 
    //Kenapa shadownya gamau ya...
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20
  },
  accountNum: {
    backgroundColor: 'lightseagreen', 
    paddingHorizontal: 15,
    paddingVertical: 12, 
    marginVertical: 20, 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 20,
    borderRadius: 15
  },
  saldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 20
  },
  transactionsTable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#555',
  }

});

const transactions = [
  {
    id: "1",
    name: "Adityo Gizwanda",
    type: "Transfer",
    amount: "- 75.000,00",
    date: "08 December 2024",
    isPositive: false,
  },
  {
    id: "2",
    name: "Adityo Gizwanda",
    type: "Topup",
    amount: "+ 75.000,00",
    date: "08 December 2024",
    isPositive: true,
  },
  {
    id: "3",
    name: "Adityo Gizwanda",
    type: "Transfer",
    amount: "- 75.000,00",
    date: "08 December 2024",
    isPositive: false,
  },
  {
    id: "4",
    name: "Adityo Gizwanda",
    type: "Transfer",
    amount: "- 75.000,00",
    date: "08 December 2024",
    isPositive: false,
  },
];

