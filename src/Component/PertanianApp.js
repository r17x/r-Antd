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

/**
 * unused but must be learn before
 * handle errors
 * import {hasErrors} from './Utils'
 */

const {Item} = Form

/**
 * Pertanian Component
 */
export class Pertanian extends Component {
    rumus = [
      'ambangLebar',
      'cipolleti',
      'thompson',
      'romijin',
    ]

    /**
     * define default state
     */
    state = {
      ambangLebar: 0,
      cipolleti: 0,
      thompson: 0,
      romijin: 0,
    }

    /**
     * define prop-types
     */
    static propTypes = {
      form: object,
    }

    /**
     * contsructor class
     * @param {object} props
     */
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    /**
     * when react component mount
     */
    componentDidMount() {
      this.props.form.validateFields()
    }

    /**
     * Ambang lebar
     * @param {integer|float} Q
     * @param {integer|float} b
     * @return {integer|float} hasil rumus ambang lebar
     * h3/2 = Q / 1.76*b
     */
    ambangLebar(Q, b) {
      return Q/(1.76*b)
    }

    /**
     * Cipolleti
     * condition
     * - h < 60 M
     * - b < 3 h
     * @param {integer|float} Q
     * @param {integer|float} b
     * @return {integer|float} h3/2
     * h3/2 = Q / 1.86 * b
     */
    cipolleti(Q, b) {
      // todo condition
      return Q/(1.86*b)
    }

    /**
     * romijin
     * @param {integer|float} Q
     * @param {integer|float} b
     * @return {integer|float} h3/2
     * h3/2 = Q / (1.71 * b)
     */
    romijin(Q, b) {
      return Q / (1.71 * b)
    }

    /**
     * Thompson
     * @param {integer|float} Q
     * @param {integer|float} b
     * @return {integer|float} h5/2
     * h5/2 = Q / (1.71 * b)
     */
    thompson(Q, b) {
      return Q / (1.417 * b)
    }

    /**
     * @param {integer|float} Q
     * @param {integer|float} b
     * @param {string} formula
     * @return{integer|float} result of formula
     */
    hasil(Q, b, formula='ambangLebar') {
      Q = Q ? toNumber(Q) : 0
      b = b ? toNumber(b) : 0
      return toNumber(
        this[formula](Q, b)
      )
    }

    /**
     * @param {object} e as event
     */
    handleChange(e) {
      e.preventDefault()
      const result = {}
      this.props.form.validateFields((err, values) => {
        this.rumus.forEach((formulaName) =>{
          result[formulaName] = this.hasil(values.Q, values.b, formulaName)
        })

        this.setState(
          result
        )
      })
    }

    /**
     * Render component
     * @return {object} component
     */
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
          <Form>
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
            { this.rumus.map((v, k) => {
              const toLabel = (v) => {
                v = v.split(/(?=[A-Z])/)
                return v
                  .map((v) => v.replace(/\b[a-z]/g, (l) => l.toUpperCase()))
                  .join(' ')
              }
              return (
                <Item key={String(k)}>
                  <label> Alat Ukur {toLabel(v)} </label>
                  <Input disabled={true}
                    value={this.state[v]}
                  />
                </Item>
              )
            })}
          </Form>

        </Fragment>
      )
    }
}

export const PertanianForm = Form.create()(Pertanian)

export default {
  PertanianForm,
}
