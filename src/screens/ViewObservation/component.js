import { View, Text } from 'react-native'
import React from 'react'

export default function Observation( { observation }) {
  return (
      <View key={observation.key}>
          Author: {observation.displayName},
          Time: {observation.time},
          Description: {observation.description}
      </View>
  )
}