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
  return <div className={`input_wrap ${className}`}>
    <input type="text" value={value} maxLength={20} onChange={(e) => onChange && onChange(e.target.value)} />
    {buttonText && <div className='button' onClick={() => callback && callback()}>{buttonText}</div>}
    {path && <div>{path}</div>}
  </div>
}
export default Input;