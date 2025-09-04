export const API_HOST =
    import.meta.env.VITE_API_HOST || 'http://localhost:8080';

export const EndpointsList = {
    Login: {
        Login: {
            endpoint: '/login',
        },
        ValidateSession: {
            endpoint: '/login/verify ',
        },
        Logout: {
            endpoint: '/logout',
        },
    },
};
