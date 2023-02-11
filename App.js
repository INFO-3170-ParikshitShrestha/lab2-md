
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useEffect, useState } from "react";
import Physics from "./Physics";
export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        style={styles.gameContainer}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
            }}
           style ={styles.buttonup}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-down" });
            }}
            style ={styles.buttondown}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Down</Text>
            </View>
          </TouchableOpacity>          
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
            }}
            style ={styles.buttonleft}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Left</Text>
            </View>
          </TouchableOpacity>          
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
            }}
            style ={styles.buttonright}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Right</Text>
            </View>
          </TouchableOpacity>          
        </View>

      </View>

      <Text style={styles.watermark}>Parikshit </Text>
    </View>
  );
}

// Styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  watermark: {
    fontFamily: "Arial",
    fontStyle: "Bold",
    fontSize: 22,
    top: -20,
  },
  buttonup: {
    left: 0,
    top: -180,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'white',
    padding: 16,
  },
  buttondown:{
    left: 0,
    top: 5,
    right: 0,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'white',
    padding: 16,
  },
  buttonleft:{
    left: -120,
    top: -150,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'white',
    padding: 16,
  },
  buttonright:{
    left: 120,
    top: -200,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'white',
    padding: 16,
  },
  centerText:{
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  alignSelf: "center",
  }
});
