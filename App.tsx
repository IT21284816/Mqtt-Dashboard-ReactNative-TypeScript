import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MQTT Configuration
const MQTT_BROKER = 'wss://broker.hivemq.com:8884/mqtt';
const CLIENT_ID = `mqtt-client-${Math.random().toString(16).slice(2)}`;
const TOPIC = 'test/duhun';

const App = () => {
  const [client, setClient] = useState<InstanceType<typeof Client> | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('Disconnected');

  useEffect(() => {
    // Initialize MQTT Client
    const mqttClient = new Client({
      uri: MQTT_BROKER,
      clientId: CLIENT_ID,
      storage: AsyncStorage,
    });

    // Set up callbacks
    mqttClient.on('connectionLost', (responseObject: { errorMessage: string }) => {
      console.log('Connection lost:', responseObject.errorMessage);
      setStatus('Disconnected');
    });

    mqttClient.on('messageReceived', (message: { payloadString: string }) => {
      console.log('Message received:', message.payloadString);
      setMessages((prevMessages) => [...prevMessages, message.payloadString]);
    });

    // Connect the client
    mqttClient
      .connect()
      .then(() => {
        console.log('Connected');
        setStatus('Connected');
        mqttClient.subscribe(TOPIC);
      })
      .catch((err: unknown) => {
        console.error('Connection failed', err);
        setStatus('Disconnected');
      });

    setClient(mqttClient);

    // Cleanup on unmount
    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MQTT Message Viewer</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text>{msg}</Text>
          </View>
        ))}
      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
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
});

export default App;
