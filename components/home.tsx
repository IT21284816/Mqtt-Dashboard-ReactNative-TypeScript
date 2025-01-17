import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { Client } from 'react-native-paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }: { navigation: any }) => {
  const [client, setClient] = useState<InstanceType<typeof Client> | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('Disconnected');
  const [buttonText, setButtonText] = useState<string>('Connect');
  const [buttonColor, setButtonColor] = useState<string>('#00cc00'); // Green color for "Connect"

  useEffect(() => {
    return () => {
      if (client && client.isConnected()) {
        client.disconnect();
      }
    };
  }, [client]);

  const connectMqtt = async () => {
    try {
      const domain = (await AsyncStorage.getItem('brokerDomain')) || 'broker.hivemq.com';
      const port = (await AsyncStorage.getItem('brokerPort')) || '8884';
      const clientId =
        (await AsyncStorage.getItem('clientId')) ||
        `mqtt-client-${Math.random().toString(16).slice(2)}`;
      const topic = (await AsyncStorage.getItem('topic')) || 'test/duhun';
  
      const brokerUrl = `wss://${domain}:${port}/mqtt`;
  
      const mqttClient = new Client({
        uri: brokerUrl,
        clientId: clientId,
        storage: AsyncStorage,
      });
  
      mqttClient.on('connectionLost', (responseObject: { errorMessage: string }) => {
        console.log('Connection lost:', responseObject.errorMessage);
        setStatus('Disconnected');
        setButtonText('Connect');
        setButtonColor('#00cc00'); // Green for Connect button
        Alert.alert('Connection Lost', responseObject.errorMessage || 'Unknown error');
      });
  
      mqttClient.on('messageReceived', (message: { payloadString: string }) => {
        console.log('Message received:', message.payloadString);
        setMessages((prevMessages) => [...prevMessages, message.payloadString]);
      });
  
      await mqttClient.connect();
      setStatus('Connected');
      setButtonText('Disconnect');
      setButtonColor('#cc0000'); // Red for Disconnect button
      mqttClient.subscribe(topic);
      setClient(mqttClient);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Connection failed', err.message);
        Alert.alert('Connection Failed', err.message || 'Unable to connect to the MQTT broker.');
      } else {
        console.error('Connection failed', err);
        Alert.alert('Connection Failed', 'An unknown error occurred.');
      }
      setStatus('Disconnected');
    }
  };
  
  const disconnectMqtt = () => {
    if (client && client.isConnected()) {
      client.disconnect();
      setStatus('Disconnected');
      setButtonText('Connect');
      setButtonColor('#00cc00'); // Green for Connect button
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MQTT App</Text>
      <Text
        style={[
          styles.status,
          { color: status === 'Connected' ? 'green' : 'red' },
        ]}
      >
        Status: {status}
      </Text>
      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text>{msg}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={() => {
            if (status === 'Connected') {
              disconnectMqtt();
            } else {
              connectMqtt();
            }
          }}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Settings', {
            onDisconnect: disconnectMqtt,
          })
        }
        style={styles.settingsButton}
      >
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'white',
    padding:10,
    borderRadius: 10,
    marginBottom:20,
  },
  messageContainer: {
    flex: 1,
    marginTop: 10,
  },
  message: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    backgroundColor: '#2196F3',
    paddingHorizontal: 150,
    paddingVertical:10,
    borderRadius:5,
    fontSize: 16,
  },
});

export default Home;
