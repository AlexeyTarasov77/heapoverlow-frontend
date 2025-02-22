
export const validationRules = {
  required: () => ({ required: { value: true, message: "This field is required." } }),
  minLength: (value: number) => ({ minLength: { value, message: `Field length should be >= ${value}` } }),
  maxLength: (value: number) => ({ maxLength: { value, message: `Field length should be <= ${value}` } })
}
