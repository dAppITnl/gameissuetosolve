import "./expansion-panel.scss";
import React, { FC, createContext, useContext, Dispatch, SetStateAction, useState } from "react";

// @ts-ignore
import inactiveIcon from "../../assets/icons/plus.svg";
// @ts-ignore
import activeIcon from "../../assets/icons/minus.svg";

// verbosity of creating a context type separate
type SelectedIndexType = {
  currentIndex: number | null,
  changeValue: (arg: number | null) => void
}

// This is internal and should be set to SelectedContextType
const ExpansionPanelContext = createContext<SelectedIndexType | undefined>(undefined);

// This is exported for other things to use and can be cast
export const useSelectedContext = () => useContext(ExpansionPanelContext) as SelectedIndexType


interface ItemProps {
  index: number | undefined;
  classList?: string;
  text: string;
  children?: React.ReactNode;
  disableExpand?: boolean;
  style?: React.CSSProperties;
}

export const Item: FC<ItemProps> = ({
  index,
  classList,
  text,
  children,
  disableExpand = false,
  style,
}) => {
  const [ currentIndex, setIndex ] = useSelectedContext() ; //useState<SelectedIndexType | undefined>( useContext(ExpansionPanelContext) );
  const expanded = index === currentIndex;

  const expansionButton = !disableExpand && (
    <div className="expansion-panel__state">
      <img
        className="expansion-panel__icon"
        src={expanded ? activeIcon : inactiveIcon}
        alt="expand"
      />
    </div>
  );

  return (
    <div
      className={`expansion-panel 
        ${disableExpand ? "no-expand" : ""} 
        ${expanded || disableExpand ? "active" : ""} 
        ${classList ?? ""}`}
    >
      <div
        className="expansion-panel__header font--night-machine"
        onClick={() => setIndex( expanded ? -1 : index)}
      >
        <div>{text}</div>
        {!disableExpand && expansionButton}
      </div>

      <div className="expansion-panel__body" style={style}>
        {children}
      </div>
    </div>
  );
}

interface GroupProps {
  value?: number;
  children: React.ReactNode | React.ReactNode[];
}

export const Group: React.FC<GroupProps> = ({ value, children }) => {
  const [currentIndex, setIndex] = useState<SelectedIndexType['currentIndex']>(value ?? 0);
  const changeValue: SelectedIndexType['changeValue'] = (value) => {
    setIndex(value);
  }
  const array = children && (Array.isArray(children) ? children : [children]);

  return (
    <ExpansionPanelContext.Provider
      value={{
        currentIndex,
        changeValue,
      }}
    >
      {array && array.map((child, index) =>
          React.cloneElement(child as React.ReactElement, { key: index, index })
        )}
    </ExpansionPanelContext.Provider>
  );
};
