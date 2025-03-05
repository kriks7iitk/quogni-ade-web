import './switch.theme.scss'


const ToggleSwitchWName = ({ value, setValue, options, disabled}) => {

  const handleToggle = () => {
    if(value === options[0]){
      setValue(options[1])
    }
    else{
      setValue(options[0])
    }
  }
  const option1Selected = options[0] === value;
  const option2Selected = options[1] === value;

    return (
      <label  className="react-switch">
        <input
          disabled={disabled}
          checked={!option1Selected}
          onChange={handleToggle}
          className="react-switch-checkbox"
          type="checkbox"
        />
        <div className="react-switch-button" />
        <div className="react-switch-labels">
          <span style={option1Selected ? {color:'var(--neutral-50) !important'} : {}} className='label'>{options[0]}</span>
          <span style={option2Selected ? {color:'var(--neutral-50)'}: {}} className='label'>{options[1]}</span>
        </div>
      </label>
    );
  };
  
  export default ToggleSwitchWName;