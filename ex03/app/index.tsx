import { useState } from "react";
import {  FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";



enum operationType {
  MULTI = "*",
  ADD = "+",
  DEVI = "/",
  SUB = "-"
}


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


const executeOperation  = (num1  : number,  operation : string , num2 : number ) : number  => 
{

  if (operation === '/')
  {
    return num1 / num2
  }
  else if (operation === '*')
  {
  return num1 * num2
  }
  else if (operation === '+')
  {
  return num1 + num2
  }
  else if (operation === '-')
  {
  return num1 - num2
  }
  return -1337

}



const isMultiple = (str:string) => {

  if (str === "/" || str === "*")
    return  true
  return false

}


const calucationOfSub= (str : string[]) : number =>
{
  let i = 2

  if (str.length === 1)
    return JSON.parse(str[0])

  let cumule = executeOperation( JSON.parse(str[0]), str[1] ,  JSON.parse(str[2]))
  let length = str.length

  while(i + 1 < length)
  {
   
    cumule = executeOperation( cumule, str[i +1 ] ,  JSON.parse(str[i + 2] ))
    i = i +2
  }
  return cumule
} 



// start numbre end number 
const generateCalculation = (str : string[]) :   number => 
{
  let i = 0
  let OperationType = ''
  let sub = [""]
  let subOperator = ''
   let length =  str.length
   let result = 0
   let tmpResult = 0
   let j = 0

  while( i < length  )
  {

     
    console.log(operation.includes(str[i]) , str[i] , i)
    
    if (i === 0 && number.includes(str[i][0]))
    {

      subOperator = '+'
      console.log("passe here 1" , subOperator , i)

    }
    else if (i === 0  && operation.includes(str[i]))
    {
      subOperator = str[i]
      console.log("passe here 2" , subOperator , i)

    }
    
//1+1+2*3
//01234
//--3   


//1+2*4 // haDEL
//
//1+1+1
//1*2+2+2 * 1
//1+12

//1*2+4
//10*10 + 20 *20


     if(operation.includes(str[i]))
    {
      OperationType= str[i]
      if ( i === j && i + 2 < length && !isMultiple(OperationType) &&  isMultiple(str[i + 2]) )
      {
        OperationType= str[i + 2]
      }
     
      
      if(!isMultiple(OperationType) )
      {
        console.log("!notisMultiple")
        if( isMultiple(str[i]) || number.includes(str[i][0]))
          {
            i++
            j++
          }
        while(i < length &&  (!isMultiple(str[i]) || number.includes(str[i][0])))
          i++
        console.log("aftre while i = " , i ,"lenght =" , length , "j =" ,j)

        if(i === length)
        {
          if(i - j === 2)
            j++
          sub = str.slice(j , i)
        

          tmpResult = calucationOfSub(sub)
         

          result = executeOperation(result , subOperator,tmpResult )
          break 
        }
        else if (isMultiple(str[i]))
        {
          sub = str.slice(j , i - 2)
          tmpResult = calucationOfSub(sub)
          result = executeOperation(result , subOperator,tmpResult )
          i = i -2
          subOperator = str[i]
          j = i
        }
        
      }
      else
      if(i < length &&  isMultiple(OperationType) )
        {
          console.log("!isMultiplezzzzzzzzzzz")
          if( !isMultiple(str[i]) || number.includes(str[i][0]))
          {
            i++
            j++
          }
          while(i < length && ( isMultiple(str[i]) || number.includes(str[i][0])))
            i++
          console.log("aftre while i = " , i ,"lenght =" , length , "j =" ,j)

          if (i === length )
          {

            // console.log("entre to sbu i = " , i ,"lenght =" , length , "j =" ,j)
            sub = str.slice(j , i)
            tmpResult = calucationOfSub(sub)
            result = executeOperation(result , subOperator,tmpResult )
            break

          }
          if(i === j)
          {

            subOperator = str[i+ 2]
          }
          else if(!isMultiple(str[i]))
          {

            sub = str.slice(j , i)
            tmpResult = calucationOfSub(sub)
            subOperator = str[i]
            result = executeOperation(result , subOperator,tmpResult )
            j = i
          }
          
           
        }
      }
      else 
        i++
  }
    return result
}



// check the string lenght
 











export default function Index() {

   const [result , setResult] = useState(0);
  const [token , setToken] = useState<(string )[]>([]);
  const HandelonPress =(input :  string | number) => 
  {

    const inputTostring = input.toString()
    
    

    if (number.includes(inputTostring.toString())) {
      setToken((prev) => {
        const length = prev.length;
        const newTokens = [...prev]; 
        if (length === 0) {
          if(inputTostring === '.')
            newTokens.push('0.');
          else
          newTokens.push(inputTostring);
        } 
        else
        {
          let last = newTokens[length -1]
          if (operation.includes(last)) {
            if(inputTostring === '.' || length )
              newTokens.push('0.');
            else
            newTokens.push(inputTostring);
          } else if ( number.includes(last[0])) {
            if ( inputTostring === '.'  &&   (last.includes('.'))) // err
            {
              return prev
            }
            else if (last.length === 1 && last === '0' )
            {
              last = inputTostring
            }

            let newNumber = last + inputTostring;
            newTokens[length -1] = newNumber;
        }
      }
      return newTokens;
      });
    }






    else if (operation.includes(inputTostring)) {
      setToken((prev) => {
        const length = prev.length;
        const newTokens = [...prev]; 
        if (length === 0  ) { //err
          return prev
        } 
        else
        {
          let last = newTokens[length -1]
          if ( number.includes(last[0])) {
            newTokens.push(inputTostring);
          } else if ( operation.includes(last[0]) ) {
            newTokens[length -1] = inputTostring
        }
      }
      return newTokens;
      });
    }
 
        else if(inputTostring === 'AC')
          setToken(['0'])






        else if (inputTostring === 'C')
          setToken((prev) => {
            const newTokens = [...prev]
            const length = prev.length

            if(length === 0 ) 
            return ['0']
          else
          {
            let last = newTokens[length - 1]
            if(length === 1 )
            {
              if(operation.includes(last[0]))
              {
                newTokens.pop()
                newTokens.push("0")
              }
              else
              {
                if( number.includes(last[0]))
                  {
                    newTokens[length - 1] = last.substring(0 ,length - 1 )
                    if (newTokens[length - 1] === "")
                      newTokens[length - 1] = '0'
                  }
              }
            }
            else
            {
              if(operation.includes(last[0]))
                newTokens.pop()
              if( number.includes(last[0]))
              {
                newTokens[length - 1] = last.substring(0 ,length - 1 )
                    if (newTokens[length - 1] === "")
                      newTokens[length - 1] = '0'
              }
            }
            }
           
            return newTokens
          } )

          else if (inputTostring === '=')
          {
            setToken((prev) => {


              const newTokens = [...prev]; 
              const length = newTokens.length
              console.log(length)
              if (length <= 2  ) {
                return newTokens
              }

              else
              {
                const last = newTokens[length - 1]
                console.log("strat")

                if (operation.includes(last)) // err
                  return newTokens
                  console.log("strat")

                  return [generateCalculation(prev).toString()]
              }
           
            });
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
            <Text style={styles.resultText} >{token || '0'}</Text>
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
