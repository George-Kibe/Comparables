import { StyleSheet, Text, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import React from 'react'

const AddComparable = () => {
  return (
    <View style={{flex: 1}}>
      <ProgressSteps>
        <ProgressStep label="Primary Data">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 1!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Secondary Data ">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Capture Map">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
  </View>
  )
}

export default AddComparable

const styles = StyleSheet.create({})