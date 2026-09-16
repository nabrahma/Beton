"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { tabs, type TabsVariants } from "@beton-ui/recipes";
import { createContext, useContext } from "react";

interface TabsState {
  styles: ReturnType<typeof tabs>;
  size: NonNullable<TabsVariants["size"]>;
}

const TabsContext = createContext<TabsState>({ styles: tabs(), size: "md" });

function useStyles() {
  return useContext(TabsContext).styles;
}

export interface TabsProps extends Omit<BaseTabs.Root.Props, "className">, TabsVariants {
  className?: string;
}

function TabsRoot({ size = "md", orientation = "horizontal", className, ...props }: TabsProps) {
  const styles = tabs({ size, orientation });
  return (
    <TabsContext.Provider value={{ styles, size }}>
      <BaseTabs.Root
        {...props}
        orientation={orientation}
        className={styles.root({ class: className })}
      />
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends Omit<BaseTabs.List.Props, "className"> {
  className?: string;
  /** Draw the moving bar that follows the active tab. On by default. */
  indicator?: boolean;
}

function TabsList({ className, children, indicator = true, ...props }: TabsListProps) {
  const styles = useStyles();
  return (
    <BaseTabs.List {...props} className={styles.list({ class: className })}>
      {children}
      {indicator ? <BaseTabs.Indicator className={styles.indicator()} /> : null}
    </BaseTabs.List>
  );
}

export interface TabProps extends Omit<BaseTabs.Tab.Props, "className"> {
  className?: string;
}

function Tab({ className, ...props }: TabProps) {
  const { styles, size } = useContext(TabsContext);
  return <BaseTabs.Tab {...props} data-size={size} className={styles.tab({ class: className })} />;
}

export interface TabsPanelProps extends Omit<BaseTabs.Panel.Props, "className"> {
  className?: string;
}

function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel {...props} className={useStyles().panel({ class: className })} />;
}

/** Switch between views that sit at the same level. */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
});
