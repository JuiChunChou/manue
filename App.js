import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View,Image,TouchableOpacity, Animated} from 'react-native';
import user from './assets/fonts/user.png';
//Tab ICons
import home from './assets/fonts/home.png';
import bell from './assets/fonts/bell.png';
import search from './assets/fonts/search.png';
import out from './assets/fonts/out.png';
//Menu Icons
import menu from './assets/fonts/openMenu.png';
import close from './assets/fonts/cros.png';
//Photo
import photo from './assets/fonts/dog.jpg';

export default function App() {
  const [currentTab,setCurrentTab] =useState("Home");
  //To get the current Status of menu
  const [showMenu,setShowMenu] =useState(false);

  //Animated Properties
  const offsetValue = useRef(new Animated.Value(0)).current;
  //Scale Intially must be one
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style ={styles.container}>
      <View style = {{justifyContent: 'flex-start',padding :15}}>
      <Image source = {user} style ={{
        width:60,
        height:60,
        borderRadius: 10,
        marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight:'bold',
          color:'white',
          marginTop:20
        }}>UserName</Text>

       <TouchableOpacity>
        <Text style={{
          marginTop: 6,
          color: 'white'
        }}>View Profile</Text>
       </TouchableOpacity>

       <View style={{marginTop: 50}}>
        {
          //Tab Bar Buttons
        }
        {TabButton(currentTab,setCurrentTab,"Home",home)}
        {TabButton(currentTab,setCurrentTab,"Notifications",bell)}
        {TabButton(currentTab,setCurrentTab,"Search",search)}
        {TabButton(currentTab,setCurrentTab,"LogOut",out)}
      
        </View>
      </View>

     {
      //Over tay view
     }

     <Animated.View style={{
      flexGrow: 1,
      backgroundColor: 'white',
      position: 'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0,
      paddingHorizontal:15,
      paddingVertical:20,
      borderRadius: showMenu ? 15 : 0,
      //Transforming view....
      transform:[
        {scale: scaleValue},
        { translateX: offsetValue }
      ]
     }}>

      {
        //Menu Button
      }

      <Animated.View style={{
        transform:[{
          translateY:closeButtonOffset
        }]
      }}>
      <TouchableOpacity onPress={()=>{
        //Do Actions Here
        //Scaling the view
        Animated.timing(scaleValue, {
          toValue:showMenu ? 1:0.88,
          duration:300,
          useNativeDriver: true
        })
          .start()

        Animated.timing(offsetValue, {
          //Your Random Value
          toValue:showMenu ? 0:230,
          duration:300,
          useNativeDriver: true
        })
          .start()

          Animated.timing(closeButtonOffset, {
            //Your Random Value
            toValue:showMenu ? -30:0,
            duration:300,
            useNativeDriver: true
          })
            .start()

          setShowMenu(!showMenu);
      }}>
          <Image source={showMenu ? close: menu} style={{
            width:30,
            height:30,
            tintColor:'black',
            marginTop:40
          }}></Image>
      
      </TouchableOpacity>
      <Text style ={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20
          }}>{currentTab}</Text>

          <Image source={photo} style={{
            width:'100%',
            height:300,
            borderRadius:15,
            marginTop:20

          }}></Image>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 15,
            paddingBottom:8
          }}>UserName</Text>

          <Text style={{
          }}>My dog</Text>
      </Animated.View>

     </Animated.View>

    </SafeAreaView>
  );
}

//For multiple Buttons
const TabButton =(currentTab,setCurrentTab,tittle,image) =>{
  return(
    <TouchableOpacity onPress={() => {
      if(tittle =="LogOut"){
        //Do your stuff
      }else{
        setCurrentTab(tittle)
      }
    }}>

        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical:8,
          backgroundColor: currentTab == tittle ? 'white':'transparent',
          paddingLeft:13,
          paddingRight:35,
          borderRadius: 8,
          marginTop:15
        }}>

          <Image source = {image} style={{
            width: 25,
            height: 25,
            tintColor: currentTab == tittle ? "#5359D1" : "white"
          }}></Image>

          <Text style={{
            fontSize:15,
            fontWeight:'bold',
            paddingLeft:15,
            color: currentTab == tittle ? "#5359D1" : "white"
          }}>{tittle}</Text>

        </View>
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
