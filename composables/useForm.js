export default function ({ initValues = {}, validateRules = {} }) {
  const copyObj = JSON.parse(JSON.stringify(initValues));
  const values = reactive({ ...copyObj });
  const errors = reactive({});

  const checkError = key => {
    let result = {
      isError: false,
      errorMsg: ''
    };

    const itemRules = validateRules[key];
    for (let i = 0; i < itemRules.length; i++) {
      const rule = itemRules[i];
      const isPassedVerify = rule.required ? values[key] : rule.validate(values[key]);
      if (!isPassedVerify) {
        result.isError = true;
        result.errorMsg = rule.errorMsg;
        break;
      }
    }

    result.isError ? (errors[key] = result.errorMsg) : delete errors[key];
  };
  const checkAllError = () => {
    let isError = false;

    for (let key in values) {
      checkError(key);
    }

    isError = !Object.keys(errors).length === 0;
    return {
      isError
    };
  };
  const resetForm = () => {
    Object.assign(values, { ...copyObj });
    for (let key in errors) {
      delete errors[key];
    }
  };

  return {
    values,
    errors,
    resetForm,
    checkError,
    checkAllError
  };
}
