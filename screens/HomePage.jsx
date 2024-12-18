import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchPosts, fetchUser, fetchTransactions } from '../api/restApi';
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import photo from '../assets/pp.jpeg'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { EyeOff, Logout, Sun, Plus, Send } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';

export default function HomePage({ navigation }) {
  const [fullname, setFullName] = useState('')
  const [accountType, setAccountType] = useState('Personal Account')
  const [avatar, setAvatar] = useState('')
  const [firstName, setFirstName] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [balance, setBalance] = useState('')
  const [refresing, setRefreshing] = useState(false)
  const [transactions, setTransactions] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  
    const [showBalance, setShowBalance] = useState(false);

    const handlePress = () => {
      setShowBalance((currentShowBalance) => !currentShowBalance)}

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
    };

    const formatCurrency = (currency) => {
      return new Intl.NumberFormat("de-DE", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(currency);
    };

    const inputFormatCurrency = (currency) => {
      return new Intl.NumberFormat("de-DE", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(currency);
    };
  

  const handleLogout = async () => {
    await auth.logout()
    navigation.navigate('Login')
  }

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetchUser();
      console.log('tes', data)
      const data = response.data
      setFullName(data.full_name);
      setFirstName(data.full_name.split('')[0]);
      setAccountNo(data.account_no);
      setBalance(data.balance);
      setAvatar(data.avatar_url);
      console.log(fullname)
    } catch (error) {
      console.log('aa', error)
    } 


  }, []);

  const fetchTransactionsData = useCallback (async () => {
    const response = await fetchTransactions();
    setTransactions(response.data);
  });

  useEffect(() => {
    fetchUserData();
    fetchTransactionsData();
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  }

  // useEffect(() => {
  //   const getTransactions = async () => {
  //     try {
  //       const data = await fetchTransactions(); // Fetch transactions
  //       setTransactions(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getTransactions();
  // }, []);

  // if (loading) {
  //   return( 
  //     <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>{error}</Text>
  //     </View>
  //   );
  // }

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
          {/* <Sun color='#F8AB39' size={32} /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          {/* <Logout color='#000' size={32} /> */}
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
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Good Morning, {fullname}</Text>
        <Text style={{fontSize: 16, marginTop: 12}}>
          Check all your incoming and outgoing transactions here
        </Text>
      </View>
      <Image source={require('../assets/Group.png')} style={{height: 80, resizeMode: 'contain'}} />
    </View>
    

    {/* <View style={styles.welcomeHeader}>
    <View style={{width: 250}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>Good Morning, Aneira!</Text>
      <Text style={{fontSize: 16}}>Check all your incoming and outgoing transactions here</Text>
    </View>
    <View>
      <Image source={require('../assets/Group.png')}></Image>
    </View>
    </View> */}
    {/* <View style={styles.accountNum}>
      <Text style={{color: 'white', fontSize: 20}}>Account No.</Text>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>0210202</Text>
    </View> */}

    {/* Account Number */}
    <View style={styles.acc}>
      <Text style={{flex: 1, fontSize: 16, color: '#fff', textAlign: 'left'}}>Account No.</Text>
      <Text style={{flexShrink: 1, fontSize: 16, color: '#fff', textAlign: 'left'}}>{accountNo}</Text>
    </View>

    {/* <View style={styles.saldo}>
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
    </View> */}

      {/* Balance Detail */}
      <View style={styles.balance}>
      <View>
        <Text style={{fontSize: 14}}>Balance</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', position: 'relative'}}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>
          {/* {showBalance ? `Rp${formatCurrency(balance)}` : "***************"} */}
          {balance}
          </Text>
          {/* <TouchableOpacity>
            {showBalance ? (
              <Eye color='#a9a9a9' size={24} />
            ) : (
              <EyeOff color='#a9a9a9' size={24} />
            )}
          </TouchableOpacity> */}
          <View>
            <TouchableOpacity
              style={styles.iconCon}
              onPress={() => navigation.navigate("TopUp")}
            >
              <Plus color='#fff' size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconCon}
              onPress={() => navigation.navigate("Transfer")}
            >
              <Send color='#fff' size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>

    {/* <View style={{flex: 1, backgroundColor: '#F9F9F9', padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 12, backgroundColor: 'white', padding: 30}}>
        Transaction History
      </Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 16}}
      ></FlatList>
      </View> */}

      {/* <View>
        <Text style={{fontWeight: "bold", fontSize: 16, paddingHorizontal: 20, paddingBottom: 16, borderBottomColor: "#E5E5E5", borderBottomWidth: 1,}}>
          Transaction History
        </Text>
        <ScrollView style={{paddingTop: 20, paddingHorizontal: 20}}>
          {transactions.map((transaction, index) => (
            <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
              <View style={{flexDirection: 'row', gap: 12, justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
              <View>

              </View>
              </View>
            </View>
          ))}
        </ScrollView>

      </View> */}

<View style={{ backgroundColor: "#fff", marginHorizontal: 20, paddingVertical: 12, borderRadius: 10, height: 300}}>
      <Text style={styles.transtitle}>
        Transaction History
      </Text>
      <ScrollView style={{paddingTop: 20, paddingHorizontal: 20}}>
        {transactions.map((transaction, index) => (
          <View key={index} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16,}}>
            <View style={{flexDirection: "row", gap: 12, justifyContent: "flex-start", alignItems: "center", flex: 1,}}>
              <View style={{backgroundColor: "#D9D9D9", height: 32, width: 32, borderRadius: 16,}} />
              <View>
                <Text style={{fontSize: 14, fontWeight: 'normal'}}>{transaction.from_to}</Text>
                <Text style={{fontSize: 12, fontWeight: 'normal'}}>
                  {transaction.type === "c" ? "TopUp" : "Transfer"}
                </Text>
                <Text style={{fontSize: 10, fontWeight: 'normal', color: '#a9a9a9'}}>
                  {formatDate(transaction.created_at)}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.amount,
                { color: transaction.type === "c" ? "#008000" : "#000" },
              ]}
            >
              {`${transaction.type === "c" ? "+" : "-"} ${formatCurrency(
                transaction.amount
              )}`}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  },
  acc: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#19918F",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  balance: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  iconCon: {
    backgroundColor: "#19918F",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#19918F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  }, 
  transtitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  amount: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
  },
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
