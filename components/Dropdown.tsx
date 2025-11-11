import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';

const OPTIONS = [
    { label: 'Stress and Anxiety Study', value: 'Stress and Anxiety Study'},
    { label: 'Fear Study', value: 'Fear Study'},
];

export default function DropdownComponent() {
    const [value, setValue] = useState<string>();

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Dropdown
                label="Study"
                placeholder="Select Study"
                options={OPTIONS}
                value={value}
                onSelect={setValue}
                mode='outlined'
                />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
    margin: 30,
    flex: 1,
    backgroundColor: '#56d3adff',
  },
    dropdown: {
    width: 320,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});

