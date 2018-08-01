export const hasErrors = (fieldsError) => Object
  .keys(fieldsError)
  .some((field) => fieldsError[field])

export default {
  hasErrors,
}

