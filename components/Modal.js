import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Button, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

export default function  ModalComp() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{flexDirection: 'row', paddingVertical: 15}}>
        <Text style={{ color: 'teal', fontSize: 16}}>Terms and Conditions </Text>
        <Text style={{ color: 'red', fontSize: 16 }}>* </Text>
        </View>
        </TouchableOpacity>
        

        <Modal 
        onRequestClose={() => setModalVisible(false)} //perintah menutup modal
        visible={modalVisible} // mengatur modal muncul
        presentationStyle='pageSheet' // untuk mengatur tampilan modal (untuk ios aza)
        animationType="slide" // untuk mengatur animasi modal
        transparent={true} // untuk mengatur transparansi modal
        >
        <View style={styles.modalView}>
          <ScrollView>
          <Text style={styles.modalText}>Terms and Conditions</Text>
          <Text style={{fontSize: 18, textAlign: 'justify', marginHorizontal: 5, marginVertical: 20}}>
          Use of the Application
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ligula non urna vehicula luctus. Suspendisse potenti. Nam auctor ligula eu ligula tincidunt, id facilisis purus fringilla. Ut viverra felis vel sem fringilla, ut convallis lorem eleifend.

Privacy
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Duis convallis dui non turpis interdum, id faucibus elit rhoncus. Sed hendrerit velit in sapien tincidunt, eget dictum mauris scelerisque. Vivamus vel orci ac nulla bibendum euismod.

Intellectual Property
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in neque et lectus vehicula suscipit sit amet a lorem. Ut dictum massa vel turpis pharetra, ut fermentum mauris malesuada. Nulla eget lacus nec lectus convallis consequat.

Limitations of Liability
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel magna a elit vulputate convallis. Praesent nec justo non mauris iaculis vehicula. Suspendisse potenti. Morbi sed ex vestibulum, tincidunt mi a, tempus est.Use of the Application
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ligula non urna vehicula luctus. Suspendisse potenti. Nam auctor ligula eu ligula tincidunt, id facilisis purus fringilla. Ut viverra felis vel sem fringilla, ut convallis lorem eleifend.

Privacy
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Duis convallis dui non turpis interdum, id faucibus elit rhoncus. Sed hendrerit velit in sapien tincidunt, eget dictum mauris scelerisque. Vivamus vel orci ac nulla bibendum euismod.

Intellectual Property
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in neque et lectus vehicula suscipit sit amet a lorem. Ut dictum massa vel turpis pharetra, ut fermentum mauris malesuada. Nulla eget lacus nec lectus convallis consequat.

Limitations of Liability
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel magna a elit vulputate convallis. Praesent nec justo non mauris iaculis vehicula. Suspendisse potenti. Morbi sed ex vestibulum, tincidunt mi a, tempus est.


          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{padding: 15, alignItems: 'center', marginVertical: 15, marginHorizontal: 10, backgroundColor: 'teal', borderRadius: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Close</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginVertical: 60,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
});