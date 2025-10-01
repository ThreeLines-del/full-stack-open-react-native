import { useState } from "react";
import { View, Pressable, StyleSheet, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Text from "./Text";
import { EvilIcons } from "@react-native-vector-icons/evil-icons";

const OrderPicker = ({ selectedOption, setSelectedOption, orderValues }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View>
      {/* Display current option */}
      <Pressable style={styles.displayBox} onPress={() => setShowPicker(true)}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textSecondary"}
        >
          {orderValues[selectedOption].label}
        </Text>
        <EvilIcons name="chevron-down" size={25} color="black" />
      </Pressable>

      {/* Show picker inside modal */}
      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={(value) => {
                setSelectedOption(value);
                setShowPicker(false); // close picker after choosing
              }}
            >
              {Object.entries(orderValues).map(([key, obj]) => (
                <Picker.Item key={key} label={obj.label} value={key} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  displayBox: {
    padding: 12,
    borderBottomWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "gray",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
  },
});

export default OrderPicker;
