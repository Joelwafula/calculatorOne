import * as React from 'react';
import Button from './Button';
import { View, Text } from 'react-native';
import { Styles } from '@/constants/GlobalStyles';
import { myColors } from '@/constants/Colors';

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState('');
  const [secondNumber, setSecondNumber] = React.useState('');
  const [operation, setOperation] = React.useState('');
  const [result, setResult] = React.useState<number | null>(null);
  const [isContinuing, setIsContinuing] = React.useState(false); // Track if user is chaining operations
//function used to append first number values
  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    if (isContinuing && result !== null) {
      // If chaining, use result as the first number
      setSecondNumber(result.toString());
      setOperation(buttonValue);
      setFirstNumber('');
      setResult(null); // Reset the result for the next computation
      setIsContinuing(false); // Allow new computations
    } else if (firstNumber) {
      setOperation(buttonValue);
      setSecondNumber(firstNumber);
      setFirstNumber('');
    }
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult(null);
    setIsContinuing(false); // Reset the chaining state
  };
  const getResult = () => {
    if (!secondNumber || !firstNumber || !operation) {
      setResult(0); // Default to 0 if any input is missing
      return;
    }
  
    const num1 = parseFloat(secondNumber);
    const num2 = parseFloat(firstNumber);
  
    let computationResult: number;
  
    switch (operation) {
      case '+':
        computationResult = num1 + num2;
        break;
      case '-':
        computationResult = num1 - num2;
        break;
      case '*':
        computationResult = num1 * num2;
        break;
      case '/':
        computationResult = num2 !== 0 ? num1 / num2 : NaN; // Handle division by zero
        break;
      case '%':
        computationResult = (num1 * num2) / 100; // Treats num2 as a percentage of num1
        break;
      default:
        computationResult = 0;
        break;
    }
  
    setResult(computationResult);
    setFirstNumber(''); // Clear input fields
    setSecondNumber('');
    setOperation('');
    setIsContinuing(true); // Enable chaining
  };
  

  const displayFirstNumber = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]
          }
        >
          {result.toString()}
        </Text>
      );
    }
    if (firstNumber) {
      return (
        <Text
          style={
            firstNumber.length < 6
              ? Styles.screenFirstNumber
              : [Styles.screenFirstNumber, { fontSize: 50 }]
          }
        >
          {firstNumber}
        </Text>
      );
    }
    return <Text style={Styles.screenFirstNumber}>0</Text>;
  };

  const toggleSign = () => {
    if (firstNumber) {
        
      // Toggle the sign of the first number
      setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
    } else if (result !== null) {
      // If there's a result, toggle its sign
      setResult((prev) =>(prev !== null ? prev * -1 : 0) );
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '98%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}{' '}
          <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500' }}>
            {operation}
          </Text>
        </Text>
        {displayFirstNumber()}
      </View>

      <View style={Styles.row}>
        <Button title="C" onPress={clear} />
        {/* <Button title="+/-" onPress={() => handleOperationPress('+/-')} /> */}
        <Button title="+/-" onPress={toggleSign} />
        <Button title="%" onPress={() => handleOperationPress('%')} />
        <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
      </View>

      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress('7')} />
        <Button title="8" onPress={() => handleNumberPress('8')} />
        <Button title="9" onPress={() => handleNumberPress('9')} />
        <Button title="x" isBlue onPress={() => handleOperationPress('*')} />
      </View>

      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress('4')} />
        <Button title="5" onPress={() => handleNumberPress('5')} />
        <Button title="6" onPress={() => handleNumberPress('6')} />
        <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
      </View>

      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress('1')} />
        <Button title="2" onPress={() => handleNumberPress('2')} />
        <Button title="3" onPress={() => handleNumberPress('3')} />
        <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
      </View>

      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress('.')} />
        <Button title="0" onPress={() => handleNumberPress('0')} />
        <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <Button title="=" isBlue onPress={getResult} />
      </View>
    </View>
  );
}


// import * as React from 'react';
// import Button from './Button';
// import { View, Text } from 'react-native';
// import { Styles } from '@/constants/GlobalStyles';
// import { myColors } from '@/constants/Colors';

// export default function MyKeyboard() {
//   const [firstNumber, setFirstNumber] = React.useState('');
//   const [secondNumber, setSecondNumber] = React.useState('');
//   const [operation, setOperation] = React.useState('');
//   const [result, setResult] = React.useState<number | null>(null);

