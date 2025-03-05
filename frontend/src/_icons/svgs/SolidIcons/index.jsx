import React from 'react';
import Wrench from './Wrench';
import Google from './Google';
import LinkedIn from './LinkedIn';
import Agents from './Agents';
import { Database, LayoutDashboardIcon, Plug, Settings , Workflow} from 'lucide-react'
import Add from '../SolidThemeIcons/Add';

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'agents':
      return <Agents {...props} />
    case 'google':
      return <Google {...props} />;
    case 'linkedin':
      return <LinkedIn {...props} />;
    case 'tools':
      return <Wrench {...props} />;
    case 'dashboard':
      return <LayoutDashboardIcon color={props?.fill} size={props?.width} strokeWidth={props?.strokeWidth}/>
    case 'datasource':
      return <Database color={props?.fill} size={props?.width} strokeWidth={props?.strokeWidth}/>
    case 'llm':
      return <Plug color={props?.fill} size={props?.width} strokeWidth={props?.strokeWidth}/>
    case 'settings':
      return <Settings color={props?.fill} size={props?.width} strokeWidth={props?.strokeWidth}/>
    case 'add':
      return <Add  {...props}/>
    case 'workflow':
      return <Workflow color={props?.fill} size={props?.width} strokeWidth={props?.strokeWidth}/>
    default:
      return null;
  }
};

export default Icon;
