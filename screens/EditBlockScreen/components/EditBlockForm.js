import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import ImageForm from '../../../components/Form/ImageForm'
import TextForm from '../../../components/Form/TextForm'
import LinkForm from '../../../components/Form/LinkForm'
import { BlockQuery } from '../../BlockScreen/components/BlockContents'

import navigationService from '../../../utilities/navigationService'
import alertErrors from '../../../utilities/alertErrors'

class EditBlockScreen extends React.Component {
  onSubmit = (variables) => {
    const { block, editBlock } = this.props

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
    const { navigation, block } = this.props
    const { kind: { __typename } } = block

    // Pick the right kind of Form to use
    let Form
    switch (__typename) {
      case 'Image':
        Form = ImageForm
        break
      case 'Text':
        Form = TextForm
        break
      case 'Link':
      case 'Media':
      case 'Attachment':
        Form = LinkForm
        break
      default:
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

EditBlockScreen.propTypes = {
  block: PropTypes.any.isRequired,
  navigation: PropTypes.any,
  editBlock: PropTypes.any.isRequired,
}

EditBlockScreen.defaultProps = {
  navigation: () => null,
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

const EditBlockScreenWithData = graphql(updateBlockMutation, { name: 'editBlock' })(EditBlockScreen)

export default EditBlockScreenWithData
