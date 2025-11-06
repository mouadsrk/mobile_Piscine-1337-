import {  FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";



const data = [
  '' ,'','C' , 'AC',
  7,8,9,'+',
  4,5,6,'-',
  1,2,3,'*',
  0,'.','=','/'
]


export default function Index() {

  const HandelonPress =(data : any) => 
  {
    console.log(data)
  }

  return (

    <>
      <StatusBar
        backgroundColor={styles.appBar.backgroundColor}
        barStyle='dark-content'
      />
    

    <View
      style={styles.appComtainer}
      >
         <View 
            style={styles.result}
            >
            <Text style={styles.resultText} >0</Text>
            <Text style={styles.resultText}>0</Text>
          </View>
          
          <View  style={styles.flateListHeader}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            numColumns={4}
 

         
            renderItem={({item } ) => (
              <TouchableOpacity 
              style={styles.buttonStyle} 
              onPress={() => HandelonPress(item)}
              disabled={item === '' ? true : false}             
              >
            <Text
              style={styles.buttonTextSytle}
              >{item.toString() }</Text>
            </TouchableOpacity>
            ) }
            
            />
          </View>
   
    </View>
      </>
  );
}


 const styles = StyleSheet.create(
  {
    appBar : {
      flex : 1,
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : "#37353E"
    },
    appComtainer : {
     display : "flex" ,
     flexDirection : "column",
     justifyContent : "space-between",
     height : "100%",
     width : "100%",
     backgroundColor : "#D3DAD9"

    },
    result : {
     
      height : 205,
      width : "100%",
      display : "flex", 
      flexDirection : "column",
      justifyContent : "flex-start",
      alignItems : "flex-end",
      padding : 20,
    
      
    },
    resultText : {
       fontSize : 40,
      color : "#715A5A"
    },
    flateListHeader : {
      backgroundColor : "#44444E",
      display : "flex" ,
      borderTopColor : "#D7D7D7",
      borderTopWidth : 1 ,
  
      
    },
    equaleBackground : {
      backgroundColor : "#0C2B4E"
    },
    calculatureContainer : {
      display : "flex",
      justifyContent : "flex-end"
    }
    ,
    buttonStyle : {
      flex : 1,
      justifyContent : "center",
      alignItems : "center",
      borderRadius : 100 ,
      margin : 10 ,
      backgroundColor : "#37353E" ,
      width : 80,
      height : 80 ,
    },
    buttonTextSytle : {
      fontSize : 40,
      color : "#D3DAD9"
    }
  }
)
