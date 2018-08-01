import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as filterActions from '../../redux/actions/filter'

const filters = [
  'all',
  'incomplete',
  'complete',
]

class Footer extends React.Component {

  render() {
    // console.log('Footer.render', this.props)
    const { filter: activeFilter, setFilter } = this.props

    const Filter = ({ filter }) => {
      return (
        <TouchableOpacity
          onPress={() => setFilter(filter)}
        >
          <Text style={
              [
                styles.filterText,
                filter===activeFilter ? styles.filterTextActive : null
              ]
            }
          >
            {filter}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        { filters.map((f, idx) => <Filter key={idx} filter={f} />)}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { filter: state.filter }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setFilter: filterActions.setFilter,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer)

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 35,
  },

  filterText: {
    color: '#bbb',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    borderColor: '#fff',
  },
})
