# gameissuetosolve in src/components/expansion-panel/ExpansionPanel.tsx

after conversion to TS we get this error: 
in the js version we just declar a context with no real typing but now it wants something more strict

Then I update expansion panel definition to this:
```
interface IExpansionpanelContext {
    currentIndex: number;
    setIndex?: () => {};
}
const defaultState = {
  currentIndex = 0,
}
export const ExpansionPanelContext = React.createContext<IExpansionpanelContext>(defaultState);
```

and that causes the error in this part:
```
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
```
at line 40: onClick={() => setIndex(expanded ? -1 : index)} :

```
Cannot invoke an object which is possible 'undefined': ts(2722) [Ln 40, Col 24]
Expected 0 arguments, but got 1. ts(2554) [Ln 40, Col 33]
```

See also: https://stackoverflow.com/questions/66174592/react-typed-context

