import * as React from 'react'
import Button from './Button'
import { View,Text } from 'react-native'
import { Styles } from '@/constants/GlobalStyles'
import { myColors } from '@/constants/Colors'

export default function MyKeyboard(){
    const [firstNumber, setFirstNumber] =React.useState("");
    const [secondNumber, setSecondNumber]=React.useState("");
    const [operation, setOperation]= React.useState("");
    const [result, setResult]= React.useState<number |null>(null)

    const handleNumberPress = (buttonValue:string)=>{
        if(firstNumber.length <10){
            setFirstNumber(firstNumber + buttonValue)
        }

    }

    const handleOperationPress =(buttonValue: string)=>{
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("")

    }

    const clear =()=>{
        setFirstNumber("")
        setSecondNumber("");
        setOperation("")
        setResult(null)
    };

    const getResult =()=>{
        switch(operation){
            case "+":
                clear();
                setResult(parseInt(secondNumber) + parseInt(firstNumber));
                break;

                case "+":
                    clear();
                    setResult(parseInt(secondNumber) - parseInt(firstNumber));
                    break;
                
                    case "*":
                        clear();
                        setResult(parseInt(secondNumber) * parseInt(firstNumber));
                        break;

                        case "/":
                            clear();
                            setResult(parseInt(secondNumber) / parseInt(firstNumber));
                            break;

                        default:
                            clear();
                            setResult(0);
                            break;
        }
    }

    return(
        <View style={Styles.viewBottom}>
        <View style={Styles.row}>
          <Button title="C" onPress={clear}/>
          <Button title="+/-" onPress={()=>handleOperationPress('+/-')}/>
          <Button title="%" onPress={()=>handleOperationPress('%')}/>
          <Button title="÷" isBlue onPress={()=>handleOperationPress('/')}/>
        </View>

        <View style={Styles.row}>
          <Button title="7" onPress={()=>handleOperationPress('7')}/>
          <Button title="8" onPress={()=>handleOperationPress('8')}/>
          <Button title="9" onPress={()=>handleOperationPress('9')}/>
          <Button title="x" isBlue onPress={()=>handleOperationPress('*')}/>
        </View>

        <View style={Styles.row}>
          <Button title="4" onPress={()=>handleOperationPress('4')}/>
          <Button title="5" onPress={()=>handleOperationPress('5')}/>
          <Button title="6" onPress={()=>handleOperationPress('6')}/>
          <Button title="-" isBlue onPress={()=>handleOperationPress('-')}/>
        </View>

        <View style={Styles.row}>
          <Button title="1" onPress={()=>handleOperationPress('1')}/>
          <Button title="2" onPress={()=>handleOperationPress('2')}/>
          <Button title="3" onPress={()=>handleOperationPress('3')}/>
          <Button title="+" isBlue onPress={()=>handleOperationPress('+')}/>
        </View>

        <View style={Styles.row}>
          <Button title="." onPress={()=>handleOperationPress('.')}/>
          <Button title="0" onPress={()=>handleOperationPress('0')}/>
          <Button title="⌫" onPress={()=> setFirstNumber(firstNumber.slice(0,1))}/>
          <Button title="=" isBlue onPress={()=> getResult()}/>
        </View>
        </View>

    )
}