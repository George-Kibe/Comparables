import { StyleSheet, Text, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '../../context/UserContext';
import PrimaryDetails from "../../components/PrimaryDetails";
import SecondaryDetails from "../../components/SecondaryDetails";
import CaptureCoords from "../../components/CaptureCoords";
import SummaryDetails from "../../components/SummaryDetails";

const AddComparable = () => {
  const [title, setTitle] = useState("");
  const [lRNumber, setLRNumber] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [priceType, setPriceType] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const {authuser, dbUser} = useUserContext();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  console.log(" DB User: ", dbUser);
  const userId = dbUser?.user._id;
  const user = dbUser?.user.username;
  console.log(" User Id: ", userId);
  console.log("user: ", user)


  return (
    <SafeAreaView style={{flex: 1}}>
      <ProgressSteps>
        <ProgressStep label="Primary Data">
          <PrimaryDetails />
        </ProgressStep>
        <ProgressStep label="Secondary Data ">
          <SecondaryDetails />
        </ProgressStep>
        <ProgressStep label="Capture Map">
          <CaptureCoords />
        </ProgressStep>
        <ProgressStep label="Preview">
          <SummaryDetails />
        </ProgressStep>
      </ProgressSteps>
  </SafeAreaView>
  )
}

export default AddComparable

const styles = StyleSheet.create({})