//   const handleNumberPress = (buttonValue: string) => {
//     if (firstNumber.length < 10) {
//       setFirstNumber(firstNumber + buttonValue);
//     }
//   };

//   const handleOperationPress = (buttonValue: string) => {
//     if (firstNumber) {
//       setOperation(buttonValue); // Set the operation
//       setSecondNumber(firstNumber); // Move current first number to secondNumber
//       setFirstNumber(''); // Clear firstNumber to accept new input
//     }
//   };

//   const clear = () => {
//     setFirstNumber('');
//     setSecondNumber('');
//     setOperation('');
//     setResult(null);
//   };

//   const getResult = () => {
//     if (!secondNumber || !firstNumber || !operation) {
//       setResult(0); // Default to 0 if any input is missing
//       return;
//     }

//     const num1 = parseFloat(secondNumber);
//     const num2 = parseFloat(firstNumber);

//     let computationResult: number;

//     switch (operation) {
//       case '+':
//         computationResult = num1 + num2;
//         break;
//       case '-':
//         computationResult = num1 - num2;
//         break;
//       case '*':
//         computationResult = num1 * num2;
//         break;
//       case '/':
//         computationResult = num2 !== 0 ? num1 / num2 : NaN; // Handle division by zero
//         break;
//       default:
//         computationResult = 0;
//         break;
//     }

//     setResult(computationResult);
//     setFirstNumber(''); // Clear input fields
//     setSecondNumber('');
//     setOperation('');
//   };

//   const displayFirstNumber = () => {
//     if (result !== null) {
//       return (
//         <Text
//           style={
//             result < 99999
//               ? [Styles.screenFirstNumber, { color: myColors.result }]
//               : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]
//           }
//         >
//           {result.toString()}
//         </Text>
//       );
//     }
//     if (firstNumber) {
//       return (
//         <Text
//           style={
//             firstNumber.length < 6
//               ? Styles.screenFirstNumber
//               : [Styles.screenFirstNumber, { fontSize: 50 }]
//           }
//         >
//           {firstNumber}
//         </Text>
//       );
//     }
//     return <Text style={Styles.screenFirstNumber}>0</Text>;
//   };

//   return (
//     <View style={Styles.viewBottom}>
//       <View
//         style={{
//           height: 120,
//           width: '98%',
//           justifyContent: 'flex-end',
//           alignSelf: 'center',
//         }}
//       >
//         <Text style={Styles.screenSecondNumber}>
//           {secondNumber}{' '}
//           <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500' }}>
//             {operation}
//           </Text>
//         </Text>
//         {displayFirstNumber()}
//       </View>

//       <View style={Styles.row}>
//         <Button title="C" onPress={clear} />
//         <Button title="+/-" onPress={() => handleOperationPress('+/-')} />
//         <Button title="%" onPress={() => handleOperationPress('%')} />
//         <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
//       </View>

//       <View style={Styles.row}>
//         <Button title="7" onPress={() => handleNumberPress('7')} />
//         <Button title="8" onPress={() => handleNumberPress('8')} />
//         <Button title="9" onPress={() => handleNumberPress('9')} />
//         <Button title="x" isBlue onPress={() => handleOperationPress('*')} />
//       </View>

//       <View style={Styles.row}>
//         <Button title="4" onPress={() => handleNumberPress('4')} />
//         <Button title="5" onPress={() => handleNumberPress('5')} />
//         <Button title="6" onPress={() => handleNumberPress('6')} />
//         <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
//       </View>

//       <View style={Styles.row}>
//         <Button title="1" onPress={() => handleNumberPress('1')} />
//         <Button title="2" onPress={() => handleNumberPress('2')} />
//         <Button title="3" onPress={() => handleNumberPress('3')} />
//         <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
//       </View>

//       <View style={Styles.row}>
//         <Button title="." onPress={() => handleNumberPress('.')} />
//         <Button title="0" onPress={() => handleNumberPress('0')} />
//         <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
//         <Button title="=" isBlue onPress={getResult} />
//       </View>
//     </View>
//   );
// }



// import * as React from 'react'
// import Button from './Button'
// import { View,Text } from 'react-native'
// import { Styles } from '@/constants/GlobalStyles'
// import { myColors } from '@/constants/Colors'

// export default function MyKeyboard(){
//     const [firstNumber, setFirstNumber] =React.useState("");
//     const [secondNumber, setSecondNumber]=React.useState("");
//     const [operation, setOperation]= React.useState("");
//     const [result, setResult]= React.useState<number |null>(null)

