import { useState, useContext, createContext, useCallback } from 'react';

type DrawerContextProps = {
    drawerOptions: DrawerOptionProps[];
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    setDrawerOption: (newDrawerOptions: DrawerOptionProps[]) => void;
}

type DrawerOptionProps = {
    id: number;
    label: string;
    filter?: string;
}

const DrawerContext = createContext({} as DrawerContextProps)


export const useDrawerContext = () => {
    return useContext(DrawerContext);
}


type DrawerProviderProps = {
    children: React.ReactNode;

}
export const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<DrawerOptionProps[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])

    const handleSetDrawerOptions = useCallback((newDrawerOptions: DrawerOptionProps[]) => {
        setDrawerOptions(newDrawerOptions)
    }, [])

    return (
        <DrawerContext.Provider
            value={
                {
                    isDrawerOpen,
                    drawerOptions,
                    toggleDrawerOpen,
                    setDrawerOption: handleSetDrawerOptions
                }
            }>
            {children}
        </DrawerContext.Provider>
    )

} 