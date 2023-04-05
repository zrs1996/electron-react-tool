import './index.less'

type ThemeToClassType = 'submit' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'secondary'

interface InputI {
  value: string,
  id?: string,
  path?: string | undefined,
  type?: string | undefined,
  buttonText?: string | undefined,
  className?: string | undefined,
  callback?: () => {},
  onChange?: (event: any) => void | {}
}
const Input = (props: InputI) => {
  const {
    value,
    path,
    buttonText,
    className,
    callback,
    onChange,
  } = props;

  const themeToClass = {
    submit: 'com_button_submit',
    success: 'com_button_success',
    secondary: 'com_button_secondary',
    info: 'com_button_info',
    warning: 'com_button_warning',
    help: 'com_button_help',
    danger: 'com_button_danger',
  }

  const getClassName = () => {
    let name = 'com_button'
    if (text) {
      name += ' com_button_text'
    }
    if (theme) {
      if (themeToClass[theme]) {
        name += ` ${themeToClass[theme]}`
      }
    }
    return name
  }
  
  return <div className={`input_wrap ${className}`}>
    <input type="text" value={value} maxLength={20} onChange={(e) => onChange && onChange(e.target.value)} />
    {buttonText && <div className='button' onClick={() => callback && callback()}>{buttonText}</div>}
    {path && <div>{path}</div>}
  </div>
}
export default Input;