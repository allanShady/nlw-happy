import React, { useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from "../images/map-marker.png";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function App() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation =  useNavigation();

    useFocusEffect(() => {
      api.get('orphanages').then(response => 
        { 
          setOrphanages(response.data) 
        });
    });

    function navigateToOrphanageDetails(id: number) {    
        navigation.navigate('OrphanageDetails', { id });
    }
    
    return (
        <View style={styles.container}>
        <MapView
        provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
            latitude: -25.7403641,
            longitude: 32.5766883, 
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
            }}
        >
          {
            orphanages.map(orphanage => {
              return (
                <Marker
                  key={orphanage.id}
                  calloutAnchor={{ x: 2.4, y: 0.8 }} 
                  icon={mapMarker}
                  coordinate={
                  { 
                    latitude: orphanage.latitude,
                    longitude: orphanage.longitude
                  }}>
                  
                  <Callout tooltip onPress={() => navigateToOrphanageDetails(orphanage.id)}>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>
                        {orphanage.name}
                      </Text>
                    </View>  
                  </Callout>       
                </Marker>
              )
            })
          }
            </MapView>     

            {/*Footer*/}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {`${orphanages.length} orfanatos encontrados`}
                </Text>

                <TouchableOpacity style={styles.createOrphanageButton} onPress={() => { navigation.navigate('SelectMapPosition') }}>
                <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View> 
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 45,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 35,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 5,
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  