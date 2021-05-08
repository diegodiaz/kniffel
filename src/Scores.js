import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderColor: '#999999',
    borderWidth: 1,
    padding: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  selected: {
    width: 40,
    height: 40,
  },
  value: {
    marginLeft: 10,
  }
})

const Item = ({
  id,
  active,
  label,
  value,
  selected,
  onSelected
}) => {

  const handleSelected = () => {
    onSelected && onSelected(id);
  }

  return (
    <View style={styles.item}>
      <TouchableOpacity
        disabled={!active}
        style={styles.selected}
        onPress={handleSelected}
      >
        <Text>
          {selected ? 'Aqui' : ''}
        </Text>
      </TouchableOpacity>
      <Text>
        {label}
      </Text>
      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const OPTIONS = [
  {
    id: 1,
    label: 'uno',
    value: 0,
  },
  {
    id: 2,
    label: 'dos',
    value: 0,
  },
  {
    id: 3,
    label: 'tres',
    value: 0,
  },
  {
    id: 4,
    label: 'cuatro',
    value: 0,
  },
  {
    id: 5,
    label: 'cinco',
    value: 0,
  },
  {
    id: 6,
    label: 'seis',
    value: 0,
  },
];

const Scores = (props) => {
  const { active, result } = props;
  const [options, setOptions] = useState(OPTIONS);

  const handleSelectChange = (id) => {
    const selected = options.map((item) => {
      const total = result.filter((item)=>(item===id)).reduce((a, b) => (b+a), 0);
      return id===item.id ? {...item, selected: true, total} : {...item, total: 0, selected: false};
    })
    setOptions(selected);
  }

  return (
    <View style={styles.root}>
      {options.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          active={active}
          label={item.label}
          value={item.total}
          selected={item.selected || false}
          onSelected={handleSelectChange}
        />
      ))}
    </View>
  )
}

export default Scores