//     const handleNumberPress = (buttonValue:string)=>{
//         if(firstNumber.length <10){
//             setFirstNumber(firstNumber + buttonValue)
//         }

//     }

//     const handleOperationPress =(buttonValue: string)=>{
//         setOperation(buttonValue);
//         setSecondNumber(firstNumber);
//         setFirstNumber("")

//     }

//     const clear =()=>{
//         setFirstNumber("")
//         setSecondNumber("");
//         setOperation("")
//         setResult(null)
//     };

//     const getResult =()=>{
//         switch(operation){
//             case "+":
//                 clear();
//                 setResult(parseInt(secondNumber) + parseInt(firstNumber));
//                 break;

//                 case "+":
//                     clear();
//                     setResult(parseInt(secondNumber) - parseInt(firstNumber));
//                     break;
                
//                     case "*":
//                         clear();
//                         setResult(parseInt(secondNumber) * parseInt(firstNumber));
//                         break;

//                         case "/":
//                             clear();
//                             setResult(parseInt(secondNumber) / parseInt(firstNumber));
//                             break;

//                         default:
//                             clear();
//                             setResult(0);
//                             break;
//         }
//     }

//     const displayFirstNumber =()=>{
//         if (result !== null){
//             return <Text 
//             style={result < 99999 
//             ? [Styles.screenFirstNumber, {color:myColors.result}]
//             : [Styles.screenFirstNumber, {fontSize:50,color:myColors.result}]} >
//              {result?.toString()}
//                    </Text>
//         }
//         if (firstNumber && firstNumber.length<6){
//             return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
//         }
//         if (firstNumber === ""){
//             return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
//         }
//         if(firstNumber.length >5 && firstNumber.length<8){
//             return <Text
//             style={[Styles.screenFirstNumber, {fontSize: 70}]}>
//             {firstNumber}
//              </Text>
//         }
//         if(firstNumber.length > 7){
//             return <Text style={[Styles.screenFirstNumber, {fontSize:50}]}>
//                 {firstNumber}

//             </Text>
//         }

//     }

//     return(
//         <View style={Styles.viewBottom}>
//             <View style={{
//                 height:120,
//                 width:"98%",
//                 justifyContent:"flex-end",
//                 alignSelf:"center",
//             }}>
//                 <Text style={Styles.screenSecondNumber}>
//                     {secondNumber}
//                     <Text style={{color:'purple', fontSize:50, fontWeight:'500'}}>{operation}</Text>
//                     </Text>
//                     {displayFirstNumber()}

//             </View>
//         <View style={Styles.row}>
//           <Button title="C" onPress={clear}/>
//           <Button title="+/-" onPress={()=>handleOperationPress('+/-')}/>
//           <Button title="%" onPress={()=>handleOperationPress('%')}/>
//           <Button title="÷" isBlue onPress={()=>handleOperationPress('/')}/>
//         </View>

//         <View style={Styles.row}>
//           <Button title="7" onPress={()=>handleOperationPress('7')}/>
//           <Button title="8" onPress={()=>handleOperationPress('8')}/>
//           <Button title="9" onPress={()=>handleOperationPress('9')}/>
//           <Button title="x" isBlue onPress={()=>handleOperationPress('*')}/>
//         </View>

//         <View style={Styles.row}>
//           <Button title="4" onPress={()=>handleOperationPress('4')}/>
//           <Button title="5" onPress={()=>handleOperationPress('5')}/>
//           <Button title="6" onPress={()=>handleOperationPress('6')}/>
//           <Button title="-" isBlue onPress={()=>handleOperationPress('-')}/>
//         </View>

//         <View style={Styles.row}>
//           <Button title="1" onPress={()=>handleOperationPress('1')}/>
//           <Button title="2" onPress={()=>handleOperationPress('2')}/>
//           <Button title="3" onPress={()=>handleOperationPress('3')}/>
//           <Button title="+" isBlue onPress={()=>handleOperationPress('+')}/>
//         </View>

//         <View style={Styles.row}>
//           <Button title="." onPress={()=>handleOperationPress('.')}/>
//           <Button title="0" onPress={()=>handleOperationPress('0')}/>
//           <Button title="⌫" onPress={()=> setFirstNumber(firstNumber.slice(0,1))}/>
//           <Button title="=" isBlue onPress={()=> getResult()}/>
//         </View>
//         </View>

//     )
// }

