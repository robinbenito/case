import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import typesizes from '../constants/Type'

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: layout.padding,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray.secondary,
  },
  label: {
    paddingLeft: layout.padding,
    color: colors.gray.text,
    paddingVertical: layout.padding,
    fontSize: typesizes.sizes.normal,
  },
  separator: {
    borderBottomColor: colors.gray.border,
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    padding: layout.padding,
    fontSize: typesizes.sizes.medium,
  },
  textArea: {
    height: 250,
    backgroundColor: '#fff',
    padding: layout.padding,
    fontSize: typesizes.sizes.medium,
  },
})

export default class FieldSet extends React.Component {
  render() {
    const { label, fields, isFirst, onChange, style } = this.props

    const fieldComponents = fields.map((field, index) => {
      const { type, placeholder, key, value, editable } = field
      const multiline = type === 'textarea'
      const inputStyle = type === 'textarea' ? styles.textArea : styles.input
      const wrapperStyle = index === fields.length - 1 ? {} : styles.separator
      const focus = isFirst && index === 0
      const keyboard = type === 'url' ? 'url' : 'default'
      const capitalize = type === 'url' ? 'none' : 'sentences'

      return (
        <View style={wrapperStyle} key={key}>
          <TextInput
            autoFocus={focus}
            editable={editable}
            multiline={multiline}
            onChangeText={text => onChange(key, text)}
            placeholder={placeholder}
            clearButtonMode="while-editing"
            style={inputStyle}
            keyboardType={keyboard}
            defaultValue={value}
            autoCapitalize={capitalize}
          />
        </View>
      )
    })


    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <View style={styles.fieldContainer}>
          {fieldComponents}
        </View>
      </View>
    )
  }
}

FieldSet.propTypes = {
  label: PropTypes.string.isRequired,
  isFirst: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.any,
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['input', 'textarea', 'url']),
    onChange: PropTypes.func,
  })).isRequired,
}

FieldSet.defaultProps = {
  isFirst: false,
  onChange: () => null,
  style: {},
}
