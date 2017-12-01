import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import ImageForm from '../../../components/Form/ImageForm'
import TextForm from '../../../components/Form/TextForm'
import LinkForm from '../../../components/Form/LinkForm'
import LoadingScreen from '../../../components/LoadingScreen'
import { BlockQuery } from '../../BlockScreen/components/BlockContents'

import withLoadingAndErrors from '../../../hocs/withLoadingAndErrors'
import pollForBlockAvailability from '../../../hocs/pollForBlockAvailability'

import navigationService from '../../../utilities/navigationService'
import alertErrors from '../../../utilities/alertErrors'

class EditBlockForm extends React.Component {
  onSubmit = (variables) => {
    const { data: { block }, editBlock } = this.props

    editBlock({
      variables: {
        ...variables,
        id: block.id,
      },
      refetchQueries: [
        {
          query: BlockQuery,
          variables: {
            id: block.id,
          },
        },
      ],
    })

    .then(() =>
      navigationService.back(),
    )

    .catch(alertErrors)
  }

  render() {
    const { navigation, data: { block, block: { state, kind: { __typename } } } } = this.props

    if (state !== 'available' && state !== 'failed') {
      return <LoadingScreen />
    }

    let Form

    switch (__typename) {
      case 'Image':
        Form = ImageForm
        break
      case 'Text':
        Form = TextForm
        break
      default:
        Form = LinkForm
        break
    }

    return (
      <Form
        block={block}
        onSubmit={this.onSubmit}
        navigation={navigation}
        submitText="Save"
      />
    )
  }
}

EditBlockForm.propTypes = {
  data: PropTypes.object.isRequired,
  editBlock: PropTypes.func.isRequired,
  navigation: PropTypes.object,
}

EditBlockForm.defaultProps = {
  navigation: {},
  data: {},
}

const updateBlockMutation = gql`
  mutation updateBlockMutation($id: ID!, $title: String, $description: String, $content: String){
    update_block(input: { id: $id, title: $title, description: $description, content: $content}) {
      clientMutationId
      block {
        id
        title
      }
    }
  }
`

const DecoratedEditBlockForm = compose(
  withLoadingAndErrors,
  pollForBlockAvailability,
)(EditBlockForm)

const EditBlockFormWithData = compose(
  graphql(BlockQuery),
  graphql(updateBlockMutation, { name: 'editBlock' }),
)(DecoratedEditBlockForm)

export default EditBlockFormWithData
