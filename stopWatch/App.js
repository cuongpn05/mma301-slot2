import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const App = () => {
  // Lưu thời gian hiện tại (milliseconds)
  const [time, setTime] = useState(0);

  // Lưu trạng thái đồng hồ đang chạy hay dừng
  const [isRunning, setIsRunning] = useState(false);

  // Chuyển milliseconds thành MM:SS:MS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);

    const seconds = Math.floor((time % 60000) / 1000);

    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  // Logic chạy đồng hồ
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    // Dọn interval khi dừng hoặc component thay đổi
    return () => clearInterval(interval);
  }, [isRunning]);

  // Xử lý Start / Stop
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Xử lý Reset
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Giao diện
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
        {/* Nút Start / Stop */}
        <TouchableOpacity
          style={[
            styles.button,
            isRunning ? styles.stopButton : styles.startButton,
          ]}
          onPress={handleStartStop}
        >
          <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        {/* Nút Reset */}
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// CSS của React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },

  timer: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },

  startButton: {
    backgroundColor: "#28a745",
  },

  stopButton: {
    backgroundColor: "#dc3545",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
