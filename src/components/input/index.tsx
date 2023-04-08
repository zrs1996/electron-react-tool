import './index.less'

type ThemeToClassType = 'dark' | 'light' | void

interface InputI {
  value: string,
  id?: string,
  placeholder?: string,
  type?: string | undefined,
  className?: string | undefined,
  theme?: ThemeToClassType,
  disabled?: boolean | undefined,
  maxLength?: number | undefined,
  onChange?: (value: string) => void
}
const Input = (props: InputI) => {
  const {
    value,
    placeholder,
    className,
    theme = 'light',
    disabled,
    maxLength,
    onChange,
  } = props;

  const themeToClass = {
    dark: 'com_input_dark',
    light: 'com_input_light'
  }

  const getClassName = () => {
    let name = 'com_input'
    if (theme && themeToClass[theme]) {
      name += ` ${themeToClass[theme]}`
    }
    if (className) {
      name += ` ${className}`
    }
    return name
  }

  return <div className={getClassName()}>
    <input
      className='com_input_input'
      type="text"
      disabled={disabled}
      value={value || ''}
      placeholder={placeholder || ''}
      maxLength={maxLength || 20}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  </div>
}
export default Input;