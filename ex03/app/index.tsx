import { useState } from "react";
import {  Alert, FlatList, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

const data = [
  '' ,'','C' , 'AC',
  7,8,9,'+',
  4,5,6,'-',
  1,2,3,'*',
  0,'.','=','/'
]

const number = [
  '0','1','2','3','4','5','6','7','8','9','.'
]

const operation  :(string )[] = [
  '+','-','*','/'
]

const calc = (s : string) => Function(`return(${s})`)();

export default function Index() {

   const [result , setResult] = useState <string | number>(0);
  const [token , setToken] = useState<(string )>('0');
  const HandelonPress =(input :  string | number) => 
  {
    const inputTostring = input.toString()
    setResult('')
    if (number.includes(inputTostring.toString())) {
      setToken((prev) => {

        let i = prev.length -1
        let lastOpreration = 0
        while(i >= 0 ){
          if(operation.includes(prev[i]))
          {
            lastOpreration = i
            break
          }
          i--
        }
       let lastNumber =   prev.substring(lastOpreration  ,prev.length ) + inputTostring
       if(lastNumber.startsWith('0'))
       {
        lastNumber = lastNumber.substring(1 ,lastNumber.length )
       }
        if(lastNumber.match(/^[+-]{0,1}[0-9]*[.]{0,1}[0-9]*$/)  && lastNumber.length <= 15  && lastOpreration === 0 )
        {
            prev = prev.substring(0 , lastOpreration  )
          return  prev + lastNumber
        }
        else if(lastNumber.match(/^[/*+-]{0,1}[0-9]*[.]{0,1}[0-9]*$/)  && lastNumber.length <= 15  )
        {
            prev = prev.substring(0 , lastOpreration  )
          return  prev + lastNumber
        }
      
      return prev;
      });
    }

    else if (operation.includes(inputTostring)) {
      setToken((prev) => {
        const length =prev.length
        if (length === 0)
        {
          if(ToastAndroid !== undefined)
            {
              ToastAndroid.showWithGravityAndOffset(
                JSON.stringify(`Invalid format used`) ,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,);   
              }
              else
              {
                Alert.alert(`Invalid format used`) // iOS fallback
              }
          return  prev 
        }   
      else if(operation.includes(prev[prev.length - 1]))
      {
       
        const tmp = prev.substring(0 , prev.length - 1) +inputTostring

        if( operation.includes(tmp[tmp.length - 1])&& prev.length === 1 )
        {
          if(ToastAndroid !== undefined)
              {
              ToastAndroid.showWithGravityAndOffset(
                JSON.stringify("Invalid format used") ,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,);   
              }
              else
              {
                Alert.alert("Invalid format used") // iOS fallback
              }            
          return  prev 
        }    
        return  tmp
      }
      else
      {
        return  prev +inputTostring
      }
      });
    }
        else if(inputTostring === 'AC')
          setToken('')
        else if (inputTostring === 'C')
          setToken((prev) => {
              prev  = prev.substring(0 , prev.length - 1)
            return prev
          } )
          else if (inputTostring === '=')
          {
              try {
               const  tmpresult = calc (token).toString() 
               setToken(tmpresult)
               setResult(tmpresult)

              } catch (error) {
                if(ToastAndroid !== undefined)
                  {
                    ToastAndroid.showWithGravityAndOffset(
                      JSON.stringify(`${error}`) ,
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                      25,
                      50,);   
                  }
                  else
                    {
                      Alert.alert(`${error}`) // iOS fallback
                    }
              }
          }
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
            <Text style={styles.resultText} >{token || ' '}</Text>
            <Text style={styles.resultText}>{result}</Text>
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
              disabled={  ((item ==='') || (item ==="C" && token.length === 0) ) ? true : false }             
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
      shadowColor: "black",
      shadowOffset: { width: 2, height: -20 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    elevation: 20,
    },
    equaleBackground : {
      backgroundColor : "#0C2B4E"
    },
    calculatureContainer : {
      display : "flex",
      justifyContent : "flex-end"
    },
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
