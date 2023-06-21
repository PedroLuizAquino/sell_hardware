
import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Login } from '../pages/forms/Login/Login';
import { CadastroProduto, Cadastro, Home, AnuncioProduto } from '../pages';


export const AppRoutes = () => {
    const { setDrawerOption } = useDrawerContext();


    useEffect(() => {
        setDrawerOption([
            {
                id: 1,
                label: "processador",
            },
            {
                id: 2,
                label: "armazenamento",
            },
            {
                id: 3,
                label: "memoria",
            }
        ])
    }, [])

    return (
        <Routes>
            <Route path="/sellhardware" element={<Home />} />
            <Route path="/anuncio/detalhe/:id" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastrar' element={<Cadastro />} />
            <Route path='/cadastro-produto' element={<CadastroProduto />} />
            <Route path='/anuncio-produto' element={<AnuncioProduto />} />
            <Route path="*" element={<Navigate to="/sellhardware" />} />
        </Routes>
    );
}