import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import { db, auth } from "../../../firebase-config";
import PatientContext from "../../../config/PatientContext";
import styles from "./styles";
import Observation from "./component";
import { getObservations } from "../../services/crud-operations";

export default function ViewObservations(patientId) {

    patientId = "73546977810"

    let { patients } = useContext(PatientContext)

    let patient = patients.filter(p => { p.id == patientId })

    console.log("Patient: ", patient)
    const observations = { ...patient.observation }


    console.log("OBS: ", observations)

    return (
        <>
            <View styles={styles.container}>
                <Text styles={styles.header}>Observations</Text>
                {observations.length != 0 ? (
                    observations.map((o) =>
                        <Observation observation={o} />
                    )
                ) : (
                    <Text>No observations!</Text>
                )}
            </View>
        </>
    );
}
