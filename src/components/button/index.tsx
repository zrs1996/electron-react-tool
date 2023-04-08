import './index.less'
type ThemeToClassType = 'submit' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'secondary'
interface ButtonProps {
  title: string,
  theme?: ThemeToClassType,
  text?: boolean | undefined,
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | void) => void | undefined | Promise<void>,
}
const Button = (props: ButtonProps) => {
  const { title, onClick, theme, text } = props;
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
  return <div className={getClassName()} onClick={(e) => onClick ? onClick(e) : () => {}}>
    <div>{title}</div>
  </div>
}
export default Button