
import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages/Dashboard/Dashboard';


export const AppRoutes = () => {
    const { setDrawerOption } = useDrawerContext();


    useEffect(() => {
        setDrawerOption([
            {
                id: 1,
                label: "hardware",
            },
            {
                id: 2,
                label: "pedro",
            },
            {
                id: 3,
                label: "projeto",
            }
        ])

    }, [])

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}