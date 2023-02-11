# gameissuetosolve in src/components/expansion-panel/ExpansionPanel.tsx

after conversion to TS we get this error: 
in the js version we just declar a context with no real typing but now it wants something more strict

Then I update expansion panel definition to this:
```
// verbosity of creating a context type separate
type SelectedIndexType = {
  currentIndex: number | null,
  changeValue: (arg: number | null) => void
}

// This is internal and should be set to SelectedContextType
const ExpansionPanelContext = createContext<SelectedIndexType | undefined>(undefined);
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
at line 39: const [ currentIndex, setIndex ] = useSelectedContext() ;

```
Type 'SelectedIndexType' must have a '[Symbol.iterator]()' method that returns an iterator.ts(2488)
```

See also: https://stackoverflow.com/questions/66174592/react-typed-context

