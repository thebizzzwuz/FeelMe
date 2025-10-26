import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  label: string;
  alertMessage?: string;
};

export default function ButtonPaper({ label, alertMessage }: Props) {
    return (
      <Button mode="contained" onPress={() => alert({alertMessage})}>{label}</Button>
    ); 
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
