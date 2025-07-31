import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header';
import {BrowserRouter} from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(<BrowserRouter><Header /></BrowserRouter>);