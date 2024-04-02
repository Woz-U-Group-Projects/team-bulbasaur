import { Formik, Form, Field, ErrorMessage } from "formik";

/** @typedef {import("yup").StringSchema<string | undefined, AnyObject, string | undefined>} stringSchema */
/** @typedef {import("yup").NumberSchema<number | undefined, AnyObject, number | undefined>} numberSchema */

/**
 * @typedef {Object} feild
 * @property {string} name
 * @property {("text"|"number"|"email"|"password")} type
 * @property {(string|number)} values
 * @property {(stringSchema | numberSchema)} validationSchema
 * 
 * @param {{ feilds: feild[] }} props 
 * @returns 
 */
const CustumForm = ({ values, schema, onSubmit, children }) => (
  <Formik
    initialValues={values}
    validationSchema={schema}
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      onSubmit(values);
    }}
    onReset={(values, actions) => {
      actions.resetForm();
      actions.setSubmitting(true);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        {children}
        <button type="submit" disabled={isSubmitting}>Submit</button>
        <button type="reset">Reset</button>
      </Form>
    )}
  </Formik>
);

export default CustumForm;
// Path: src/components/Form/index.js
