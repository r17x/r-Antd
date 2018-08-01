import React, {
  Component,
  Fragment,
} from 'react'

import {
  object,
} from 'prop-types'

import {
  Form,
  Input,
} from 'antd'

import {
  toNumber,
} from 'lodash'

// import {hasErrors} from './Utils'

const {Item} = Form

export class Pertanian extends Component {
    state = {
      h: 0,
    }

    static propTypes = {
      form: object,
    }

    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
      this.props.form.validateFields()
    }

    ambangLebar(Q, b) {
      return toNumber(Q) / (1.76*b)
    }

    handleChange(e) {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        this.setState({
          h: this.ambangLebar(values.Q, values.b),
        })
      })
    }

    render() {
      const {handleChange} = this
      const {
        getFieldDecorator,
        getFieldError,
        isFieldTouched,
      } = this.props.form
      const bError = isFieldTouched('b') &&
            getFieldError('b')
      const QError = isFieldTouched('Q') &&
            getFieldError('Q')
      return (
        <Fragment>
          <h2> Alat ukur ambang lebar h(3/2)</h2>
          <Form layout="inline">
            <Item
              validateStatus={bError ? 'error' : ''}
              help={bError || ''}
            >
              {getFieldDecorator('b', {
                rules: [{required: true, message: 'Mohon isi variable b!'}],
              })(
                <Input prefix={'b'} placeholder="b" onChange={handleChange}/>
              )}
            </Item>
            <Item
              validateStatus={QError ? 'error' : ''}
              help={QError || ''}
            >
              {getFieldDecorator('Q', {
                rules: [{required: true, message: 'Mohon isi variable Q!'}],
              })(
                <Input prefix={'Q'} placeholder="Q" onChange={handleChange}/>
              )}
            </Item>
            <Item>
              <Input
                disabled={true}
                value={this.state.h}
                placeholder={'h3/2'}
              />
            </Item>
          </Form>

        </Fragment>
      )
    }
}

export const PertanianForm = Form.create()(Pertanian)

export default {
  PertanianForm,
}
