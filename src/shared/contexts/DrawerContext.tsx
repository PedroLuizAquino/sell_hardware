import { useState, useContext, createContext, useCallback } from 'react';

interface IDrawerContextData {
    drawerOptions: iDrawerOption[];
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    setDrawerOption: (newDrawerOptions: iDrawerOption[]) => void;
}

interface iDrawerOption {
    id: number;
    label: string;
    filter?: string;
}

const DrawerContext = createContext({} as IDrawerContextData)


export const useDrawerContext = () => {
    return useContext(DrawerContext);
}


interface IDrawerProvider {
    children: React.ReactNode;

}
export const DrawerProvider = ({ children }: IDrawerProvider) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<iDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])

    const handleSetDrawerOptions = useCallback((newDrawerOptions: iDrawerOption[]) => {
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