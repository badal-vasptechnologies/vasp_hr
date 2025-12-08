import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


// ----------------------------------
//  Wrapper *inside* Inertia context
// ----------------------------------
function PageWrapper({ Component, props }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <>
            <Toaster position="top-right" />
            <Component {...props} />
        </>
    );
}


// ----------------------------------
//  Inertia Setup
// ----------------------------------
createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => {
        return resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ).then((module) => {
            const Component = module.default;

            // Return new component that wraps each page
            return (props) => (
                <PageWrapper Component={Component} props={props} />
            );
        });
    },

    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }
    },

    progress: {
        color: '#4B5563',
    },
});
