import {
    View,
    Text,
    ScrollView,
    Button,
    DataTable,
    TextInput
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../config/PatientContext";   
import { postObservation } from "../services/crud-operations"

// TODO: Denne skal brukes når contexten er laget
// let { patients, setPatients } = useContext(PatientContext); 

export default function InsertObservationScreen(patient) {

patient = {
  id: "01019905055",
  heartRate: null,
  breathRate: null,
  o2Level: null,
  systolicBP: null,
  diastolicBP: null,
  timeOfAdmission: null,
  observations:[null],
};


    const [newobservationdesc, setNewObservationDesc] = useState("")

    const newobservationInfo = {
        description: newobservationdesc,
        time: Date.now(),
    }



    const handleSubmit = () => {
        postObservation(newobservationInfo, patient.id);
    };




    return (
        <>
            <View>
                <TextInput
                    value={newobservationdesc}
                    onChangeText={setNewObservationDesc}
                    placeholder="Description"
                />
                <Button title="submit" onPress={handleSubmit}></Button>
            </View>
        </>

    )
};
