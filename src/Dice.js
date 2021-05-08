import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Scores from './Scores';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '80%',
  },
  dices: {
    flexDirection: 'row',
    height: 60,
  },
  dice: {
    padding: 10,
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 4,
    borderColor: '#434343',
    borderWidth: 1,
  },
  selected: {
    borderWidth: 2,
    borderColor: 'green',
  },
  roll: {
    height: 40,
  },
  scores: {
    flex: 2,
  },
  shake: {
    flex: 1,
    alignItems: 'center',
  },
})

const getResult = () => {
  return Math.floor((Math.random() * 6) + 1);
}

const Dice = () => {
  const [scores, setScores] = useState([]);
  const [roll, setRoll] = useState(3);
  const [result, setResult] = useState([]);
  const [hold, setHold] = useState([]);

  const handleDiceShake = () => {
    const arrayResult = [];
    for (let i = 0; i < 5; i++) {
      arrayResult[i] = getResult();
    }
    const score = arrayResult.map((item, key) => {
      return hold[key] ? result[key] : item;
    });
    setResult(score);
    setRoll(roll - 1);
  }

  const handleHolder = (index) => {
    const holder = hold;
    holder.length = 5;
    holder[index] = !hold[index];
    setHold((preState)=>(holder.map((item, key)=>(item || preState[key] || false))));
  }

  const handleReset = () => {
    setRoll(3);
    setResult([]);
    setHold([]);
  }

  useEffect(()=> {
    if (roll === 0) {
      const holder = [];
      holder.length = 5;
      holder.fill(true,0,5)
      console.log(holder);
      setHold(holder);
    }
  }, [roll]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.scores}>
          <Scores
            active={roll===0}
            result={result}
            total={result.reduce((a, b)=>( a + b), 0)}
          />
        </View>
        <View style={styles.shake}>
          <View style={styles.roll}>
            <Text>
              {`tirada: ${roll}`}
            </Text>
          </View>
          <View style={styles.dices}>
            {result.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={()=>{handleHolder(key)}}
                >
                  <View style={[styles.dice, hold[key] && styles.selected]}>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Button
            title="Tirar dados"
            disabled={roll===0}
            onPress={handleDiceShake}
          />
          <Button
            title="Reiniciar"
            onPress={handleReset}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Dice
