const Button = ({onClick, label, type}) => {
  return (
    <button className="p-2 bg-zinc-600 text-white rounded-lg" type={type} onClick={onClick}>{label}</button>
  )
}

export default Button;