import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { fetchPosts, fetchUser, fetchTransactions } from '../api/restApi';
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import photo from '../assets/pp.jpeg'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native-web';
import { Logout, Sun } from 'lucide-react-native'

export default function HomePage({ navigation }) {
  const [fullname, setFullName] = useState('')
  const [accountType, setAccountType] = useState('Personal Account')
  const [avatar, setAvatar] = useState('')
  const [firstName, setFirstName] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [balance, setBalance] = useState('')
  const [refresing, setRefreshing] = useState('')
  const [transactions, setTransactions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    await auth.logout()
    navigation.navigate('Login')
  }

  const fetchUserData = useCallback(async () => {
    const response = await fetchUser();
    const data = response.data

    setFullName(data.full_name);
    setFirstName(data.full_name.split('')[0]);
    setAccountNo(data.account_no);
    setBalance(data.balance);
    setAvatar(data.avatar_url);
  }, []);

  const fetchTransactionsData = useCallback (async () => {
    const response = await fetchUserTransactions();
    setTransactions(response.data);
  });

  useEffect(() => {
    fetchUserData();
    fetchTransactionsData();
  }, [fetchUserData, fetchTransactionsData])

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  }

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions(); // Fetch transactions
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionsTable}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", marginRight: 12 }}></View>
      <View style={{ flex: 1 }}>
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
  );

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

  const HomeHeader = ({ name, accountType, photo}) => {
    const navigation = useNavigation()
    const auth = useAuth()

    const handleLogout = async () => {
      await auth.logout();
      navigation.navigate('Login')
    }
  }

  return (
    <SafeAreaProvider>
    <SafeAreaView>
    
    {/* Header Profile */}
    <View style={styles.homeheader}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={photo} style={{height: 48, width: 48, borderRadius: 24, borderWidth:4, borderColor: '#19918F'}} />
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{fullname}</Text>
          <Text style={{fontSize: 14}}>{accountType}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 8}}>
        <TouchableOpacity>
          <Sun color='#F8AB39' size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Logout color='#000' size={32} />
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
      }
    >
    
    {/* Greeting */}
    <View style={styles.greeting}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Good Morning, {firstName}</Text>
        <Text style={{fontSize: 16, marginTop: 12}}>
          Check all your incoming and outgoing transactions here
        </Text>
      </View>
      <Image source={require('../assets/Group.png')} style={{height: 80, resizeMode: 'contain'}} />
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
    </SafeAreaView>
    </SafeAreaProvider>
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
  },
  homeheader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
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

